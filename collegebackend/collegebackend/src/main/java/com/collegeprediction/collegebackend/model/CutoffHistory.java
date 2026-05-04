package com.collegeprediction.collegebackend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "cutoff_history", indexes = {
    @Index(name = "idx_college_year", columnList = "college_id,cutoff_year"),
    @Index(name = "idx_cutoff_year", columnList = "cutoff_year")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CutoffHistory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "college_id", nullable = false)
    private College college;
    
    // Historical cutoff score for this college in a specific year
    @Column(nullable = false)
    private Double cutoffScore;
    
    // Year this cutoff data is from (e.g., 2021, 2022, etc.)
    @Column(nullable = false)
    private Integer cutoffYear;
    
    // Branch/course for which this cutoff applies
    @Column(nullable = false)
    private String branch;
    
    // Category (General, OBC, SC, ST, etc.)
    private String category;
    
    // Seat type (Open, Reserved, etc.)
    private String seatType;
    
    // Number of seats available
    private Integer seatsAvailable;
    
    // Closing rank at which seats were filled
    private Integer closingRank;
    
    // Round number (1, 2, 3, etc.)
    private Integer roundNumber;
    
    // Data entry timestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    // Last update timestamp
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
