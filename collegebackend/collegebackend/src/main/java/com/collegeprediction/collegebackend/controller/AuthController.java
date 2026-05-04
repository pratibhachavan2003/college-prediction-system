package com.collegeprediction.collegebackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.collegeprediction.collegebackend.dto.LoginRequest;
import com.collegeprediction.collegebackend.dto.LoginResponse;
import com.collegeprediction.collegebackend.model.User;
import com.collegeprediction.collegebackend.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;

import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api")
// @CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        log.info("Login attempt for email: {}", request.getEmail());

        Optional<User> userOptional = userRepository.findByEmailAndPassword(request.getEmail(), request.getPassword());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (!user.isActive()) {
                log.warn("Login attempt for inactive user: {}", request.getEmail());
                return ResponseEntity.status(400).body("Account is inactive");
            }

            LoginResponse response = new LoginResponse(
                user.getId(),
                user.getEmail(),
                user.getName(),
                user.getRole(),
                "Login successful"
            );
            log.info("Login successful for: {}", request.getEmail());
            return ResponseEntity.ok(response);
        } else {
            log.warn("Invalid credentials for email: {}", request.getEmail());
            return ResponseEntity.status(400).body("Invalid credentials");
        }
    }

    @GetMapping("/health")
     public ResponseEntity<Map<String, String>> health() {
         return ResponseEntity.ok(Map.of("status", "UP" , "port" , "8090"));
     }
}
