package com.collegeprediction.collegebackend.service;

import com.collegeprediction.collegebackend.dto.PredictionRequest;
import com.collegeprediction.collegebackend.dto.PredictionResponse;
import com.collegeprediction.collegebackend.model.College;
import com.collegeprediction.collegebackend.model.CutoffHistory;
import com.collegeprediction.collegebackend.repository.CollegeRepository;
import com.collegeprediction.collegebackend.repository.CutoffHistoryRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.util.*;
import java.util.stream.Collectors;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class MLPredictionService {
    
    @Value("${ml.model.path:./ml_model/college_predictor_model.pkl}")
    private String modelPath;
    
    @Value("${ml.python.executable:python}")
    private String pythonExecutable;
    
    private final CutoffHistoryRepository cutoffHistoryRepository;
    private final CollegeRepository collegeRepository;
    private final ObjectMapper objectMapper;
    
    public MLPredictionService(
            CutoffHistoryRepository cutoffHistoryRepository,
            CollegeRepository collegeRepository) {
        this.cutoffHistoryRepository = cutoffHistoryRepository;
        this.collegeRepository = collegeRepository;
        this.objectMapper = new ObjectMapper();
    }
    
    /**
     * Get ML predictions for a student based on their performance
     */
    public List<PredictionResponse> getPredictions(PredictionRequest request) {
        try {
            log.info("Getting ML predictions for request: {}", request);
            
            // Get all colleges
            List<College> colleges = collegeRepository.findAll();
            List<PredictionResponse> predictions = new ArrayList<>();
            
            // For each college, get prediction
            for (College college : colleges) {
                try {
                    Map<String, Object> predictionResult = predictForCollege(college, request);
                    if (predictionResult != null) {
                        PredictionResponse response = buildPredictionResponse(
                            college, 
                            request, 
                            predictionResult
                        );
                        predictions.add(response);
                    }
                } catch (Exception e) {
                    log.warn("Failed to predict for college {}: {}", college.getId(), e.getMessage());
                }
            }
            
            // Sort by match percentage
            predictions.sort(Comparator.comparing(PredictionResponse::getMatchPercentage).reversed());
            
            return predictions;
        } catch (Exception e) {
            log.error("Error in ML prediction service", e);
            throw new RuntimeException("Prediction service error: " + e.getMessage());
        }
    }
    
    /**
     * Predict cutoff for a specific college
     */
    private Map<String, Object> predictForCollege(College college, PredictionRequest request) 
            throws Exception {
        
        // Get historical cutoff data for this college
        List<CutoffHistory> history = cutoffHistoryRepository.findByCollegeId(college.getId());
        
        // Use rule-based approach (Python ML model not available)
        return ruleBasedPrediction(college, history, request);
    }
    
    /**
     * ML-based prediction using trained model
     */
    private Map<String, Object> mlBasedPrediction(
            College college,
            List<CutoffHistory> history,
            PredictionRequest request) throws Exception {
        
        // Build Python prediction script
        String pythonScript = buildPythonPredictionScript(college, history, request);
        
        // Execute Python prediction
        Map<String, Object> result = executePythonPrediction(pythonScript);
        
        return result;
    }
    
    /**
     * Rule-based prediction using historical data and MHT-CET scores
     */
    private Map<String, Object> ruleBasedPrediction(College college, List<CutoffHistory> history, PredictionRequest request) {
        Map<String, Object> result = new HashMap<>();
        
        // Get student score (prioritize mhtCetScore)
        Double studentScore = request.getMhtCetScore() != null ? request.getMhtCetScore() : 
                             (request.getPercentile() != null ? request.getPercentile() : request.getJeeScore());
        
        // Get predicted cutoff from historical data or college default
        Double predictedCutoff = college.getCutoffScore();
        
        if (history != null && !history.isEmpty()) {
            // Calculate average cutoff from recent years
            Double avgCutoff = history.stream()
                .mapToDouble(CutoffHistory::getCutoffScore)
                .average()
                .orElse(college.getCutoffScore());
            
            // Apply trend (slight decrease if recent years are lower)
            List<CutoffHistory> recentHistory = history.stream()
                .sorted(Comparator.comparing(CutoffHistory::getCutoffYear).reversed())
                .limit(3)
                .collect(Collectors.toList());
            
            if (!recentHistory.isEmpty()) {
                Double recentAvg = recentHistory.stream()
                    .mapToDouble(CutoffHistory::getCutoffScore)
                    .average()
                    .orElse(avgCutoff);
                predictedCutoff = recentAvg;
            }
        }
        
        // Calculate match percentage
        Double matchPercentage = 0.0;
        Double confidence = 0.75;
        
        if (studentScore != null && predictedCutoff != null && predictedCutoff > 0) {
            matchPercentage = (studentScore / predictedCutoff) * 100;
            matchPercentage = Math.min(120, matchPercentage);  // Cap at 120%
            
            // Calculate confidence based on match percentage
            if (matchPercentage >= 100) {
                confidence = 0.90;
            } else if (matchPercentage >= 90) {
                confidence = 0.85;
            } else if (matchPercentage >= 80) {
                confidence = 0.80;
            } else if (matchPercentage >= 70) {
                confidence = 0.75;
            } else {
                confidence = 0.60;
            }
        }
        
        result.put("predictedCutoff", predictedCutoff);
        result.put("confidence", confidence);
        result.put("matchPercentage", matchPercentage);
        result.put("method", "rule-based");
        
        return result;
    }
    
    /**
     * Build Python script for prediction
     */
    private String buildPythonPredictionScript(College college, List<CutoffHistory> history, PredictionRequest request) {
        StringBuilder script = new StringBuilder();
        script.append("import json\n");
        script.append("import pickle\n");
        script.append("import numpy as np\n");
        script.append("import pandas as pd\n");
        script.append("from pathlib import Path\n\n");
        
        script.append("try:\n");
        script.append("    with open('ml_model/college_predictor_model.pkl', 'rb') as f:\n");
        script.append("        model_data = pickle.load(f)\n");
        script.append("    model = model_data['model']\n");
        script.append("    scaler = model_data['scaler']\n\n");
        
        // Build feature vector
        script.append("    features = [\n");
        script.append("        ").append(request.getMhtCetScore() != null ? request.getMhtCetScore() : (request.getJeeScore() != null ? request.getJeeScore() : 85)).append(",\n");
        script.append("        ").append(request.getPercentile() != null ? request.getPercentile() : 95).append(",\n");
        script.append("        ").append(request.getRank() != null ? request.getRank() : 5000).append(",\n");
        script.append("        0,  # category encoded\n");
        script.append("        0,  # branch encoded\n");
        script.append("        0,  # college_type encoded\n");
        script.append("        ").append(college.getRankingScore()).append(",\n");
        script.append("        60,  # seats\n");
        script.append("        ").append(2024 - college.getCutoffYear()).append(",\n");
        script.append("        0   # trend\n");
        script.append("    ]\n\n");
        
        script.append("    X_scaled = scaler.transform([features])\n");
        script.append("    prediction = model.predict(X_scaled)[0]\n");
        script.append("    predictions_by_tree = np.array([tree.predict(X_scaled)[0] for tree in model.estimators_])\n");
        script.append("    confidence = 1 - (np.std(predictions_by_tree) / (np.mean(predictions_by_tree) + 1e-6))\n");
        script.append("    confidence = max(0, min(1, confidence))\n\n");
        
        script.append("    result = {\n");
        script.append("        'predictedCutoff': float(prediction),\n");
        script.append("        'confidence': float(confidence),\n");
        script.append("        'method': 'ml-based'\n");
        script.append("    }\n");
        script.append("    print(json.dumps(result))\n");
        
        script.append("except Exception as e:\n");
        script.append("    import traceback\n");
        script.append("    result = {'error': str(e), 'predictedCutoff': ").append(college.getCutoffScore());
        script.append(", 'confidence': 0.5, 'method': 'fallback'}\n");
        script.append("    print(json.dumps(result))\n");
        
        return script.toString();
    }
    
    /**
     * Execute Python prediction script
     */
    private Map<String, Object> executePythonPrediction(String pythonScript) throws Exception {
        // Write script to temp file
        File tempFile = File.createTempFile("pred_", ".py");
        java.nio.file.Files.write(tempFile.toPath(), pythonScript.getBytes());
        
        try {
            // Execute Python
            ProcessBuilder pb = new ProcessBuilder(pythonExecutable, tempFile.getAbsolutePath());
            pb.redirectErrorStream(true);
            Process process = pb.start();
            
            // Read output
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder output = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line);
            }
            
            process.waitFor();
            
            // Parse JSON result
            String resultJson = output.toString().trim();
            if (resultJson.isEmpty()) {
                throw new Exception("No output from Python script");
            }
            
            return objectMapper.readValue(resultJson, Map.class);
            
        } finally {
            tempFile.delete();
        }
    }
    
    /**
     * Build prediction response
     */
    private PredictionResponse buildPredictionResponse(
            College college,
            PredictionRequest request,
            Map<String, Object> predictionResult) {
        
        Double predictedCutoff = ((Number) predictionResult.getOrDefault("predictedCutoff", 0)).doubleValue();
        Double confidence = ((Number) predictionResult.getOrDefault("confidence", 0.5)).doubleValue();
        Double studentScore = request.getMhtCetScore() != null ? request.getMhtCetScore() : (request.getJeeScore() != null ? request.getJeeScore() : request.getPercentile());
        
        Double matchPercentage = 0.0;
        String matchReason = "No match";
        
        if (studentScore != null && predictedCutoff != null && predictedCutoff > 0) {
            matchPercentage = (studentScore / predictedCutoff) * 100;
            matchPercentage = Math.min(100, Math.max(0, matchPercentage));
            
            if (matchPercentage >= 100) {
                matchReason = "Excellent match - Score above cutoff";
            } else if (matchPercentage >= 95) {
                matchReason = "Very good match";
            } else if (matchPercentage >= 90) {
                matchReason = "Good match";
            } else if (matchPercentage >= 85) {
                matchReason = "Moderate match";
            } else {
                matchReason = "Low match - Score below cutoff";
            }
        }
        
        return PredictionResponse.builder()
                .collegeId(college.getId())
                .collegeName(college.getName())
                .city(college.getCity())
                .branch(college.getBranch())
                .predictedCutoff(predictedCutoff)
                .confidence(confidence)
                .collegeType(college.getCollegeType())
                .rankingScore(college.getRankingScore())
                .matchReason(matchReason)
                .matchPercentage(matchPercentage)
                .build();
    }
    
    /**
     * Train ML model from historical data
     */
    public void trainModel() {
        try {
            log.info("Starting ML model training...");
            
            // Get historical data from last 5 years
            Integer startYear = 2024 - 5;
            List<CutoffHistory> trainingData = cutoffHistoryRepository.findTrainingData(startYear);
            
            if (trainingData.isEmpty()) {
                log.warn("No training data available for model training");
                return;
            }
            
            // Build training script
            String pythonScript = buildTrainingScript(trainingData);
            
            // Execute training
            executePythonTraining(pythonScript);
            
            log.info("Model training completed successfully");
        } catch (Exception e) {
            log.error("Error during model training", e);
        }
    }
    
    /**
     * Build Python training script
     */
    private String buildTrainingScript(List<CutoffHistory> trainingData) {
        // Convert data to JSON and embed in script
        StringBuilder script = new StringBuilder();
        script.append("import json\n");
        script.append("import sys\n");
        script.append("import os\n");
        script.append("sys.path.insert(0, '.')\n\n");
        script.append("from college_predictor_model import CollegePredictor\n");
        script.append("import pandas as pd\n\n");
        
        script.append("# Training data embedded here\n");
        script.append("data = ").append(convertDataToJson(trainingData)).append("\n");
        script.append("df = pd.DataFrame(data)\n\n");
        
        script.append("predictor = CollegePredictor()\n");
        script.append("predictor.train(df)\n");
        script.append("os.makedirs('ml_model', exist_ok=True)\n");
        script.append("predictor.save_model('ml_model/college_predictor_model.pkl')\n");
        script.append("print('Training completed successfully')\n");
        
        return script.toString();
    }
    
    /**
     * Execute Python training script
     */
    private void executePythonTraining(String pythonScript) throws Exception {
        File tempFile = File.createTempFile("train_", ".py");
        java.nio.file.Files.write(tempFile.toPath(), pythonScript.getBytes());
        
        try {
            ProcessBuilder pb = new ProcessBuilder(pythonExecutable, tempFile.getAbsolutePath());
            pb.redirectErrorStream(true);
            Process process = pb.start();
            
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                log.info("Training output: {}", line);
            }
            
            process.waitFor();
        } finally {
            tempFile.delete();
        }
    }
    
    /**
     * Convert training data to JSON format
     */
    private String convertDataToJson(List<CutoffHistory> data) {
        try {
            Map<String, List<?>> jsonData = new HashMap<>();
            
            List<Double> cutoffScores = new ArrayList<>();
            List<Double> rankingScores = new ArrayList<>();
            List<String> branches = new ArrayList<>();
            List<String> categories = new ArrayList<>();
            List<String> collegeTypes = new ArrayList<>();
            List<Integer> years = new ArrayList<>();
            
            for (CutoffHistory ch : data) {
                cutoffScores.add(ch.getCutoffScore());
                rankingScores.add(ch.getCollege().getRankingScore());
                branches.add(ch.getBranch() != null ? ch.getBranch() : "CSE");
                categories.add(ch.getCategory() != null ? ch.getCategory() : "General");
                collegeTypes.add(ch.getCollege().getCollegeType());
                years.add(ch.getCutoffYear());
            }
            
            jsonData.put("cutoff_score", cutoffScores);
            jsonData.put("ranking_score", rankingScores);
            jsonData.put("branch", branches);
            jsonData.put("category", categories);
            jsonData.put("college_type", collegeTypes);
            jsonData.put("cutoff_year", years);
            
            return objectMapper.writeValueAsString(jsonData);
        } catch (Exception e) {
            log.error("Error converting data to JSON", e);
            return "{}";
        }
    }
}
