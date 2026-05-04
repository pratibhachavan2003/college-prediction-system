package com.collegeprediction.collegebackend.controller;

import com.collegeprediction.collegebackend.model.CutoffHistory;
import com.collegeprediction.collegebackend.repository.CutoffHistoryRepository;
import com.collegeprediction.collegebackend.repository.CollegeRepository;
import com.collegeprediction.collegebackend.service.CutoffService;
import com.collegeprediction.collegebackend.dto.CutoffTrendDTO;
import com.collegeprediction.collegebackend.dto.CutoffAnalysisDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/cutoff")
public class CutoffController {

    @Autowired
    private CutoffHistoryRepository cutoffHistoryRepository;
    
    @Autowired
    private CollegeRepository collegeRepository;
    
    @Autowired
    private CutoffService cutoffService;

    /**
     * Get cutoff data for a specific year and round
     * @param year The year (e.g., 2025, 2024, 2023)
     * @param round The round number (1, 2, or 3)
     * @param branch Optional branch filter
     * @return List of cutoff data
     */
    @GetMapping("/year/{year}/round/{round}")
    public ResponseEntity<?> getCutoffByYearAndRound(
            @PathVariable Integer year,
            @PathVariable Integer round,
            @RequestParam(required = false) String branch) {
        log.info("Fetching cutoff data for year: {}, round: {}, branch: {}", year, round, branch);
        
        try {
            List<CutoffHistory> cutoffData = cutoffHistoryRepository.findAll().stream()
                    .filter(c -> c.getCutoffYear().equals(year))
                    .filter(c -> branch == null || branch.isEmpty() || "All".equals(branch) || branch.equalsIgnoreCase(c.getBranch()))
                    .collect(Collectors.toList());
            
            if (cutoffData.isEmpty()) {
                return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "message", "No cutoff data found for year: " + year + (branch != null && !branch.isEmpty() && !"All".equals(branch) ? " and branch: " + branch : ""),
                    "data", new ArrayList<>()
                ));
            }
            
            return ResponseEntity.ok(Map.of(
                "status", "success",
                "year", year,
                "round", round,
                "branch", branch != null ? branch : "",
                "totalRecords", cutoffData.size(),
                "data", cutoffData
            ));
        } catch (Exception e) {
            log.error("Error fetching cutoff data", e);
            return ResponseEntity.status(400).body(Map.of(
                "status", "error",
                "message", e.getMessage()
            ));
        }
    }

    /**
     * Get all available years in the database
     */
    @GetMapping("/years")
    public ResponseEntity<?> getAvailableYears() {
        log.info("Fetching available years");
        
        try {
            List<Integer> years = cutoffHistoryRepository.findAllDistinctYears();
            return ResponseEntity.ok(Map.of(
                "status", "success",
                "years", years,
                "count", years.size()
            ));
        } catch (Exception e) {
            log.error("Error fetching available years", e);
            return ResponseEntity.status(400).body(Map.of(
                "status", "error",
                "message", e.getMessage()
            ));
        }
    }

    /**
     * Get cutoff data for a specific year
     */
    @GetMapping("/year/{year}")
    public ResponseEntity<?> getCutoffByYear(@PathVariable Integer year) {
        log.info("Fetching cutoff data for year: {}", year);
        
        try {
            List<CutoffHistory> cutoffData = cutoffHistoryRepository.findByCutoffYearBetween(year, year);
            
            // Convert to simpler response format for frontend
            List<Map<String, Object>> dataArray = cutoffData.stream()
                    .map(c -> {
                        Map<String, Object> item = new HashMap<>();
                        item.put("id", c.getId());
                        item.put("collegeName", c.getCollege() != null ? c.getCollege().getName() : "Unknown");
                        item.put("branch", c.getBranch());
                        item.put("category", c.getCategory());
                        item.put("cutoffScore", c.getCutoffScore());
                        item.put("closingRank", c.getClosingRank());
                        item.put("seatType", c.getSeatType());
                        item.put("year", c.getCutoffYear());
                        return item;
                    })
                    .collect(Collectors.toList());
            
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("status", "success");
            response.put("year", year);
            response.put("totalRecords", cutoffData.size());
            response.put("data", dataArray);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error fetching cutoff data for year", e);
            return ResponseEntity.status(400).body(Map.of(
                "status", "error",
                "message", e.getMessage()
            ));
        }
    }

    /**
     * Get cutoff data for a specific college across all years
     */
    @GetMapping("/college/{collegeName}")
    public ResponseEntity<?> getCutoffByCollege(@PathVariable String collegeName) {
        log.info("Fetching cutoff data for college: {}", collegeName);
        
        try {
            List<CutoffHistory> cutoffData = cutoffHistoryRepository.findAll().stream()
                    .filter(c -> c.getCollege() != null && c.getCollege().getName().equalsIgnoreCase(collegeName))
                    .sorted(Comparator.comparingInt(CutoffHistory::getCutoffYear).reversed())
                    .collect(Collectors.toList());
            
            if (cutoffData.isEmpty()) {
                return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "message", "No cutoff data found for college: " + collegeName,
                    "data", new ArrayList<>()
                ));
            }
            
            // Group by year
            Map<Integer, List<CutoffHistory>> groupedByYear = cutoffData.stream()
                    .collect(Collectors.groupingBy(CutoffHistory::getCutoffYear, 
                        LinkedHashMap::new,
                        Collectors.toList()));
            
            return ResponseEntity.ok(Map.of(
                "status", "success",
                "college", collegeName,
                "yearsCount", groupedByYear.size(),
                "data", groupedByYear
            ));
        } catch (Exception e) {
            log.error("Error fetching cutoff data for college", e);
            return ResponseEntity.status(400).body(Map.of(
                "status", "error",
                "message", e.getMessage()
            ));
        }
    }

    /**
     * Get cutoff data by branch
     */
    @GetMapping("/branch/{branch}")
    public ResponseEntity<?> getCutoffByBranch(@PathVariable String branch) {
        log.info("Fetching cutoff data for branch: {}", branch);
        
        try {
            List<CutoffHistory> cutoffData = cutoffHistoryRepository.findByBranch(branch);
            
            if (cutoffData.isEmpty()) {
                return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "message", "No cutoff data found for branch: " + branch,
                    "data", new ArrayList<>()
                ));
            }
            
            // Group by year and college
            Map<Integer, List<CutoffHistory>> groupedByYear = cutoffData.stream()
                    .collect(Collectors.groupingBy(CutoffHistory::getCutoffYear));
            
            return ResponseEntity.ok(Map.of(
                "status", "success",
                "branch", branch,
                "totalRecords", cutoffData.size(),
                "yearsAvailable", groupedByYear.keySet(),
                "data", groupedByYear
            ));
        } catch (Exception e) {
            log.error("Error fetching cutoff data for branch", e);
            return ResponseEntity.status(400).body(Map.of(
                "status", "error",
                "message", e.getMessage()
            ));
        }
    }

    /**
     * Get cutoff data for range of years
     */
    @GetMapping("/range")
    public ResponseEntity<?> getCutoffRange(
            @RequestParam Integer startYear,
            @RequestParam Integer endYear) {
        log.info("Fetching cutoff data for years: {} to {}", startYear, endYear);
        
        try {
            List<CutoffHistory> cutoffData = cutoffHistoryRepository.findByCutoffYearBetween(startYear, endYear);
            
            if (cutoffData.isEmpty()) {
                return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "message", "No cutoff data found for range",
                    "data", new ArrayList<>()
                ));
            }
            
            // Group by year
            Map<Integer, List<CutoffHistory>> groupedByYear = cutoffData.stream()
                    .collect(Collectors.groupingBy(CutoffHistory::getCutoffYear, 
                        LinkedHashMap::new,
                        Collectors.toList()));
            
            return ResponseEntity.ok(Map.of(
                "status", "success",
                "startYear", startYear,
                "endYear", endYear,
                "totalRecords", cutoffData.size(),
                "yearsAvailable", groupedByYear.keySet(),
                "data", groupedByYear
            ));
        } catch (Exception e) {
            log.error("Error fetching cutoff data for range", e);
            return ResponseEntity.status(400).body(Map.of(
                "status", "error",
                "message", e.getMessage()
            ));
        }
    }

    /**
     * Get all cutoff data with optional filtering
     */
    @GetMapping("/all")
    public ResponseEntity<?> getAllCutoffData(
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) String branch,
            @RequestParam(required = false) String college) {
        log.info("Fetching all cutoff data with filters - year: {}, branch: {}, college: {}", year, branch, college);
        
        try {
            List<CutoffHistory> cutoffData = cutoffHistoryRepository.findAll();
            
            // Apply filters
            if (year != null) {
                cutoffData = cutoffData.stream()
                        .filter(c -> c.getCutoffYear().equals(year))
                        .collect(Collectors.toList());
            }
            
            if (branch != null && !branch.isEmpty()) {
                cutoffData = cutoffData.stream()
                        .filter(c -> c.getBranch() != null && c.getBranch().equalsIgnoreCase(branch))
                        .collect(Collectors.toList());
            }
            
            if (college != null && !college.isEmpty()) {
                cutoffData = cutoffData.stream()
                        .filter(c -> c.getCollege() != null && c.getCollege().getName().equalsIgnoreCase(college))
                        .collect(Collectors.toList());
            }
            
            return ResponseEntity.ok(Map.of(
                "status", "success",
                "totalRecords", cutoffData.size(),
                "filters", Map.of(
                    "year", year,
                    "branch", branch,
                    "college", college
                ),
                "data", cutoffData
            ));
        } catch (Exception e) {
            log.error("Error fetching all cutoff data", e);
            return ResponseEntity.status(400).body(Map.of(
                "status", "error",
                "message", e.getMessage()
            ));
        }
    }

    /**
     * Get cutoff statistics
     */
    @GetMapping("/statistics")
    public ResponseEntity<?> getCutoffStatistics() {
        log.info("Fetching cutoff statistics");
        
        try {
            List<CutoffHistory> allData = cutoffHistoryRepository.findAll();
            
            Map<String, Object> stats = new LinkedHashMap<>();
            stats.put("totalRecords", allData.size());
            
            // Years available
            List<Integer> years = allData.stream()
                    .map(CutoffHistory::getCutoffYear)
                    .distinct()
                    .sorted(Comparator.reverseOrder())
                    .collect(Collectors.toList());
            stats.put("yearsAvailable", years);
            
            // Branches available
            List<String> branches = allData.stream()
                    .map(CutoffHistory::getBranch)
                    .filter(Objects::nonNull)
                    .distinct()
                    .sorted()
                    .collect(Collectors.toList());
            stats.put("branchesAvailable", branches);
            
            // Colleges available
            List<String> colleges = allData.stream()
                    .map(c -> c.getCollege() != null ? c.getCollege().getName() : null)
                    .filter(Objects::nonNull)
                    .distinct()
                    .sorted()
                    .collect(Collectors.toList());
            stats.put("collegesCount", colleges.size());
            stats.put("colleges", colleges);
            
            // Average cutoff scores by year
            Map<Integer, Double> avgByYear = allData.stream()
                    .collect(Collectors.groupingBy(
                        CutoffHistory::getCutoffYear,
                        Collectors.averagingDouble(c -> c.getCutoffScore() != null ? c.getCutoffScore() : 0)
                    ));
            stats.put("averageCutoffByYear", avgByYear);
            
            return ResponseEntity.ok(Map.of(
                "status", "success",
                "statistics", stats
            ));
        } catch (Exception e) {
            log.error("Error fetching cutoff statistics", e);
            return ResponseEntity.status(400).body(Map.of(
                "status", "error",
                "message", e.getMessage()
            ));
        }
    }

    /**
     * Get cutoff trend for a specific college
     */
    @GetMapping("/college/{collegeId}/trend")
    public ResponseEntity<?> getCutoffTrend(@PathVariable Long collegeId) {
        log.info("Fetching cutoff trend for college: {}", collegeId);
        
        try {
            CutoffTrendDTO trend = cutoffService.getCutoffTrend(collegeId);
            return ResponseEntity.ok(Map.of(
                "status", "success",
                "data", trend
            ));
        } catch (Exception e) {
            log.error("Error fetching cutoff trend", e);
            return ResponseEntity.status(400).body(Map.of(
                "status", "error",
                "message", e.getMessage()
            ));
        }
    }

    /**
     * Get cutoff analysis for a specific year
     */
    @GetMapping("/analysis/{year}")
    public ResponseEntity<?> getCutoffAnalysis(@PathVariable Integer year) {
        log.info("Fetching cutoff analysis for year: {}", year);
        
        try {
            CutoffAnalysisDTO analysis = cutoffService.getCutoffAnalysis(year);
            return ResponseEntity.ok(Map.of(
                "status", "success",
                "data", analysis
            ));
        } catch (Exception e) {
            log.error("Error fetching cutoff analysis", e);
            return ResponseEntity.status(400).body(Map.of(
                "status", "error",
                "message", e.getMessage()
            ));
        }
    }

    /**
     * Predict college eligibility based on student score
     */
    @GetMapping("/predict")
    public ResponseEntity<?> predictEligibility(
            @RequestParam Double score,
            @RequestParam(required = false) String branch,
            @RequestParam(required = false, defaultValue = "2025") Integer year) {
        log.info("Predicting eligibility for score: {}, branch: {}, year: {}", score, branch, year);
        
        try {
            List<Map<String, Object>> predictions = cutoffService.predictEligibility(score, branch, year);
            
            // Map.of does not allow null values, so convert branch to empty string if null
            String branchValue = branch == null ? "" : branch;

            return ResponseEntity.ok(Map.of(
                "status", "success",
                "studentScore", score,
                "branch", branchValue,
                "year", year,
                "eligibleColleges", predictions.size(),
                "data", predictions
            ));
        } catch (Exception e) {
            log.error("Error predicting eligibility", e);
            return ResponseEntity.status(400).body(Map.of(
                "status", "error",
                "message", e.getMessage()
            ));
        }
    }

    /**
     * Get year-over-year cutoff change for a college
     */
    @GetMapping("/college/{collegeId}/yoy-change")
    public ResponseEntity<?> getYoYChange(
            @PathVariable Long collegeId,
            @RequestParam(defaultValue = "2024") Integer previousYear,
            @RequestParam(defaultValue = "2025") Integer currentYear) {
        log.info("Calculating YoY change for college: {} from {} to {}", collegeId, previousYear, currentYear);
        
        try {
            Map<String, Object> result = cutoffService.calculateYoYChange(collegeId, previousYear, currentYear);
            
            return ResponseEntity.ok(Map.of(
                "status", "success",
                "data", result
            ));
        } catch (Exception e) {
            log.error("Error calculating YoY change", e);
            return ResponseEntity.status(400).body(Map.of(
                "status", "error",
                "message", e.getMessage()
            ));
        }
    }

    /**
     * Get all distinct categories from cutoff data
     */
    @GetMapping("/categories")
    public ResponseEntity<?> getAllCategories() {
        log.info("Fetching all distinct categories");
        
        try {
            List<String> categories = cutoffHistoryRepository.findAllDistinctCategories();
            
            return ResponseEntity.ok(Map.of(
                "status", "success",
                "data", categories
            ));
        } catch (Exception e) {
            log.error("Error fetching categories", e);
            return ResponseEntity.status(400).body(Map.of(
                "status", "error",
                "message", e.getMessage()
            ));
        }
    }

    /**
     * Get all distinct branches from cutoff data
     */
    @GetMapping("/branches")
    public ResponseEntity<?> getAllBranches() {
        log.info("Fetching all distinct branches");
        
        try {
            List<String> branches = cutoffHistoryRepository.findAllDistinctBranches();
            
            return ResponseEntity.ok(Map.of(
                "status", "success",
                "data", branches
            ));
        } catch (Exception e) {
            log.error("Error fetching branches", e);
            return ResponseEntity.status(400).body(Map.of(
                "status", "error",
                "message", e.getMessage()
            ));
        }
    }

    /**
     * Get all distinct cities where colleges are located
     */
    @GetMapping("/locations")
    public ResponseEntity<?> getAllLocations() {
        log.info("Fetching all distinct college locations");
        
        try {
            List<String> locations = collegeRepository.findAllDistinctCities();
            // add generic option to allow users to search anywhere
            if (!locations.contains("All")) {
                locations.add(0, "All");
            }
            
            return ResponseEntity.ok(Map.of(
                "status", "success",
                "data", locations
            ));
        } catch (Exception e) {
            log.error("Error fetching locations", e);
            return ResponseEntity.status(400).body(Map.of(
                "status", "error",
                "message", e.getMessage()
            ));
        }
    }

    /**
     * Get all distinct college types
     */
    @GetMapping("/college-types")
    public ResponseEntity<?> getAllCollegeTypes() {
        log.info("Fetching all distinct college types");
        
        try {
            List<String> collegeTypes = collegeRepository.findAllDistinctCollegeTypes();
            // include "All" so users can avoid type filtering
            if (!collegeTypes.contains("All")) {
                collegeTypes.add(0, "All");
            }
            
            return ResponseEntity.ok(Map.of(
                "status", "success",
                "data", collegeTypes
            ));
        } catch (Exception e) {
            log.error("Error fetching college types", e);
            return ResponseEntity.status(400).body(Map.of(
                "status", "error",
                "message", e.getMessage()
            ));
        }
    }
}

