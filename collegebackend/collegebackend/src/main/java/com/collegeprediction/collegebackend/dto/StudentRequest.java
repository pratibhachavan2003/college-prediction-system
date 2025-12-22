package com.collegeprediction.collegebackend.dto;

public class StudentRequest {
  private String name;
  private String email;
  private String phoneNumber;
  private Double tenthPercentage;
  private Double twelfthPercentage;
  private Double jeeScore; // 0-360

  // Extended prediction inputs (optional)
  private String examType; // JEE, MHT-CET, NEET, BOARD
  private String category; // GENERAL, OBC, SC, ST
  private String state;
  private String branch; // CSE, Mechanical, Civil, etc.
  private String preferredBranch; // CSE, IT, etc.
  private String preferredCollegeType; // Government, Private, Deemed
  private String gender; // optional
  private String location; // preferred city/state
  private String yearSession; // e.g., 2025
  private Double mhtCetPercentile; // 0-100
  private Double twelfthPCM; // 0-100
  private Double neetScore; // 0-720

  public StudentRequest() {
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  public Double getTenthPercentage() {
    return tenthPercentage;
  }

  public void setTenthPercentage(Double tenthPercentage) {
    this.tenthPercentage = tenthPercentage;
  }

  public Double getTwelfthPercentage() {
    return twelfthPercentage;
  }

  public void setTwelfthPercentage(Double twelfthPercentage) {
    this.twelfthPercentage = twelfthPercentage;
  }

  public Double getJeeScore() {
    return jeeScore;
  }

  public void setJeeScore(Double jeeScore) {
    this.jeeScore = jeeScore;
  }

  public String getExamType() {
    return examType;
  }

  public void setExamType(String examType) {
    this.examType = examType;
  }

  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public String getState() {
    return state;
  }

  public void setState(String state) {
    this.state = state;
  }

  public String getPreferredBranch() {
    return preferredBranch;
  }

  public void setPreferredBranch(String preferredBranch) {
    this.preferredBranch = preferredBranch;
  }

  public String getBranch() {
    return branch;
  }

  public void setBranch(String branch) {
    this.branch = branch;
  }

  public String getPreferredCollegeType() {
    return preferredCollegeType;
  }

  public void setPreferredCollegeType(String preferredCollegeType) {
    this.preferredCollegeType = preferredCollegeType;
  }

  public String getGender() {
    return gender;
  }

  public void setGender(String gender) {
    this.gender = gender;
  }

  public String getLocation() {
    return location;
  }

  public void setLocation(String location) {
    this.location = location;
  }

  public String getYearSession() {
    return yearSession;
  }

  public void setYearSession(String yearSession) {
    this.yearSession = yearSession;
  }

  public Double getMhtCetPercentile() {
    return mhtCetPercentile;
  }

  public void setMhtCetPercentile(Double mhtCetPercentile) {
    this.mhtCetPercentile = mhtCetPercentile;
  }

  public Double getTwelfthPCM() {
    return twelfthPCM;
  }

  public void setTwelfthPCM(Double twelfthPCM) {
    this.twelfthPCM = twelfthPCM;
  }

  public Double getNeetScore() {
    return neetScore;
  }

  public void setNeetScore(Double neetScore) {
    this.neetScore = neetScore;
  }
}
