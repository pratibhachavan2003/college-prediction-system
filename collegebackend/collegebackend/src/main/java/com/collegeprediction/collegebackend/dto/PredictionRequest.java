package com.collegeprediction.collegebackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PredictionRequest {
    private Double mhtCetScore;
    private Double jeeScore;
    private Double percentile;
    private Integer rank;
    private String category;
    private String stream;
    private Integer year;
}
