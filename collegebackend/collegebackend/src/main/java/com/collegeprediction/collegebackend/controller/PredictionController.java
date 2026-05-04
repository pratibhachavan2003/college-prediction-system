package com.collegeprediction.collegebackend.controller;

import com.collegeprediction.collegebackend.dto.StudentRequest;
import com.collegeprediction.collegebackend.dto.PredictionRequest;
import com.collegeprediction.collegebackend.dto.PredictionResponse;
import com.collegeprediction.collegebackend.model.College;
import com.collegeprediction.collegebackend.model.User;
import com.collegeprediction.collegebackend.service.PredictionService;
import com.collegeprediction.collegebackend.service.MLPredictionService;
import com.collegeprediction.collegebackend.repository.UserRepository;
import com.collegeprediction.collegebackend.repository.CollegeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:3001", "http://localhost:3003" })
@Slf4j
public class PredictionController {

  private final PredictionService predictionService;
  private final MLPredictionService mlPredictionService;
  private final UserRepository userRepository;
  private final CollegeRepository collegeRepository;

  public PredictionController(
      PredictionService predictionService,
      MLPredictionService mlPredictionService,
      UserRepository userRepository,
      CollegeRepository collegeRepository) {
    this.predictionService = predictionService;
    this.mlPredictionService = mlPredictionService;
    this.userRepository = userRepository;
    this.collegeRepository = collegeRepository;
  }

  @PostMapping("/students/register")
  public ResponseEntity<?> registerStudent(@RequestBody StudentRequest request) {
    try {
      User user = new User(
        request.getName(),
        request.getEmail(),
        request.getPhoneNumber(),
        request.getPassword(),
        request.getTenthPercentage(),
        request.getTwelfthPercentage(),
        request.getJeeScore(),
        "student"
      );
      User savedUser = userRepository.save(user);
      return ResponseEntity.ok(savedUser);
    } catch (Exception e) {
      return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
    }
  }

  @PostMapping("/predict")
  public ResponseEntity<List<College>> predict(@RequestBody StudentRequest request) {
    log.info("Received prediction request: {}", request);
    try {
      List<College> result = predictionService.predict(request);
      log.info("Prediction result: {} colleges", result.size());
      return ResponseEntity.ok(result);
    } catch (Exception e) {
      log.error("Error in prediction: {}", e.getMessage());
      return ResponseEntity.internalServerError().build();
    }
  }
  
  /**
   * ML-based prediction endpoint
   * POST /api/predict-ml
   */
  @PostMapping("/predict-ml")
  public ResponseEntity<Map<String, Object>> predictML(@RequestBody PredictionRequest request) {
    log.info("Received ML prediction request: {}", request);
    try {
      List<PredictionResponse> predictions = mlPredictionService.getPredictions(request);
      Map<String, Object> response = new java.util.HashMap<>();
      response.put("status", "success");
      response.put("predictions", predictions);
      response.put("total", predictions.size());
      return ResponseEntity.ok(response);
    } catch (Exception e) {
      log.error("Error in ML prediction: {}", e.getMessage());
      Map<String, Object> errorResponse = new java.util.HashMap<>();
      errorResponse.put("status", "error");
      errorResponse.put("message", e.getMessage());
      return ResponseEntity.internalServerError().body(errorResponse);
    }
  }

  // @GetMapping("/health")
  // public ResponseEntity<String> health() {
  //   return ResponseEntity.ok("OK");
  // }
}
