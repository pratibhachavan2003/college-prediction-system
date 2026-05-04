package com.collegeprediction.collegebackend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "students")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column
    private String phoneNumber;

    @Column(nullable = false)
    private String password;

    @Column
    private Double tenthPercentage;

    @Column
    private Double twelfthPercentage;

    @Column
    private Double jeeScore;

    @Column(nullable = false)
    private String role; // admin, student

    @Column(columnDefinition = "BOOLEAN DEFAULT true")
    private boolean active = true;

    public User(String email, String password, String name, String role) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.role = role;
        this.active = true;
    }

    // Constructor for registration
    public User(String name, String email, String phoneNumber, String password,
                Double tenthPercentage, Double twelfthPercentage, Double jeeScore, String role) {
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.tenthPercentage = tenthPercentage != null ? tenthPercentage : 0;
        this.twelfthPercentage = twelfthPercentage != null ? twelfthPercentage : 0;
        this.jeeScore = jeeScore != null ? jeeScore : 0;
        this.role = role;
        this.active = true;
    }
}
