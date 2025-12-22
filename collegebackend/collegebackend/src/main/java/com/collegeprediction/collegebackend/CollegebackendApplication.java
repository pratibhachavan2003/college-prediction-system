package com.collegeprediction.collegebackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.collegeprediction.collegebackend.model")
@EnableJpaRepositories("com.collegeprediction.collegebackend.repository")
public class CollegebackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(CollegebackendApplication.class, args);
	}

}
