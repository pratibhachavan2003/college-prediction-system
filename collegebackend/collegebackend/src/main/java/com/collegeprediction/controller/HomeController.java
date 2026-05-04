package com.collegeprediction.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
public class HomeController {

  @GetMapping("/")
  public String home() {
    return "✅ College Prediction System Backend is running successfully!";
  }

  @GetMapping("/api/health")
  public Map<String, Object> health() {
    Map<String, Object> response = new HashMap<>();
    response.put("status", "UP");
    response.put("message", "Backend server is healthy");
    response.put("timestamp", System.currentTimeMillis());
    return response;
  }
}
