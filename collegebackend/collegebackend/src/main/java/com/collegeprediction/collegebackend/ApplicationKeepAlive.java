package com.collegeprediction.collegebackend;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class ApplicationKeepAlive {

    @EventListener(ApplicationReadyEvent.class)
    public void keepAlive() {
        // Application is ready and running
        log.info("College Prediction System backend is ready and running on port 8090");
        // Spring Boot will keep the application running with Tomcat
    }
}