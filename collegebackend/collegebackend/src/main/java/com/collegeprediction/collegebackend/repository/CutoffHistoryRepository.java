package com.collegeprediction.collegebackend.repository;

import com.collegeprediction.collegebackend.model.CutoffHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CutoffHistoryRepository extends JpaRepository<CutoffHistory, Long> {
    
    // Get cutoff history for a specific college
    List<CutoffHistory> findByCollegeId(Long collegeId);
    
    // Get cutoff history for a specific college and year
    Optional<CutoffHistory> findByCollegeIdAndCutoffYear(Long collegeId, Integer year);
    
    // Get cutoff history for a specific branch
    List<CutoffHistory> findByBranch(String branch);
    
    // Get cutoff history for specific year range
    List<CutoffHistory> findByCutoffYearBetween(Integer startYear, Integer endYear);
    
    // Get all unique years available in database
    @Query("SELECT DISTINCT ch.cutoffYear FROM CutoffHistory ch ORDER BY ch.cutoffYear DESC")
    List<Integer> findAllDistinctYears();
    
    // Get average cutoff for a college across years
    @Query("SELECT AVG(ch.cutoffScore) FROM CutoffHistory ch WHERE ch.college.id = :collegeId")
    Optional<Double> findAverageCutoffByCollege(@Param("collegeId") Long collegeId);
    
    // Get cutoff history with filtering
    @Query("SELECT ch FROM CutoffHistory ch WHERE ch.college.id = :collegeId AND ch.cutoffYear >= :startYear AND ch.cutoffYear <= :endYear ORDER BY ch.cutoffYear DESC")
    List<CutoffHistory> findHistoricalData(@Param("collegeId") Long collegeId, @Param("startYear") Integer startYear, @Param("endYear") Integer endYear);
    
    // Get all records for training
    @Query("SELECT ch FROM CutoffHistory ch WHERE ch.cutoffYear >= :startYear ORDER BY ch.cutoffYear DESC")
    List<CutoffHistory> findTrainingData(@Param("startYear") Integer startYear);
    
    // Check if data exists for a college in a specific year
    @Query("SELECT COUNT(ch) > 0 FROM CutoffHistory ch WHERE ch.college.id = :collegeId AND ch.cutoffYear = :year")
    Boolean existsForCollegeAndYear(@Param("collegeId") Long collegeId, @Param("year") Integer year);

    // Get all distinct branches from cutoff history
    @Query("SELECT DISTINCT ch.branch FROM CutoffHistory ch WHERE ch.branch IS NOT NULL ORDER BY ch.branch")
    List<String> findAllDistinctBranches();

    // Get all distinct categories from cutoff history
    @Query("SELECT DISTINCT ch.category FROM CutoffHistory ch WHERE ch.category IS NOT NULL ORDER BY ch.category")
    List<String> findAllDistinctCategories();
}
