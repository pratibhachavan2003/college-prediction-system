package com.collegeprediction.collegebackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CutoffAnalysisDTO {
    private Integer year;
    private Integer totalRecords;
    private Integer totalColleges;
    private Double averageCutoff;
    private Double highestCutoff;
    private Double lowestCutoff;
    private Map<String, Double> branchWiseData;
}
