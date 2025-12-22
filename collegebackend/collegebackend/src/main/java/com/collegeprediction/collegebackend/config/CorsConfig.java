package com.collegeprediction.collegebackend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

  @Override
  public void addCorsMappings(@NonNull CorsRegistry registry) {
    registry.addMapping("/api/**")
        // allow local dev frontends on common ports (3000/3001/3003) and loopback
        .allowedOrigins("http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3001",
            "http://127.0.0.1:3001", "http://localhost:3003", "http://127.0.0.1:3003")
        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
        .allowedHeaders("*")
        .allowCredentials(true);
  }
}