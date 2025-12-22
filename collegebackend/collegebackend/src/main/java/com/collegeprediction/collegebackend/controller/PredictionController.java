package com.collegeprediction.collegebackend.controller;

import com.collegeprediction.collegebackend.dto.StudentRequest;
import com.collegeprediction.collegebackend.model.College;
import com.collegeprediction.collegebackend.model.Student;
import com.collegeprediction.collegebackend.service.PredictionService;
import com.collegeprediction.collegebackend.repository.StudentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:3001" })
public class PredictionController {

  private final PredictionService predictionService;
  private final StudentRepository studentRepository;

  public PredictionController(PredictionService predictionService, StudentRepository studentRepository) {
    this.predictionService = predictionService;
    this.studentRepository = studentRepository;
  }

  @PostMapping("/students/register")
  public ResponseEntity<?> registerStudent(@RequestBody StudentRequest request) {
    try {
      Student student = new Student();
      student.setName(request.getName());
      student.setEmail(request.getEmail());
      student.setPhoneNumber(request.getPhoneNumber());
      student.setTenthPercentage(request.getTenthPercentage());
      student.setTwelfthPercentage(request.getTwelfthPercentage());
      student.setJeeScore(request.getJeeScore());

      Student savedStudent = studentRepository.save(student);
      return ResponseEntity.ok(savedStudent);
    } catch (Exception e) {
      return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
    }
  }

  @PostMapping("/predict")
  public ResponseEntity<List<College>> predict(@RequestBody StudentRequest request) {
    List<College> result = predictionService.predict(request);
    return ResponseEntity.ok(result);
  }
}
