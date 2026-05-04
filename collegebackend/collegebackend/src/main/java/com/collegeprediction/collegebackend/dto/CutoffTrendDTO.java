package com.collegeprediction.collegebackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CutoffTrendDTO {
    private Long collegeId;
    private Double averageCutoff;
    private Double maxCutoff;
    private Double minCutoff;
    private Integer totalRecords;
    private List<Map<String, Object>> yearlyData;
}
