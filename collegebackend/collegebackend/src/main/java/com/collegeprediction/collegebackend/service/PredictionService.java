package com.collegeprediction.collegebackend.service;

import com.collegeprediction.collegebackend.dto.StudentRequest;
import com.collegeprediction.collegebackend.model.College;
import com.collegeprediction.collegebackend.repository.CollegeRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PredictionService {

  private final CollegeRepository collegeRepository;

  public PredictionService(CollegeRepository collegeRepository) {
    this.collegeRepository = collegeRepository;
  }

  /**
   * Enhanced prediction algorithm for MHT-CET B.Tech:
   * - Filter colleges by branch if specified
   * - Calculate composite score based on MHT-CET percentile and 12th PCM
   * - Recommend colleges where student.score >= cutoffScore
   * - Sort by ranking and closeness to student's score
   */
  public List<College> predict(StudentRequest request) {
    List<College> candidates = collegeRepository.findAll();

    // Calculate a composite score depending on exam type (all scaled to 0-100)
    double compositeScore = 0.0;
    String exam = request.getExamType() == null ? "JEE" : request.getExamType().toUpperCase();
    switch (exam) {
      case "MHT-CET":
      case "MHTCET":
      case "MH-CET":
        double cet = nullSafe(request.getMhtCetPercentile());
        double pcm = nullSafe(request.getTwelfthPCM());
        compositeScore = (cet * 0.7) + (pcm * 0.3);
        break;
      case "NEET":
        double neet = (nullSafe(request.getNeetScore()) / 720.0) * 100.0;
        compositeScore = neet;
        break;
      case "BOARD":
        compositeScore = (nullSafe(request.getTwelfthPercentage()) * 0.7)
            + (nullSafe(request.getTenthPercentage()) * 0.3);
        break;
      case "JEE":
      default:
        double normalizedJee = (nullSafe(request.getJeeScore()) / 360.0) * 100.0;
        compositeScore = (normalizedJee * 0.5)
            + (nullSafe(request.getTwelfthPercentage()) * 0.3)
            + (nullSafe(request.getTenthPercentage()) * 0.2);
        break;
    }

    // Small category relaxation bonus (very simplified)
    String category = request.getCategory() == null ? "GENERAL" : request.getCategory().toUpperCase();
    if ("OBC".equals(category))
      compositeScore += 1.0;
    if ("SC".equals(category))
      compositeScore += 2.0;
    if ("ST".equals(category))
      compositeScore += 3.0;

    final double finalScore = compositeScore;
    String branch = request.getPreferredBranch() == null ? "" : request.getPreferredBranch().toUpperCase();

    // Filter by branch if specified, filter by score (student score >= college
    // cutoff)
    // Then rank colleges by closeness to student's composite score
    return candidates.stream()
        .filter(c -> {
          // Filter by branch if specified
          if (branch != null && !branch.isEmpty()) {
            String collegeBranch = c.getBranch() == null ? "" : c.getBranch().toUpperCase();
            if (!collegeBranch.contains(branch)) {
              return false;
            }
          }
          // Filter by score - student score should be >= college cutoff (allowing small
          // margin)
          return finalScore >= (nullSafe(c.getCutoffScore()) - 5.0);
        })
        .sorted(Comparator.comparingDouble(College::getRankingScore).reversed()
            .thenComparingDouble((College c) -> Math.abs(nullSafe(c.getCutoffScore()) - finalScore)))
        .limit(10)
        .collect(Collectors.toList());
  }

  private static double nullSafe(Double value) {
    return value == null ? 0.0 : value;
  }
}
