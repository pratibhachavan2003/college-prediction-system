package com.collegeprediction.collegebackend.repository;

import com.collegeprediction.collegebackend.model.College;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
// import org.springframework.data.domain.Page;
// import org.springframework.data.domain.Pageable;

import java.util.List;

@Repository
public interface CollegeRepository extends JpaRepository<College, Long> {

   List<College> findByCityContainingIgnoreCase(String city);
   
   // Get all distinct cities where colleges are located
   @Query("SELECT DISTINCT c.city FROM College c WHERE c.city IS NOT NULL ORDER BY c.city")
   List<String> findAllDistinctCities();
   
   // Get all distinct college types
   @Query("SELECT DISTINCT c.collegeType FROM College c WHERE c.collegeType IS NOT NULL ORDER BY c.collegeType")
   List<String> findAllDistinctCollegeTypes();
   
   // Get all distinct branches
   @Query("SELECT DISTINCT c.branch FROM College c WHERE c.branch IS NOT NULL ORDER BY c.branch")
   List<String> findAllDistinctBranches();
  // Page<College> findByCityContainingIgnoreCase(String city, Pageable pageable);
}
