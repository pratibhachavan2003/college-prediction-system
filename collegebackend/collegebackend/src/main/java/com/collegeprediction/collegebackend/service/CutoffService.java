package com.collegeprediction.collegebackend.service;

import com.collegeprediction.collegebackend.dto.CutoffAnalysisDTO;
import com.collegeprediction.collegebackend.dto.CutoffTrendDTO;
import com.collegeprediction.collegebackend.model.CutoffHistory;
import com.collegeprediction.collegebackend.repository.CutoffHistoryRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
public class CutoffService {

    @Autowired
    private CutoffHistoryRepository cutoffHistoryRepository;

    /**
     * Get cutoff trends for a specific college across years
     */
    public CutoffTrendDTO getCutoffTrend(Long collegeId) {
        log.info("Fetching cutoff trend for college: {}", collegeId);
        
        List<CutoffHistory> cutoffData = cutoffHistoryRepository.findByCollegeId(collegeId);
        
        CutoffTrendDTO trend = new CutoffTrendDTO();
        trend.setCollegeId(collegeId);
        trend.setTotalRecords(cutoffData.size());
        
        if (!cutoffData.isEmpty()) {
            double avgCutoff = cutoffData.stream()
                    .mapToDouble(CutoffHistory::getCutoffScore)
                    .average()
                    .orElse(0.0);
            
            double maxCutoff = cutoffData.stream()
                    .mapToDouble(CutoffHistory::getCutoffScore)
                    .max()
                    .orElse(0.0);
            
            double minCutoff = cutoffData.stream()
                    .mapToDouble(CutoffHistory::getCutoffScore)
                    .min()
                    .orElse(0.0);
            
            trend.setAverageCutoff(Math.round(avgCutoff * 100.0) / 100.0);
            trend.setMaxCutoff(Math.round(maxCutoff * 100.0) / 100.0);
            trend.setMinCutoff(Math.round(minCutoff * 100.0) / 100.0);
            
            // Sort by year
            List<Map<String, Object>> yearlyData = cutoffData.stream()
                    .sorted(Comparator.comparingInt(CutoffHistory::getCutoffYear))
                    .map(c -> {
                        Map<String, Object> data = new HashMap<>();
                        data.put("year", c.getCutoffYear());
                        data.put("cutoff", c.getCutoffScore());
                        data.put("branch", c.getBranch());
                        data.put("category", c.getCategory());
                        data.put("seatType", c.getSeatType());
                        return data;
                    })
                    .collect(Collectors.toList());
            
            trend.setYearlyData(yearlyData);
        }
        
        return trend;
    }

    /**
     * Get all years available in cutoff database
     */
    public List<Integer> getAvailableYears() {
        log.info("Fetching available years");
        return cutoffHistoryRepository.findAllDistinctYears();
    }

    /**
     * Get cutoff analysis for a specific year
     */
    public CutoffAnalysisDTO getCutoffAnalysis(Integer year) {
        log.info("Fetching cutoff analysis for year: {}", year);
        
        List<CutoffHistory> yearData = cutoffHistoryRepository.findByCutoffYearBetween(year, year);
        
        CutoffAnalysisDTO analysis = new CutoffAnalysisDTO();
        analysis.setYear(year);
        analysis.setTotalRecords(yearData.size());
        
        if (!yearData.isEmpty()) {
            // Group by college
            Map<Long, List<CutoffHistory>> byCollege = yearData.stream()
                    .collect(Collectors.groupingBy(c -> c.getCollege().getId()));
            
            analysis.setTotalColleges(byCollege.size());
            
            // Group by branch
            Map<String, List<CutoffHistory>> byBranch = yearData.stream()
                    .collect(Collectors.groupingBy(CutoffHistory::getBranch));
            
            analysis.setBranchWiseData(byBranch.entrySet().stream()
                    .collect(Collectors.toMap(
                            Map.Entry::getKey,
                            e -> e.getValue().stream()
                                    .mapToDouble(CutoffHistory::getCutoffScore)
                                    .average()
                                    .orElse(0.0)
                    )));
            
            // Overall statistics
            double avgCutoff = yearData.stream()
                    .mapToDouble(CutoffHistory::getCutoffScore)
                    .average()
                    .orElse(0.0);
            
            analysis.setAverageCutoff(Math.round(avgCutoff * 100.0) / 100.0);
            analysis.setHighestCutoff(yearData.stream()
                    .mapToDouble(CutoffHistory::getCutoffScore)
                    .max()
                    .orElse(0.0));
            analysis.setLowestCutoff(yearData.stream()
                    .mapToDouble(CutoffHistory::getCutoffScore)
                    .min()
                    .orElse(0.0));
        }
        
        return analysis;
    }

    /**
     * Predict college eligibility based on cutoff scores
     * @param studentScore - Student's percentile/score
     * @param branch - Preferred branch
     * @param year - Academic year
     */
    public List<Map<String, Object>> predictEligibility(Double studentScore, String branch, Integer year) {
        log.info("Predicting eligibility for score: {}, branch: {}, year: {}", studentScore, branch, year);
        
        List<CutoffHistory> cutoffData = cutoffHistoryRepository.findByCutoffYearBetween(year, year);
        
        List<Map<String, Object>> eligibleColleges = cutoffData.stream()
                // branch filter: ignore when param is null or empty
                .filter(c -> branch == null || branch.isEmpty() || c.getBranch().equalsIgnoreCase(branch))
                .filter(c -> c.getCutoffScore() <= studentScore)
                .sorted(Comparator.comparingDouble(CutoffHistory::getCutoffScore).reversed())
                .map(c -> {
                    Map<String, Object> college = new HashMap<>();
                    college.put("collegeName", c.getCollege().getName());
                    college.put("branch", c.getBranch());
                    college.put("category", c.getCategory());
                    college.put("cutoffScore", c.getCutoffScore());
                    college.put("closingRank", c.getClosingRank());
                    college.put("seatType", c.getSeatType());
                    college.put("marginAboveCutoff", Math.round((studentScore - c.getCutoffScore()) * 100.0) / 100.0);
                    return college;
                })
                .collect(Collectors.toList());
        
        return eligibleColleges;
    }

    /**
     * Get cutoff trends comparison for multiple years
     */
    public Map<String, Object> getTrendComparison(Long collegeId, List<Integer> years) {
        log.info("Fetching trend comparison for college: {} across years: {}", collegeId, years);
        
        Map<String, Object> response = new HashMap<>();
        Map<Integer, List<CutoffHistory>> dataByYear = new HashMap<>();
        
        for (Integer year : years) {
            List<CutoffHistory> yearData = cutoffHistoryRepository.findByCollegeIdAndCutoffYear(collegeId, year)
                    .map(Collections::singletonList)
                    .orElse(new ArrayList<>());
            dataByYear.put(year, yearData);
        }
        
        response.put("collegeId", collegeId);
        response.put("yearsCompared", years);
        response.put("data", dataByYear);
        
        return response;
    }

    /**
     * Get all cutoff records for a specific year and category
     */
    public List<CutoffHistory> getCutoffsByYearAndCategory(Integer year, String category) {
        log.info("Fetching cutoffs for year: {} and category: {}", year, category);
        
        return cutoffHistoryRepository.findByCutoffYearBetween(year, year).stream()
                .filter(c -> category == null || c.getCategory().equalsIgnoreCase(category))
                .collect(Collectors.toList());
    }

    /**
     * Calculate cutoff increase/decrease percentage year-over-year
     */
    public Map<String, Object> calculateYoYChange(Long collegeId, Integer previousYear, Integer currentYear) {
        log.info("Calculating YoY change for college: {} from {} to {}", collegeId, previousYear, currentYear);
        
        Optional<CutoffHistory> prevData = cutoffHistoryRepository.findByCollegeIdAndCutoffYear(collegeId, previousYear);
        Optional<CutoffHistory> currData = cutoffHistoryRepository.findByCollegeIdAndCutoffYear(collegeId, currentYear);
        
        Map<String, Object> result = new HashMap<>();
        result.put("collegeId", collegeId);
        result.put("previousYear", previousYear);
        result.put("currentYear", currentYear);
        
        if (prevData.isPresent() && currData.isPresent()) {
            double prevCutoff = prevData.get().getCutoffScore();
            double currCutoff = currData.get().getCutoffScore();
            double change = currCutoff - prevCutoff;
            double percentageChange = (change / prevCutoff) * 100;
            
            result.put("previousYearCutoff", prevCutoff);
            result.put("currentYearCutoff", currCutoff);
            result.put("absoluteChange", Math.round(change * 100.0) / 100.0);
            result.put("percentageChange", Math.round(percentageChange * 100.0) / 100.0);
            result.put("trend", percentageChange > 0 ? "INCREASING" : "DECREASING");
        } else {
            result.put("error", "Data not available for one or both years");
        }
        
        return result;
    }
}
