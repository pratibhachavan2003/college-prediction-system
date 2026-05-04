package com.collegeprediction.collegebackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.collegeprediction.collegebackend.model.College;
import com.collegeprediction.collegebackend.model.User;
import com.collegeprediction.collegebackend.repository.CollegeRepository;
import com.collegeprediction.collegebackend.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/admin")
// @CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CollegeRepository collegeRepository;

    @GetMapping("/students")
    public ResponseEntity<List<User>> getAllStudents() {
        log.info("Fetching all students for admin");
        try {
            List<User> students = userRepository.findAll();
            return ResponseEntity.ok(students);
        } catch (Exception e) {
            log.error("Error fetching students: ", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/colleges")
    public ResponseEntity<List<College>> getAllColleges() {
        log.info("Fetching all colleges for admin");
        try {
            List<College> colleges = collegeRepository.findAll();
            return ResponseEntity.ok(colleges);
        } catch (Exception e) {
            log.error("Error fetching colleges: ", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/colleges/{id}")
    public ResponseEntity<College> getCollegeById(@PathVariable Long id) {
        log.info("Fetching college with id: {}", id);
        try {
            Optional<College> college = collegeRepository.findById(id);
            if (college.isPresent()) {
                return ResponseEntity.ok(college.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            log.error("Error fetching college: ", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/colleges")
    public ResponseEntity<College> createCollege(@RequestBody College college) {
        log.info("Creating new college: {}", college.getName());
        try {
            College savedCollege = collegeRepository.save(college);
            return ResponseEntity.ok(savedCollege);
        } catch (Exception e) {
            log.error("Error creating college: ", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/colleges/{id}")
    public ResponseEntity<College> updateCollege(@PathVariable Long id, @RequestBody College college) {
        log.info("Updating college with id: {}", id);
        try {
            if (!collegeRepository.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            college.setId(id);
            College updatedCollege = collegeRepository.save(college);
            return ResponseEntity.ok(updatedCollege);
        } catch (Exception e) {
            log.error("Error updating college: ", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/colleges/{id}")
    public ResponseEntity<Void> deleteCollege(@PathVariable Long id) {
        log.info("Deleting college with id: {}", id);
        try {
            if (!collegeRepository.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            collegeRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            log.error("Error deleting college: ", e);
            return ResponseEntity.internalServerError().build();
        }
    }
}