package com.collegeprediction.collegebackend.service;

import com.collegeprediction.collegebackend.dto.StudentRequest;
import com.collegeprediction.collegebackend.model.College;
import com.collegeprediction.collegebackend.repository.CollegeRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
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
   * - Filter colleges by preferred location/city if specified
   * - Calculate composite score based on MHT-CET percentile and 12th PCM
   * - Recommend colleges where student.score >= cutoffScore
   * - Sort by ranking and closeness to student's score
   */
  public List<College> predict(StudentRequest request) {
    List<College> candidates = collegeRepository.findAll();
    System.out.println("Found " + candidates.size() + " colleges in database");

    // Filter by preferred branch if specified
    if (request.getPreferredBranch() != null && !request.getPreferredBranch().isEmpty()) {
      List<College> beforeBranchFilter = candidates;
      candidates = candidates.stream()
          .filter(c -> branchMatches(request.getPreferredBranch(), c.getBranch()))
          .collect(Collectors.toList());
      if (candidates.isEmpty()) {
        System.out.println("Branch filter produced no matches for '" + request.getPreferredBranch() + "'. Skipping branch filter.");
        candidates = beforeBranchFilter;
      } else {
        System.out.println("After branch filter: " + candidates.size() + " colleges");
      }
    }

    // Filter by preferred college type if specified and not "All"
    if (request.getPreferredCollegeType() != null && !request.getPreferredCollegeType().isEmpty()
            && !request.getPreferredCollegeType().equalsIgnoreCase("All")) {
      candidates = candidates.stream()
          .filter(c -> request.getPreferredCollegeType().equalsIgnoreCase(c.getCollegeType()))
          .collect(Collectors.toList());
      System.out.println("After college type filter: " + candidates.size() + " colleges");
    } else {
      // skip filter when user wants all types or didn't specify
      System.out.println("Skipping college type filter (All or unspecified)");
    }

    // Filter by year session if specified
    String requestedYear = request.getYearSession() == null ? "" : request.getYearSession().trim();
    if (!requestedYear.isEmpty()) {
      try {
        int year = Integer.parseInt(requestedYear);
        List<College> beforeYearFilter = candidates;
        candidates = candidates.stream()
            .filter(c -> c.getCutoffYear() == year)
            .collect(Collectors.toList());
        if (candidates.isEmpty()) {
          System.out.println("Year session filter produced no matches for '" + requestedYear + "'. Skipping year filter.");
          candidates = beforeYearFilter;
        } else {
          System.out.println("After year session filter: " + candidates.size() + " colleges");
        }
      } catch (NumberFormatException e) {
        System.out.println("Skipping year session filter because year is invalid: " + requestedYear);
      }
    } else {
      System.out.println("Skipping year session filter (unspecified)");
    }

    // Filter by CAP round if specified and not "All Rounds"
    String requestedCapRound = request.getCapRound() == null ? "" : request.getCapRound().trim();
    if (!requestedCapRound.isEmpty() && !requestedCapRound.equalsIgnoreCase("All Rounds") && !requestedCapRound.equalsIgnoreCase("All")) {
      int capRoundNumber = parseCapRound(requestedCapRound);
      if (capRoundNumber > 0) {
        boolean hasRoundData = candidates.stream().anyMatch(c -> c.getCapRound() > 0);
        if (!hasRoundData) {
          System.out.println("CAP round data missing for candidates; skipping round filter.");
        } else {
          List<College> beforeCapFilter = candidates;
          candidates = candidates.stream()
              .filter(c -> c.getCapRound() == capRoundNumber)
              .collect(Collectors.toList());
          if (candidates.isEmpty() && capRoundNumber == 1) {
            // Some datasets may store 0 as default capRound for Round 1 entries
            candidates = beforeCapFilter.stream()
                .filter(c -> c.getCapRound() == 0)
                .collect(Collectors.toList());
            System.out.println("Round 1 filter found no explicit round data; including capRound=0 candidates: " + candidates.size() + " colleges");
          } else {
            System.out.println("After CAP round filter: " + candidates.size() + " colleges");
          }
        }
      } else {
        System.out.println("Skipping CAP round filter because round is invalid: " + requestedCapRound);
      }
    } else {
      System.out.println("Skipping CAP round filter (All or unspecified)");
    }

    // Filter by location if specified and not "All"
    String requestedLocation = request.getLocation() == null ? "" : request.getLocation().trim();
    if (!requestedLocation.isEmpty() && !requestedLocation.equalsIgnoreCase("All")) {
      List<College> beforeLocationFilter = candidates;
      candidates = candidates.stream()
          .filter(c -> {
            String city = c.getCity() == null ? "" : c.getCity().trim();
            return city.equalsIgnoreCase(requestedLocation)
                || city.toLowerCase().contains(requestedLocation.toLowerCase());
          })
          .collect(Collectors.toList());
      if (candidates.isEmpty()) {
        System.out.println("Location filter produced no matches for '" + requestedLocation + "'. Skipping location filter.");
        candidates = beforeLocationFilter;
      } else {
        System.out.println("After location filter: " + candidates.size() + " colleges");
      }
    } else {
      System.out.println("Skipping location filter (All or unspecified)");
    }

    // Calculate student composite score
    double studentScore = calculateStudentScore(request);
    System.out.println("Student composite score: " + studentScore);

    // Prefer colleges where cutoff is within reach, but don't return an empty list when score is low
    List<College> scoreMatched = candidates.stream()
        .filter(c -> c.getCutoffScore() <= studentScore)
        .distinct()
        .collect(Collectors.toList());

    if (!scoreMatched.isEmpty()) {
      candidates = scoreMatched;
      System.out.println("After score filter and deduplication: " + candidates.size() + " colleges");
    } else {
      // Fallback: return best matches even if all cutoffs are above the student's score
      candidates = candidates.stream()
          .distinct()
          .collect(Collectors.toList());
      System.out.println("No colleges met the cutoff threshold; returning " + candidates.size() + " best match candidates instead");
    }

    // Sort by ranking score descending, then by closeness to student score
    candidates.sort(Comparator
        .comparing(College::getRankingScore, Comparator.reverseOrder())
        .thenComparing(c -> Math.abs(c.getCutoffScore() - studentScore)));

    candidates = dedupeColleges(candidates);
    return candidates;
  }

  private List<College> dedupeColleges(List<College> colleges) {
    Map<String, College> uniqueMap = new LinkedHashMap<>();
    for (College college : colleges) {
      String key = normalizeText(college.getName()) + "|" + normalizeBranch(college.getBranch()) + "|" + normalizeText(college.getCity());
      uniqueMap.putIfAbsent(key, college);
    }
    return new ArrayList<>(uniqueMap.values());
  }

  private String normalizeBranch(String branch) {
    if (branch == null) {
      return "";
    }
    String normalized = normalizeText(branch);
    if (normalized.contains("computer science") || normalized.contains("cse")) {
      return "cse";
    }
    if (normalized.contains("mechanical")) {
      return "mechanical";
    }
    if (normalized.contains("civil")) {
      return "civil";
    }
    if (normalized.contains("electrical")) {
      return "electrical";
    }
    if (normalized.contains("chemical")) {
      return "chemical";
    }
    return normalized;
  }

  private double calculateStudentScore(StudentRequest request) {
    double score = 0.0;
    int count = 0;

    if (request.getMhtCetPercentile() != null) {
      score += request.getMhtCetPercentile();
      count++;
    }
    if (request.getTwelfthPCM() != null) {
      score += request.getTwelfthPCM();
      count++;
    }
    if (request.getJeeScore() != null && request.getJeeScore() > 0) {
      // Convert JEE score to percentile approx
      double jeePercentile = (request.getJeeScore() / 360.0) * 100.0;
      score += jeePercentile;
      count++;
    }
    if (request.getTwelfthPercentage() != null) {
      score += request.getTwelfthPercentage();
      count++;
    }

    return count > 0 ? score / count : 0.0;
  }

  private int parseCapRound(String capRoundLabel) {
    if (capRoundLabel == null) {
      return -1;
    }
    try {
      String cleaned = capRoundLabel.toLowerCase().replace("round", "").trim();
      return Integer.parseInt(cleaned);
    } catch (NumberFormatException e) {
      return -1;
    }
  }

  private boolean branchMatches(String requestedBranch, String collegeBranch) {
    if (requestedBranch == null || collegeBranch == null) {
      return false;
    }
    String normalizedRequested = normalizeText(requestedBranch);
    String normalizedCollege = normalizeText(collegeBranch);
    if (normalizedRequested.equals(normalizedCollege)) {
      return true;
    }
    if (normalizedRequested.contains(normalizedCollege) || normalizedCollege.contains(normalizedRequested)) {
      return true;
    }
    // Handle common branch synonyms like CSE and Computer Science
    if ((normalizedRequested.contains("cse") || normalizedRequested.contains("computer science"))
            && (normalizedCollege.contains("cse") || normalizedCollege.contains("computer science"))) {
      return true;
    }
    return false;
  }

  private String normalizeText(String text) {
    return text == null ? "" : text.toLowerCase().replaceAll("[^a-z0-9]", " ").trim().replaceAll("\\s+", " ");
  }
}
