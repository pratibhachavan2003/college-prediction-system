package com.collegeprediction.collegebackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PredictionResponse {
    private Long collegeId;
    private String collegeName;
    private String city;
    private String branch;
    private Double predictedCutoff;
    private Double confidence;
    private String collegeType;
    private Double rankingScore;
    private String matchReason;
    private Double matchPercentage;
}
