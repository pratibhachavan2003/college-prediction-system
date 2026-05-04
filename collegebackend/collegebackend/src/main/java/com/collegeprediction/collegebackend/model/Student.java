package com.collegeprediction.collegebackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "students")
public class Student {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;
  private String email;
  private String phoneNumber;
  private String password;
  private double tenthPercentage;
  private double twelfthPercentage;
  private double jeeScore;
  private String role; // "student" or "admin"

  public Student() {
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

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public double getTenthPercentage() {
    return tenthPercentage;
  }

  public void setTenthPercentage(double tenthPercentage) {
    this.tenthPercentage = tenthPercentage;
  }

  public double getTwelfthPercentage() {
    return twelfthPercentage;
  }

  public void setTwelfthPercentage(double twelfthPercentage) {
    this.twelfthPercentage = twelfthPercentage;
  }

  public double getJeeScore() {
    return jeeScore;
  }

  public void setJeeScore(double jeeScore) {
    this.jeeScore = jeeScore;
  }

  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
  }
}
