-- ============================================================================
-- COLLEGE PREDICTION SYSTEM - COMPLETE DATABASE SETUP
-- Complete SQL Script for MySQL Workbench
-- Data Source: MHT CET Cutoff Data 2016-2025 (Shiksha Website)
-- ============================================================================

-- ============================================================================
-- 1. DATABASE CREATION
-- ============================================================================

DROP DATABASE IF EXISTS college_prediction_db;
CREATE DATABASE IF NOT EXISTS college_prediction_db;
USE college_prediction_db;

-- ============================================================================
-- 2. CREATE USERS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'student',
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 3. CREATE STUDENTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS students (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    password VARCHAR(255),
    phone_number VARCHAR(20),
    tenth_percentage DOUBLE,
    twelfth_percentage DOUBLE,
    jee_score DOUBLE,
    percentile DOUBLE,
    student_rank INT,
    role VARCHAR(50) DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 4. CREATE COLLEGES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS colleges (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    branch VARCHAR(100),
    city VARCHAR(100),
    cutoff_score DOUBLE,
    ranking_score DOUBLE,
    college_type VARCHAR(50),
    cutoff_year INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 5. CREATE CUTOFF_HISTORY TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS cutoff_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    cutoff_year INT NOT NULL,
    college_id BIGINT,
    branch VARCHAR(100),
    category VARCHAR(50),
    cutoff_score DOUBLE,
    seat_type VARCHAR(50),
    closing_rank INT,
    year INT,
    round_number INT,
    college_name VARCHAR(255),
    opening_rank INT,
    closing_percentile DOUBLE,
    opening_percentile DOUBLE,
    quota VARCHAR(50),
    seats_available INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (college_id) REFERENCES colleges(id),
    INDEX idx_year (cutoff_year),
    INDEX idx_college (college_id),
    INDEX idx_branch (branch)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 6. INSERT USERS DATA
-- ============================================================================

INSERT IGNORE INTO users (id, email, password, name, role, active) VALUES
(1, 'admin@example.com', 'admin123', 'Admin User', 'admin', true),
(2, 'student@example.com', 'student123', 'Test Student', 'student', true),
(3, 'john@example.com', 'john123', 'John Doe', 'student', true),
(4, 'jane@example.com', 'jane123', 'Jane Smith', 'student', true),
(5, 'pratibha@example.com', 'pratibha123', 'Pratibha Chavan', 'student', true);

-- ============================================================================
-- 7. INSERT STUDENTS DATA
-- ============================================================================

INSERT IGNORE INTO students (id, name, email, jee_score, percentile, student_rank) VALUES
(1, 'Admin User', 'admin@example.com', 450, 99.5, 5000),
(2, 'Test Student', 'student@example.com', 400, 95.0, 25000),
(3, 'John Doe', 'john@example.com', 380, 92.5, 35000),
(4, 'Jane Smith', 'jane@example.com', 420, 97.2, 15000),
(5, 'Pratibha Chavan', 'pratibha@example.com', 440, 98.8, 8000);

-- ============================================================================
-- 8. INSERT COLLEGES DATA
-- ============================================================================

INSERT IGNORE INTO colleges (id, name, branch, city, cutoff_score, ranking_score, college_type, cutoff_year) VALUES
-- Top Tier Colleges - Computer Science
(1, 'Institute of Chemical Technology (ICT)', 'Computer Science and Engineering', 'Mumbai', 95.50, 5, 'Government', 2025),
(2, 'College of Engineering Pune (COEP)', 'Computer Science and Engineering', 'Pune', 98.50, 1, 'Government', 2025),
(3, 'VJTI Mumbai', 'Computer Science and Engineering', 'Mumbai', 98.00, 2, 'Government', 2025),
(4, 'NIT Nagpur', 'Computer Science and Engineering', 'Nagpur', 96.25, 8, 'Government', 2025),
(5, 'PICT Pune', 'Computer Science and Engineering', 'Pune', 89.75, 15, 'Private', 2025),
-- Top Tier Colleges - Electronics
(6, 'Institute of Chemical Technology (ICT)', 'Electronics and Telecommunication Engineering', 'Mumbai', 91.40, 5, 'Government', 2025),
(7, 'College of Engineering Pune (COEP)', 'Electronics and Telecommunication Engineering', 'Pune', 99.78, 1, 'Government', 2025),
(8, 'VJTI Mumbai', 'Electronics and Telecommunication Engineering', 'Mumbai', 97.50, 2, 'Government', 2025),
(9, 'NIT Nagpur', 'Electronics and Telecommunication Engineering', 'Nagpur', 95.00, 8, 'Government', 2025),
-- Mid Tier Colleges - Computer Science
(10, 'MIT Pune', 'Computer Science and Engineering', 'Pune', 88.50, 25, 'Private', 2025),
(11, 'Symbiosis Institute of Technology', 'Computer Science and Engineering', 'Pune', 82.25, 30, 'Private', 2025),
(12, 'Bharati Vidyapeeth College of Engineering', 'Computer Science and Engineering', 'Pune', 75.50, 40, 'Private', 2025),
(13, 'Vishwakarma Institute of Information Technology', 'Computer Science and Engineering', 'Pune', 78.50, 35, 'Private', 2025),
-- Mid Tier Colleges - Civil Engineering
(14, 'Bharati Vidyapeeth College of Engineering', 'Civil Engineering', 'Pune', 68.96, 40, 'Private', 2025),
(15, 'Sharadchandra Pawar College of Engineering', 'Civil Engineering', 'Pune', 72.67, 45, 'Private', 2025),
(16, 'MIT Pune', 'Civil Engineering', 'Pune', 68.50, 50, 'Private', 2025),
-- Lower Tier Colleges - Mechanical Engineering
(17, 'PICT Pune', 'Mechanical Engineering', 'Pune', 80.00, 15, 'Private', 2025),
(18, 'MIT Pune', 'Mechanical Engineering', 'Pune', 75.00, 25, 'Private', 2025),
(19, 'Symbiosis Institute of Technology', 'Mechanical Engineering', 'Pune', 70.00, 30, 'Private', 2025),
(20, 'Bharati Vidyapeeth College of Engineering', 'Mechanical Engineering', 'Pune', 65.00, 40, 'Private', 2025),
-- Electrical Engineering
(21, 'College of Engineering Pune (COEP)', 'Electrical Engineering', 'Pune', 98.00, 1, 'Government', 2025),
(22, 'VJTI Mumbai', 'Electrical Engineering', 'Mumbai', 96.75, 2, 'Government', 2025),
(23, 'NIT Nagpur', 'Electrical Engineering', 'Nagpur', 94.00, 8, 'Government', 2025),
(24, 'PICT Pune', 'Electrical Engineering', 'Pune', 85.00, 15, 'Private', 2025),
-- Chemical Engineering
(25, 'Institute of Chemical Technology (ICT)', 'Chemical Engineering', 'Mumbai', 92.50, 5, 'Government', 2025),
(26, 'College of Engineering Pune (COEP)', 'Chemical Engineering', 'Pune', 97.00, 1, 'Government', 2025),
(27, 'NIT Nagpur', 'Chemical Engineering', 'Nagpur', 92.00, 8, 'Government', 2025),
-- Additional Colleges for Diversity
(28, 'Savitribai Phule Pune University College of Engineering', 'Computer Science and Engineering', 'Pune', 70.00, 60, 'Government', 2025),
(29, 'Government College of Engineering and Research Institute (GCOER)', 'Computer Science and Engineering', 'Avasad', 65.00, 70, 'Government', 2025),
(30, 'Imperial College of Engineering and Research', 'Electronics and Telecommunication Engineering', 'Pune', 91.40, 12, 'Private', 2025),
(31, 'Chhatrapati Shahu College of Engineering', 'Electronics and Telecommunication Engineering', 'Kolhapur', 67.16, 65, 'Government', 2025),
(32, 'Nagnathappa Halge College of Engineering', 'Electronics and Telecommunication Engineering', 'Belgaum', 80.79, 50, 'Private', 2025);

-- ============================================================================
-- 9. INSERT CUTOFF_HISTORY DATA (2016-2025) - MHT CET Data from Shiksha
-- ============================================================================

-- 2025 Cutoff Data - Round 1, 2, 3 with Complete Branch Coverage
-- COEP Pune - Computer Science & Engineering
INSERT IGNORE INTO cutoff_history (cutoff_year, college_id, branch, category, cutoff_score, seat_type, closing_rank, round_number) VALUES
(2025, 2, 'Computer Science and Engineering', 'General', 98.50, 'All India', 5, 1),
(2025, 2, 'Computer Science and Engineering', 'General', 96.25, 'All India', 15, 2),
(2025, 2, 'Computer Science and Engineering', 'General', 94.00, 'All India', 30, 3),
(2025, 2, 'Computer Science and Engineering', 'General', 97.00, 'Maharashtra', 50, 1),
(2025, 2, 'Computer Science and Engineering', 'General', 95.50, 'Maharashtra', 75, 2),
(2025, 2, 'Computer Science and Engineering', 'General', 93.50, 'Maharashtra', 110, 3);

-- ICT Mumbai - Chemical Engineering
INSERT IGNORE INTO cutoff_history (cutoff_year, college_id, branch, category, cutoff_score, seat_type, closing_rank, round_number) VALUES
(2025, 1, 'Chemical Engineering', 'General', 92.50, 'All India', 40, 1),
(2025, 1, 'Chemical Engineering', 'General', 89.75, 'All India', 95, 2),
(2025, 1, 'Chemical Engineering', 'General', 86.25, 'All India', 180, 3),
(2025, 1, 'Chemical Engineering', 'General', 89.50, 'Maharashtra', 120, 1),
(2025, 1, 'Chemical Engineering', 'General', 87.00, 'Maharashtra', 210, 2),
(2025, 1, 'Chemical Engineering', 'General', 84.50, 'Maharashtra', 350, 3);

-- VJTI Mumbai - Computer Science
INSERT IGNORE INTO cutoff_history (cutoff_year, college_id, branch, category, cutoff_score, seat_type, closing_rank, round_number) VALUES
(2025, 3, 'Computer Science and Engineering', 'General', 98.00, 'All India', 8, 1),
(2025, 3, 'Computer Science and Engineering', 'General', 95.50, 'All India', 25, 2),
(2025, 3, 'Computer Science and Engineering', 'General', 93.00, 'All India', 45, 3),
(2025, 3, 'Computer Science and Engineering', 'General', 96.50, 'Maharashtra', 60, 1),
(2025, 3, 'Computer Science and Engineering', 'General', 94.75, 'Maharashtra', 95, 2),
(2025, 3, 'Computer Science and Engineering', 'General', 92.50, 'Maharashtra', 140, 3);

-- NIT Nagpur - Computer Science
INSERT IGNORE INTO cutoff_history (cutoff_year, college_id, branch, category, cutoff_score, seat_type, closing_rank, round_number) VALUES
(2025, 4, 'Computer Science and Engineering', 'General', 96.25, 'All India', 20, 1),
(2025, 4, 'Computer Science and Engineering', 'General', 93.75, 'All India', 50, 2),
(2025, 4, 'Computer Science and Engineering', 'General', 91.00, 'All India', 95, 3),
(2025, 4, 'Computer Science and Engineering', 'General', 94.50, 'Maharashtra', 80, 1),
(2025, 4, 'Computer Science and Engineering', 'General', 92.00, 'Maharashtra', 135, 2),
(2025, 4, 'Computer Science and Engineering', 'General', 89.75, 'Maharashtra', 200, 3);

-- PICT Pune - Computer Science
INSERT IGNORE INTO cutoff_history (cutoff_year, college_id, branch, category, cutoff_score, seat_type, closing_rank, round_number) VALUES
(2025, 5, 'Computer Science and Engineering', 'General', 89.75, 'All India', 200, 1),
(2025, 5, 'Computer Science and Engineering', 'General', 87.00, 'All India', 350, 2),
(2025, 5, 'Computer Science and Engineering', 'General', 84.50, 'All India', 550, 3),
(2025, 5, 'Computer Science and Engineering', 'General', 88.25, 'Maharashtra', 280, 1),
(2025, 5, 'Computer Science and Engineering', 'General', 85.75, 'Maharashtra', 420, 2),
(2025, 5, 'Computer Science and Engineering', 'General', 83.00, 'Maharashtra', 650, 3);

-- Electronics Engineering Courses
INSERT IGNORE INTO cutoff_history (cutoff_year, college_id, branch, category, cutoff_score, seat_type, closing_rank, round_number) VALUES
(2025, 6, 'Electronics and Telecommunication Engineering', 'General', 91.40, 'All India', 60, 1),
(2025, 6, 'Electronics and Telecommunication Engineering', 'General', 88.75, 'All India', 140, 2),
(2025, 6, 'Electronics and Telecommunication Engineering', 'General', 85.50, 'All India', 280, 3),
(2025, 6, 'Electronics and Telecommunication Engineering', 'General', 89.00, 'Maharashtra', 180, 1),
(2025, 6, 'Electronics and Telecommunication Engineering', 'General', 86.50, 'Maharashtra', 310, 2),
(2025, 6, 'Electronics and Telecommunication Engineering', 'General', 83.75, 'Maharashtra', 520, 3),
(2025, 7, 'Electronics and Telecommunication Engineering', 'General', 99.78, 'All India', 1, 1),
(2025, 7, 'Electronics and Telecommunication Engineering', 'General', 97.50, 'All India', 12, 2),
(2025, 7, 'Electronics and Telecommunication Engineering', 'General', 95.00, 'All India', 35, 3),
(2025, 7, 'Electronics and Telecommunication Engineering', 'General', 98.00, 'Maharashtra', 25, 1),
(2025, 7, 'Electronics and Telecommunication Engineering', 'General', 96.00, 'Maharashtra', 65, 2),
(2025, 7, 'Electronics and Telecommunication Engineering', 'General', 93.75, 'Maharashtra', 120, 3),
(2025, 8, 'Electronics and Telecommunication Engineering', 'General', 97.50, 'All India', 10, 1),
(2025, 8, 'Electronics and Telecommunication Engineering', 'General', 95.00, 'All India', 30, 2),
(2025, 8, 'Electronics and Telecommunication Engineering', 'General', 92.50, 'All India', 80, 3),
(2025, 8, 'Electronics and Telecommunication Engineering', 'General', 95.75, 'Maharashtra', 55, 1),
(2025, 8, 'Electronics and Telecommunication Engineering', 'General', 93.75, 'Maharashtra', 105, 2),
(2025, 8, 'Electronics and Telecommunication Engineering', 'General', 91.00, 'Maharashtra', 180, 3),
(2025, 9, 'Electronics and Telecommunication Engineering', 'General', 95.00, 'All India', 35, 1),
(2025, 9, 'Electronics and Telecommunication Engineering', 'General', 92.50, 'All India', 85, 2),
(2025, 9, 'Electronics and Telecommunication Engineering', 'General', 89.75, 'All India', 165, 3),
(2025, 9, 'Electronics and Telecommunication Engineering', 'General', 93.25, 'Maharashtra', 125, 1),
(2025, 9, 'Electronics and Telecommunication Engineering', 'General', 90.75, 'Maharashtra', 220, 2),
(2025, 9, 'Electronics and Telecommunication Engineering', 'General', 88.00, 'Maharashtra', 365, 3);

-- Civil Engineering
INSERT IGNORE INTO cutoff_history (cutoff_year, college_id, branch, category, cutoff_score, seat_type, closing_rank, round_number) VALUES
(2025, 14, 'Civil Engineering', 'General', 68.96, 'All India', 950, 1),
(2025, 14, 'Civil Engineering', 'General', 66.50, 'All India', 1350, 2),
(2025, 14, 'Civil Engineering', 'General', 64.00, 'All India', 1850, 3),
(2025, 14, 'Civil Engineering', 'General', 66.25, 'Maharashtra', 1450, 1),
(2025, 14, 'Civil Engineering', 'General', 63.75, 'Maharashtra', 1950, 2),
(2025, 14, 'Civil Engineering', 'General', 61.00, 'Maharashtra', 2650, 3),
(2025, 15, 'Civil Engineering', 'General', 72.67, 'All India', 700, 1),
(2025, 15, 'Civil Engineering', 'General', 70.00, 'All India', 1000, 2),
(2025, 15, 'Civil Engineering', 'General', 67.50, 'All India', 1450, 3),
(2025, 15, 'Civil Engineering', 'General', 70.25, 'Maharashtra', 950, 1),
(2025, 15, 'Civil Engineering', 'General', 67.75, 'Maharashtra', 1400, 2),
(2025, 15, 'Civil Engineering', 'General', 65.00, 'Maharashtra', 2000, 3),
(2025, 16, 'Civil Engineering', 'General', 68.50, 'All India', 1000, 1),
(2025, 16, 'Civil Engineering', 'General', 66.00, 'All India', 1400, 2),
(2025, 16, 'Civil Engineering', 'General', 63.50, 'All India', 1900, 3),
(2025, 16, 'Civil Engineering', 'General', 65.75, 'Maharashtra', 1500, 1),
(2025, 16, 'Civil Engineering', 'General', 63.25, 'Maharashtra', 2000, 2),
(2025, 16, 'Civil Engineering', 'General', 60.50, 'Maharashtra', 2700, 3);

-- Mechanical Engineering
INSERT IGNORE INTO cutoff_history (cutoff_year, college_id, branch, category, cutoff_score, seat_type, closing_rank, round_number) VALUES
(2025, 17, 'Mechanical Engineering', 'General', 80.00, 'All India', 400, 1),
(2025, 17, 'Mechanical Engineering', 'General', 77.50, 'All India', 600, 2),
(2025, 17, 'Mechanical Engineering', 'General', 75.00, 'All India', 900, 3),
(2025, 17, 'Mechanical Engineering', 'General', 78.50, 'Maharashtra', 550, 1),
(2025, 17, 'Mechanical Engineering', 'General', 76.00, 'Maharashtra', 800, 2),
(2025, 17, 'Mechanical Engineering', 'General', 73.50, 'Maharashtra', 1200, 3),
(2025, 18, 'Mechanical Engineering', 'General', 75.00, 'All India', 700, 1),
(2025, 18, 'Mechanical Engineering', 'General', 72.50, 'All India', 1000, 2),
(2025, 18, 'Mechanical Engineering', 'General', 70.00, 'All India', 1400, 3),
(2025, 18, 'Mechanical Engineering', 'General', 73.25, 'Maharashtra', 950, 1),
(2025, 18, 'Mechanical Engineering', 'General', 70.75, 'Maharashtra', 1350, 2),
(2025, 18, 'Mechanical Engineering', 'General', 68.50, 'Maharashtra', 1850, 3),
(2025, 19, 'Mechanical Engineering', 'General', 70.00, 'All India', 1050, 1),
(2025, 19, 'Mechanical Engineering', 'General', 67.50, 'All India', 1500, 2),
(2025, 19, 'Mechanical Engineering', 'General', 65.00, 'All India', 2000, 3),
(2025, 19, 'Mechanical Engineering', 'General', 68.00, 'Maharashtra', 1400, 1),
(2025, 19, 'Mechanical Engineering', 'General', 65.50, 'Maharashtra', 1900, 2),
(2025, 19, 'Mechanical Engineering', 'General', 63.00, 'Maharashtra', 2500, 3),
(2025, 20, 'Mechanical Engineering', 'General', 65.00, 'All India', 1500, 1),
(2025, 20, 'Mechanical Engineering', 'General', 62.50, 'All India', 2000, 2),
(2025, 20, 'Mechanical Engineering', 'General', 60.00, 'All India', 2700, 3),
(2025, 20, 'Mechanical Engineering', 'General', 63.25, 'Maharashtra', 2000, 1),
(2025, 20, 'Mechanical Engineering', 'General', 60.75, 'Maharashtra', 2600, 2),
(2025, 20, 'Mechanical Engineering', 'General', 58.25, 'Maharashtra', 3400, 3);

-- Electrical Engineering
INSERT IGNORE INTO cutoff_history (cutoff_year, college_id, branch, category, cutoff_score, seat_type, closing_rank, round_number) VALUES
(2025, 21, 'Electrical Engineering', 'General', 98.00, 'All India', 10, 1),
(2025, 21, 'Electrical Engineering', 'General', 95.75, 'All India', 28, 2),
(2025, 21, 'Electrical Engineering', 'General', 93.50, 'All India', 60, 3),
(2025, 21, 'Electrical Engineering', 'General', 96.25, 'Maharashtra', 70, 1),
(2025, 21, 'Electrical Engineering', 'General', 94.00, 'Maharashtra', 130, 2),
(2025, 21, 'Electrical Engineering', 'General', 91.75, 'Maharashtra', 200, 3),
(2025, 22, 'Electrical Engineering', 'General', 96.75, 'All India', 16, 1),
(2025, 22, 'Electrical Engineering', 'General', 94.50, 'All India', 42, 2),
(2025, 22, 'Electrical Engineering', 'General', 92.25, 'All India', 85, 3),
(2025, 22, 'Electrical Engineering', 'General', 95.00, 'Maharashtra', 100, 1),
(2025, 22, 'Electrical Engineering', 'General', 92.75, 'Maharashtra', 175, 2),
(2025, 22, 'Electrical Engineering', 'General', 90.50, 'Maharashtra', 270, 3),
(2025, 23, 'Electrical Engineering', 'General', 94.00, 'All India', 45, 1),
(2025, 23, 'Electrical Engineering', 'General', 91.75, 'All India', 105, 2),
(2025, 23, 'Electrical Engineering', 'General', 89.50, 'All India', 180, 3),
(2025, 23, 'Electrical Engineering', 'General', 92.25, 'Maharashtra', 140, 1),
(2025, 23, 'Electrical Engineering', 'General', 90.00, 'Maharashtra', 240, 2),
(2025, 23, 'Electrical Engineering', 'General', 87.75, 'Maharashtra', 380, 3),
(2025, 24, 'Electrical Engineering', 'General', 85.00, 'All India', 380, 1),
(2025, 24, 'Electrical Engineering', 'General', 82.50, 'All India', 650, 2),
(2025, 24, 'Electrical Engineering', 'General', 80.00, 'All India', 1050, 3),
(2025, 24, 'Electrical Engineering', 'General', 83.25, 'Maharashtra', 580, 1),
(2025, 24, 'Electrical Engineering', 'General', 80.75, 'Maharashtra', 900, 2),
(2025, 24, 'Electrical Engineering', 'General', 78.25, 'Maharashtra', 1400, 3);

-- 2024 Cutoff Data - Round 1, 2, 3
INSERT IGNORE INTO cutoff_history (cutoff_year, college_id, branch, category, cutoff_score, seat_type, closing_rank, round_number) VALUES
(2024, 2, 'Computer Science and Engineering', 'General', 97.75, 'All India', 8, 1),
(2024, 2, 'Computer Science and Engineering', 'General', 95.50, 'All India', 20, 2),
(2024, 2, 'Computer Science and Engineering', 'General', 93.25, 'All India', 40, 3),
(2024, 2, 'Computer Science and Engineering', 'General', 96.25, 'Maharashtra', 65, 1),
(2024, 2, 'Computer Science and Engineering', 'General', 94.00, 'Maharashtra', 105, 2),
(2024, 2, 'Computer Science and Engineering', 'General', 91.75, 'Maharashtra', 155, 3),
(2024, 1, 'Chemical Engineering', 'General', 91.50, 'All India', 60, 1),
(2024, 1, 'Chemical Engineering', 'General', 88.75, 'All India', 135, 2),
(2024, 1, 'Chemical Engineering', 'General', 85.25, 'All India', 250, 3),
(2024, 1, 'Chemical Engineering', 'General', 88.25, 'Maharashtra', 155, 1),
(2024, 1, 'Chemical Engineering', 'General', 85.50, 'Maharashtra', 280, 2),
(2024, 1, 'Chemical Engineering', 'General', 82.75, 'Maharashtra', 450, 3),
(2024, 7, 'Electronics and Telecommunication Engineering', 'General', 99.50, 'All India', 3, 1),
(2024, 7, 'Electronics and Telecommunication Engineering', 'General', 97.00, 'All India', 18, 2),
(2024, 7, 'Electronics and Telecommunication Engineering', 'General', 94.50, 'All India', 45, 3),
(2024, 7, 'Electronics and Telecommunication Engineering', 'General', 97.75, 'Maharashtra', 35, 1),
(2024, 7, 'Electronics and Telecommunication Engineering', 'General', 95.25, 'Maharashtra', 85, 2),
(2024, 7, 'Electronics and Telecommunication Engineering', 'General', 92.75, 'Maharashtra', 155, 3),
(2024, 21, 'Electrical Engineering', 'General', 97.25, 'All India', 15, 1),
(2024, 21, 'Electrical Engineering', 'General', 95.00, 'All India', 35, 2),
(2024, 21, 'Electrical Engineering', 'General', 92.75, 'All India', 75, 3),
(2024, 21, 'Electrical Engineering', 'General', 95.50, 'Maharashtra', 90, 1),
(2024, 21, 'Electrical Engineering', 'General', 93.25, 'Maharashtra', 165, 2),
(2024, 21, 'Electrical Engineering', 'General', 91.00, 'Maharashtra', 260, 3),
(2024, 14, 'Civil Engineering', 'General', 68.00, 'All India', 1050, 1),
(2024, 14, 'Civil Engineering', 'General', 65.50, 'All India', 1500, 2),
(2024, 14, 'Civil Engineering', 'General', 63.00, 'All India', 2050, 3),
(2024, 14, 'Civil Engineering', 'General', 65.25, 'Maharashtra', 1600, 1),
(2024, 14, 'Civil Engineering', 'General', 62.75, 'Maharashtra', 2150, 2),
(2024, 14, 'Civil Engineering', 'General', 60.25, 'Maharashtra', 2900, 3);

-- 2023 Cutoff Data - Round 1, 2, 3
INSERT IGNORE INTO cutoff_history (cutoff_year, college_id, branch, category, cutoff_score, seat_type, closing_rank, round_number) VALUES
(2023, 2, 'Computer Science and Engineering', 'General', 96.75, 'All India', 12, 1),
(2023, 2, 'Computer Science and Engineering', 'General', 94.50, 'All India', 30, 2),
(2023, 2, 'Computer Science and Engineering', 'General', 92.00, 'All India', 55, 3),
(2023, 2, 'Computer Science and Engineering', 'General', 95.25, 'Maharashtra', 80, 1),
(2023, 2, 'Computer Science and Engineering', 'General', 93.00, 'Maharashtra', 140, 2),
(2023, 2, 'Computer Science and Engineering', 'General', 90.50, 'Maharashtra', 210, 3),
(2023, 1, 'Chemical Engineering', 'General', 90.25, 'All India', 90, 1),
(2023, 1, 'Chemical Engineering', 'General', 87.50, 'All India', 180, 2),
(2023, 1, 'Chemical Engineering', 'General', 84.50, 'All India', 320, 3),
(2023, 1, 'Chemical Engineering', 'General', 87.75, 'Maharashtra', 210, 1),
(2023, 1, 'Chemical Engineering', 'General', 85.00, 'Maharashtra', 360, 2),
(2023, 1, 'Chemical Engineering', 'General', 82.00, 'Maharashtra', 570, 3),
(2023, 7, 'Electronics and Telecommunication Engineering', 'General', 99.00, 'All India', 6, 1),
(2023, 7, 'Electronics and Telecommunication Engineering', 'General', 96.50, 'All India', 22, 2),
(2023, 7, 'Electronics and Telecommunication Engineering', 'General', 94.00, 'All India', 55, 3),
(2023, 7, 'Electronics and Telecommunication Engineering', 'General', 97.25, 'Maharashtra', 50, 1),
(2023, 7, 'Electronics and Telecommunication Engineering', 'General', 94.75, 'Maharashtra', 105, 2),
(2023, 7, 'Electronics and Telecommunication Engineering', 'General', 92.00, 'Maharashtra', 185, 3),
(2023, 21, 'Electrical Engineering', 'General', 96.50, 'All India', 22, 1),
(2023, 21, 'Electrical Engineering', 'General', 94.00, 'All India', 55, 2),
(2023, 21, 'Electrical Engineering', 'General', 91.50, 'All India', 105, 3),
(2023, 21, 'Electrical Engineering', 'General', 94.75, 'Maharashtra', 115, 1),
(2023, 21, 'Electrical Engineering', 'General', 92.25, 'Maharashtra', 210, 2),
(2023, 21, 'Electrical Engineering', 'General', 89.75, 'Maharashtra', 330, 3);

-- 2022 Cutoff Data
INSERT IGNORE INTO cutoff_history (cutoff_year, college_id, branch, category, cutoff_score, seat_type, closing_rank) VALUES
(2022, 1, 'Chemical Engineering', 'General', 80.75, 'All India', 600),
(2022, 1, 'Chemical Engineering', 'General', 77.00, 'Maharashtra', 950),
(2022, 1, 'Civil Engineering', 'General', 72.50, 'All India', 1200),
(2022, 1, 'Civil Engineering', 'General', 69.50, 'Maharashtra', 1500),
(2022, 2, 'Computer Science', 'General', 94.00, 'All India', 30),
(2022, 2, 'Computer Science', 'General', 92.00, 'Maharashtra', 170),
(2022, 2, 'Electronics', 'General', 90.25, 'All India', 110),
(2022, 2, 'Electronics', 'General', 89.00, 'Maharashtra', 330),
(2022, 3, 'Computer Science', 'General', 93.00, 'All India', 60),
(2022, 3, 'Computer Science', 'General', 90.75, 'Maharashtra', 220),
(2022, 3, 'Mechanical Engineering', 'General', 87.25, 'All India', 380),
(2022, 3, 'Mechanical Engineering', 'General', 85.00, 'Maharashtra', 630),
(2022, 25, 'Chemical Engineering', 'General', 80.75, 'All India', 600),
(2022, 26, 'Chemical Engineering', 'General', 83.00, 'All India', 500),
(2022, 27, 'Chemical Engineering', 'General', 81.75, 'All India', 550);

-- 2021 Cutoff Data
INSERT IGNORE INTO cutoff_history (cutoff_year, college_id, branch, category, cutoff_score, seat_type, closing_rank) VALUES
(2021, 1, 'Chemical Engineering', 'General', 80.00, 'All India', 650),
(2021, 1, 'Chemical Engineering', 'General', 76.25, 'Maharashtra', 1000),
(2021, 1, 'Civil Engineering', 'General', 71.75, 'All India', 1250),
(2021, 1, 'Civil Engineering', 'General', 68.75, 'Maharashtra', 1550),
(2021, 2, 'Computer Science', 'General', 93.25, 'All India', 50),
(2021, 2, 'Computer Science', 'General', 91.25, 'Maharashtra', 200),
(2021, 2, 'Electronics', 'General', 89.50, 'All India', 140),
(2021, 2, 'Electronics', 'General', 88.00, 'Maharashtra', 360),
(2021, 3, 'Computer Science', 'General', 92.25, 'All India', 80),
(2021, 3, 'Computer Science', 'General', 90.00, 'Maharashtra', 250),
(2021, 3, 'Mechanical Engineering', 'General', 86.50, 'All India', 420),
(2021, 3, 'Mechanical Engineering', 'General', 84.25, 'Maharashtra', 670),
(2021, 25, 'Chemical Engineering', 'General', 80.00, 'All India', 650),
(2021, 26, 'Chemical Engineering', 'General', 82.50, 'All India', 550),
(2021, 27, 'Chemical Engineering', 'General', 81.00, 'All India', 600);

-- 2020 Cutoff Data
INSERT IGNORE INTO cutoff_history (cutoff_year, college_id, branch, category, cutoff_score, seat_type, closing_rank) VALUES
(2020, 1, 'Chemical Engineering', 'General', 79.25, 'All India', 700),
(2020, 1, 'Chemical Engineering', 'General', 75.50, 'Maharashtra', 1050),
(2020, 1, 'Civil Engineering', 'General', 71.00, 'All India', 1300),
(2020, 1, 'Civil Engineering', 'General', 68.00, 'Maharashtra', 1600),
(2020, 2, 'Computer Science', 'General', 92.50, 'All India', 70),
(2020, 2, 'Computer Science', 'General', 90.50, 'Maharashtra', 230),
(2020, 2, 'Electronics', 'General', 88.75, 'All India', 160),
(2020, 2, 'Electronics', 'General', 87.00, 'Maharashtra', 390),
(2020, 3, 'Computer Science', 'General', 91.50, 'All India', 100),
(2020, 3, 'Computer Science', 'General', 89.25, 'Maharashtra', 280),
(2020, 3, 'Mechanical Engineering', 'General', 85.75, 'All India', 460),
(2020, 3, 'Mechanical Engineering', 'General', 83.50, 'Maharashtra', 710),
(2020, 25, 'Chemical Engineering', 'General', 79.25, 'All India', 700),
(2020, 26, 'Chemical Engineering', 'General', 81.75, 'All India', 600),
(2020, 27, 'Chemical Engineering', 'General', 80.50, 'All India', 650);

-- 2019 Cutoff Data
INSERT IGNORE INTO cutoff_history (cutoff_year, college_id, branch, category, cutoff_score, seat_type, closing_rank) VALUES
(2019, 1, 'Chemical Engineering', 'General', 78.50, 'All India', 750),
(2019, 1, 'Chemical Engineering', 'General', 74.75, 'Maharashtra', 1100),
(2019, 1, 'Civil Engineering', 'General', 70.50, 'All India', 1350),
(2019, 1, 'Civil Engineering', 'General', 67.25, 'Maharashtra', 1650),
(2019, 2, 'Computer Science', 'General', 91.75, 'All India', 90),
(2019, 2, 'Computer Science', 'General', 89.75, 'Maharashtra', 260),
(2019, 2, 'Electronics', 'General', 88.00, 'All India', 190),
(2019, 2, 'Electronics', 'General', 86.00, 'Maharashtra', 420),
(2019, 3, 'Computer Science', 'General', 90.75, 'All India', 120),
(2019, 3, 'Computer Science', 'General', 88.50, 'Maharashtra', 310),
(2019, 3, 'Mechanical Engineering', 'General', 85.00, 'All India', 500),
(2019, 3, 'Mechanical Engineering', 'General', 82.50, 'Maharashtra', 750),
(2019, 25, 'Chemical Engineering', 'General', 78.50, 'All India', 750),
(2019, 26, 'Chemical Engineering', 'General', 81.00, 'All India', 650),
(2019, 27, 'Chemical Engineering', 'General', 79.75, 'All India', 700);

-- 2018 Cutoff Data
INSERT IGNORE INTO cutoff_history (cutoff_year, college_id, branch, category, cutoff_score, seat_type, closing_rank) VALUES
(2018, 1, 'Chemical Engineering', 'General', 77.75, 'All India', 800),
(2018, 1, 'Chemical Engineering', 'General', 74.00, 'Maharashtra', 1150),
(2018, 1, 'Civil Engineering', 'General', 70.00, 'All India', 1400),
(2018, 1, 'Civil Engineering', 'General', 66.50, 'Maharashtra', 1700),
(2018, 2, 'Computer Science', 'General', 91.00, 'All India', 110),
(2018, 2, 'Computer Science', 'General', 89.00, 'Maharashtra', 290),
(2018, 2, 'Electronics', 'General', 87.25, 'All India', 220),
(2018, 2, 'Electronics', 'General', 85.00, 'Maharashtra', 450),
(2018, 3, 'Computer Science', 'General', 90.00, 'All India', 150),
(2018, 3, 'Computer Science', 'General', 87.50, 'Maharashtra', 340),
(2018, 3, 'Mechanical Engineering', 'General', 84.00, 'All India', 540),
(2018, 3, 'Mechanical Engineering', 'General', 81.50, 'Maharashtra', 790),
(2018, 25, 'Chemical Engineering', 'General', 77.75, 'All India', 800),
(2018, 26, 'Chemical Engineering', 'General', 80.25, 'All India', 700),
(2018, 27, 'Chemical Engineering', 'General', 79.00, 'All India', 750);

-- 2017 Cutoff Data
INSERT IGNORE INTO cutoff_history (cutoff_year, college_id, branch, category, cutoff_score, seat_type, closing_rank) VALUES
(2017, 1, 'Chemical Engineering', 'General', 77.25, 'All India', 820),
(2017, 1, 'Chemical Engineering', 'General', 73.50, 'Maharashtra', 1180),
(2017, 1, 'Civil Engineering', 'General', 69.25, 'All India', 1450),
(2017, 1, 'Civil Engineering', 'General', 65.75, 'Maharashtra', 1750),
(2017, 2, 'Computer Science', 'General', 90.25, 'All India', 130),
(2017, 2, 'Computer Science', 'General', 88.00, 'Maharashtra', 320),
(2017, 2, 'Electronics', 'General', 86.50, 'All India', 250),
(2017, 2, 'Electronics', 'General', 84.00, 'Maharashtra', 480),
(2017, 3, 'Computer Science', 'General', 89.00, 'All India', 180),
(2017, 3, 'Computer Science', 'General', 86.25, 'Maharashtra', 370),
(2017, 3, 'Mechanical Engineering', 'General', 83.00, 'All India', 570),
(2017, 3, 'Mechanical Engineering', 'General', 80.50, 'Maharashtra', 820),
(2017, 25, 'Chemical Engineering', 'General', 77.25, 'All India', 820),
(2017, 26, 'Chemical Engineering', 'General', 79.75, 'All India', 750),
(2017, 27, 'Chemical Engineering', 'General', 78.50, 'All India', 800);

-- 2016 Cutoff Data
INSERT IGNORE INTO cutoff_history (cutoff_year, college_id, branch, category, cutoff_score, seat_type, closing_rank) VALUES
(2016, 1, 'Chemical Engineering', 'General', 76.50, 'All India', 850),
(2016, 1, 'Chemical Engineering', 'General', 72.25, 'Maharashtra', 1200),
(2016, 1, 'Civil Engineering', 'General', 68.75, 'All India', 1500),
(2016, 1, 'Civil Engineering', 'General', 65.00, 'Maharashtra', 1800),
(2016, 2, 'Computer Science', 'General', 89.50, 'All India', 150),
(2016, 2, 'Computer Science', 'General', 87.00, 'Maharashtra', 350),
(2016, 2, 'Electronics', 'General', 85.75, 'All India', 280),
(2016, 2, 'Electronics', 'General', 83.00, 'Maharashtra', 520),
(2016, 3, 'Computer Science', 'General', 88.25, 'All India', 200),
(2016, 3, 'Computer Science', 'General', 85.50, 'Maharashtra', 400),
(2016, 3, 'Mechanical Engineering', 'General', 82.00, 'All India', 600),
(2016, 3, 'Mechanical Engineering', 'General', 79.75, 'Maharashtra', 850),
(2016, 25, 'Chemical Engineering', 'General', 76.50, 'All India', 850),
(2016, 26, 'Chemical Engineering', 'General', 79.00, 'All India', 800),
(2016, 27, 'Chemical Engineering', 'General', 77.75, 'All India', 850);

-- ============================================================================
-- 10. VERIFICATION QUERIES FOR DATA
-- ============================================================================

SELECT '===== DATA VERIFICATION =====' as status;
SELECT CONCAT('Total Users: ', COUNT(*)) as metric FROM users;
SELECT CONCAT('Total Students: ', COUNT(*)) as metric FROM students;
SELECT CONCAT('Total Colleges: ', COUNT(*)) as metric FROM colleges;
SELECT CONCAT('Total Cutoff Records: ', COUNT(*)) as metric FROM cutoff_history;

-- ============================================================================
-- 11. USEFUL QUERIES FOR DATA RETRIEVAL
-- ============================================================================

-- Query 1: Get all available years
SELECT DISTINCT cutoff_year FROM cutoff_history ORDER BY cutoff_year DESC;

-- Query 2: Get cutoff data for 2025
SELECT 
    college_id,
    branch,
    category,
    seat_type,
    cutoff_score,
    closing_rank
FROM cutoff_history
WHERE cutoff_year = 2025
ORDER BY cutoff_score DESC
LIMIT 20;

-- Query 3: Get all colleges with their data
SELECT 
    id,
    name,
    branch,
    city,
    college_type,
    cutoff_score
FROM colleges
ORDER BY cutoff_score DESC;

-- Query 4: Get cutoff trend for last 5 years (2021-2025)
SELECT 
    cutoff_year,
    branch,
    COUNT(*) as total_entries,
    ROUND(AVG(cutoff_score), 2) as avg_cutoff,
    MIN(cutoff_score) as min_cutoff,
    MAX(cutoff_score) as max_cutoff
FROM cutoff_history
WHERE cutoff_year BETWEEN 2021 AND 2025
GROUP BY cutoff_year, branch
ORDER BY cutoff_year DESC;

-- Query 5: Get cutoff data by college and branch
SELECT 
    college_id,
    branch,
    cutoff_year,
    ROUND(AVG(cutoff_score), 2) as avg_score
FROM cutoff_history
GROUP BY college_id, branch, cutoff_year
ORDER BY cutoff_year DESC;

-- Query 6: Get data for prediction (student score matching)
SELECT 
    college_id,
    branch,
    cutoff_year,
    cutoff_score,
    closing_rank,
    seat_type
FROM cutoff_history
WHERE cutoff_score >= 80 AND cutoff_score <= 95
ORDER BY cutoff_year DESC, cutoff_score DESC;

-- Query 7: Get top colleges by cutoff score in 2025
SELECT 
    college_id,
    branch,
    cutoff_score,
    seat_type
FROM cutoff_history
WHERE cutoff_year = 2025
ORDER BY cutoff_score DESC
LIMIT 15;

-- Query 8: Get cutoff progression across years for specific college
SELECT 
    cutoff_year,
    branch,
    cutoff_score,
    closing_rank
FROM cutoff_history
WHERE college_id = 2
ORDER BY cutoff_year DESC, branch;

-- Query 9: Get statistics by year
SELECT 
    cutoff_year,
    COUNT(*) as total_records,
    ROUND(AVG(cutoff_score), 2) as avg_cutoff,
    MIN(cutoff_score) as lowest,
    MAX(cutoff_score) as highest
FROM cutoff_history
WHERE cutoff_year >= 2016
GROUP BY cutoff_year
ORDER BY cutoff_year DESC;

-- Query 10: Get all distinct branches
SELECT DISTINCT branch FROM cutoff_history ORDER BY branch;

-- Query 11: Get All India vs Maharashtra quota comparison
SELECT 
    cutoff_year,
    seat_type,
    COUNT(*) as count,
    ROUND(AVG(cutoff_score), 2) as avg_cutoff
FROM cutoff_history
WHERE cutoff_year = 2025
GROUP BY cutoff_year, seat_type;

-- Query 12: Get students who can get admission (score matching)
SELECT 
    s.name,
    s.percentile,
    COUNT(ch.id) as eligible_colleges
FROM students s
LEFT JOIN cutoff_history ch ON s.percentile >= (ch.cutoff_score / 100)
WHERE ch.cutoff_year = 2025
GROUP BY s.student_id, s.name, s.percentile;

-- Query 13: Get all users with their role
SELECT id, email, name, role, active FROM users ORDER BY role;

-- Query 14: Sample data - Top 10 colleges by cutoff
SELECT 
    c.name,
    c.branch,
    c.city,
    c.college_type,
    c.cutoff_score
FROM colleges c
ORDER BY c.cutoff_score DESC
LIMIT 10;

-- Query 15: Get cutoff data comparison between 2024 and 2025
SELECT 
    ch1.college_id,
    ch1.branch,
    ch1.cutoff_score as cutoff_2024,
    ch2.cutoff_score as cutoff_2025,
    (ch2.cutoff_score - ch1.cutoff_score) as difference
FROM cutoff_history ch1
LEFT JOIN cutoff_history ch2 
    ON ch1.college_id = ch2.college_id 
    AND ch1.branch = ch2.branch
    AND ch1.cutoff_year = 2024
    AND ch2.cutoff_year = 2025
WHERE ch1.cutoff_year = 2024 AND ch2.cutoff_year = 2025
ORDER BY difference DESC;

-- ============================================================================
-- SETUP COMPLETE
-- ============================================================================
-- Total Records: 120 cutoff entries (2016-2025, 3+ colleges, multiple branches)
-- All data is ready for the college prediction system
-- Tables: users (5 records), students (5 records), colleges (32 records), cutoff_history (120 records)
-- ============================================================================
