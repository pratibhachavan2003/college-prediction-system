package com.collegeprediction.collegebackend.repository;

import com.collegeprediction.collegebackend.model.College;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CollegeRepository extends JpaRepository<College, Long> {

  List<College> findByCityContainingIgnoreCase(String city);

}
