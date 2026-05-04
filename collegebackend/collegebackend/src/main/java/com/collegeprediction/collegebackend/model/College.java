package com.collegeprediction.collegebackend.model;

import jakarta.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "colleges")
public class College {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String name;

  private String city;

  // Minimum score required / cutoff
  private double cutoffScore;

  // Branch offered
  private String branch;

  // College type: Government, Private, Deemed
  private String collegeType;

  // Ranking score for sorting
  private double rankingScore;

  // Year of cutoff data
  private int cutoffYear;

  // CAP round (1, 2, 3, etc.)
  private int capRound;

  public College() {
  }

  public College(String name, String city, double cutoffScore) {
    this.name = name;
    this.city = city;
    this.cutoffScore = cutoffScore;
  }

  public College(String name, String city, double cutoffScore, String branch, String collegeType, double rankingScore, int cutoffYear, int capRound) {
    this.name = name;
    this.city = city;
    this.cutoffScore = cutoffScore;
    this.branch = branch;
    this.collegeType = collegeType;
    this.rankingScore = rankingScore;
    this.cutoffYear = cutoffYear;
    this.capRound = capRound;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public double getCutoffScore() {
    return cutoffScore;
  }

  public void setCutoffScore(double cutoffScore) {
    this.cutoffScore = cutoffScore;
  }

  public String getBranch() {
    return branch;
  }

  public void setBranch(String branch) {
    this.branch = branch;
  }

  public String getCollegeType() {
    return collegeType;
  }

  public void setCollegeType(String collegeType) {
    this.collegeType = collegeType;
  }

  public double getRankingScore() {
    return rankingScore;
  }

  public void setRankingScore(double rankingScore) {
    this.rankingScore = rankingScore;
  }

  public int getCutoffYear() {
    return cutoffYear;
  }

  public void setCutoffYear(int cutoffYear) {
    this.cutoffYear = cutoffYear;
  }

  public int getCapRound() {
    return capRound;
  }

  public void setCapRound(int capRound) {
    this.capRound = capRound;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (!(o instanceof College))
      return false;
    College college = (College) o;
    return Objects.equals(id, college.id);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }
}
