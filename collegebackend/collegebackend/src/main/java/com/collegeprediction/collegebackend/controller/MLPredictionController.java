package com.collegeprediction.collegebackend.controller;

import com.collegeprediction.collegebackend.dto.PredictionRequest;
import com.collegeprediction.collegebackend.dto.PredictionResponse;
import com.collegeprediction.collegebackend.model.CutoffHistory;
import com.collegeprediction.collegebackend.repository.CutoffHistoryRepository;
import com.collegeprediction.collegebackend.service.MLPredictionService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ml")
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:3001", "http://localhost:3003" })
@Slf4j
public class MLPredictionController {
    
    private final MLPredictionService mlPredictionService;
    private final CutoffHistoryRepository cutoffHistoryRepository;
    
    public MLPredictionController(
            MLPredictionService mlPredictionService,
            CutoffHistoryRepository cutoffHistoryRepository) {
        this.mlPredictionService = mlPredictionService;
        this.cutoffHistoryRepository = cutoffHistoryRepository;
    }
    
    /**
     * Get ML-based college predictions for a student
     * POST /api/ml/predict
     */
    @PostMapping("/predict")
    public ResponseEntity<Map<String, Object>> getPredictions(@RequestBody PredictionRequest request) {
        try {
            log.info("Received prediction request: {}", request);
            
            // Validate request - accept either mhtCetScore or percentile
            if (request.getMhtCetScore() == null && request.getPercentile() == null) {
                return ResponseEntity.badRequest().body(
                    createErrorResponse("Either MHT-CET score or percentile is required")
                );
            }
            
            // Get predictions from ML service
            List<PredictionResponse> predictions = mlPredictionService.getPredictions(request);
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("timestamp", LocalDateTime.now());
            response.put("totalPredictions", predictions.size());
            response.put("predictions", predictions);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("Error in prediction endpoint", e);
            return ResponseEntity.internalServerError().body(
                createErrorResponse("Prediction failed: " + e.getMessage())
            );
        }
    }
    
    /**
     * Get historical cutoff data for a college
     * GET /api/ml/college/{collegeId}/history
     */
    @GetMapping("/college/{collegeId}/history")
    public ResponseEntity<Map<String, Object>> getCollegeHistory(
            @PathVariable Long collegeId,
            @RequestParam(required = false, defaultValue = "3") Integer years) {
        try {
            Integer endYear = 2024;
            Integer startYear = endYear - years;
            
            List<CutoffHistory> history = cutoffHistoryRepository
                .findHistoricalData(collegeId, startYear, endYear);
            
            Map<String, Object> response = new HashMap<>();
            response.put("collegeId", collegeId);
            response.put("years", years);
            response.put("records", history.size());
            response.put("history", history);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("Error fetching college history", e);
            return ResponseEntity.internalServerError().body(
                createErrorResponse("Failed to fetch history")
            );
        }
    }
    
    /**
     * Get statistics for historical cutoff data
     * GET /api/ml/statistics
     */
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getStatistics() {
        try {
            List<Integer> years = cutoffHistoryRepository.findAllDistinctYears();
            Long totalRecords = cutoffHistoryRepository.count();
            
            Map<String, Object> stats = new HashMap<>();
            stats.put("totalRecords", totalRecords);
            stats.put("yearsAvailable", years);
            stats.put("timestamp", LocalDateTime.now());
            
            return ResponseEntity.ok(stats);
            
        } catch (Exception e) {
            log.error("Error fetching statistics", e);
            return ResponseEntity.internalServerError().body(
                createErrorResponse("Failed to fetch statistics")
            );
        }
    }
    
    /**
     * Trigger ML model training
     * POST /api/ml/train
     */
    @PostMapping("/train")
    public ResponseEntity<Map<String, Object>> trainModel() {
        try {
            log.info("Training ML model...");
            
            // Run training asynchronously
            new Thread(() -> {
                try {
                    mlPredictionService.trainModel();
                } catch (Exception e) {
                    log.error("Error during async model training", e);
                }
            }).start();
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "training_started");
            response.put("message", "ML model training started in background");
            response.put("timestamp", LocalDateTime.now());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("Error starting model training", e);
            return ResponseEntity.internalServerError().body(
                createErrorResponse("Failed to start training: " + e.getMessage())
            );
        }
    }
    
    /**
     * Add historical cutoff record (for data management)
     * POST /api/ml/cutoff-history
     */
    @PostMapping("/cutoff-history")
    public ResponseEntity<Map<String, Object>> addCutoffHistory(@RequestBody CutoffHistory history) {
        try {
            CutoffHistory saved = cutoffHistoryRepository.save(history);
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Cutoff history record added");
            response.put("data", saved);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("Error adding cutoff history", e);
            return ResponseEntity.badRequest().body(
                createErrorResponse("Failed to add cutoff history: " + e.getMessage())
            );
        }
    }
    
    /**
     * Get available years for historical data
     * GET /api/ml/years
     */
    @GetMapping("/years")
    public ResponseEntity<Map<String, Object>> getAvailableYears() {
        try {
            List<Integer> years = cutoffHistoryRepository.findAllDistinctYears();
            
            Map<String, Object> response = new HashMap<>();
            response.put("years", years);
            response.put("count", years.size());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("Error fetching available years", e);
            return ResponseEntity.internalServerError().body(
                createErrorResponse("Failed to fetch years")
            );
        }
    }
    
    /**
     * Helper method to create error response
     */
    private Map<String, Object> createErrorResponse(String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "error");
        response.put("message", message);
        response.put("timestamp", LocalDateTime.now());
        return response;
    }
}
