-- Create database
CREATE DATABASE IF NOT EXISTS college_prediction_db;
USE college_prediction_db;

-- Create colleges table
CREATE TABLE IF NOT EXISTS colleges (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(100),
    cutoff_score DOUBLE,
    branch VARCHAR(100),
    college_type VARCHAR(50),
    ranking_score DOUBLE,
    cutoff_year INT,
    cap_round INT DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create students table
CREATE TABLE IF NOT EXISTS students (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    phone_number VARCHAR(20),
    password VARCHAR(255),
    tenth_percentage DOUBLE,
    twelfth_percentage DOUBLE,
    jee_score DOUBLE,
    role VARCHAR(50)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create cutoff history table for 3-5 years of historical data
CREATE TABLE IF NOT EXISTS cutoff_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    college_id BIGINT NOT NULL,
    cutoff_score DOUBLE NOT NULL,
    cutoff_year INT NOT NULL,
    branch VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    seat_type VARCHAR(50),
    seats_available INT,
    closing_rank INT,
    round_number INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (college_id) REFERENCES colleges(id),
    INDEX idx_college_year (college_id, cutoff_year),
    INDEX idx_cutoff_year (cutoff_year)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert sample colleges
INSERT INTO colleges (name, city, cutoff_score, branch, college_type, ranking_score, cutoff_year) VALUES
('IIT Delhi', 'Delhi', 450, 'CSE', 'IIT', 9.5, 2023),
('IIT Bombay', 'Mumbai', 455, 'CSE', 'IIT', 9.4, 2023),
('NIT Delhi', 'Delhi', 380, 'CSE', 'NIT', 8.5, 2023),
('NIT Trichy', 'Trichy', 375, 'CSE', 'NIT', 8.4, 2023),
('BITS Pilani', 'Pilani', 320, 'CSE', 'Private', 8.2, 2023),
('Manipal Institute', 'Bangalore', 310, 'CSE', 'Private', 8.0, 2023),
('IIT Delhi', 'Delhi', 445, 'ECE', 'IIT', 9.5, 2023),
('IIT Bombay', 'Mumbai', 450, 'ECE', 'IIT', 9.4, 2023),
('NIT Delhi', 'Delhi', 375, 'ECE', 'NIT', 8.5, 2023),
('NIT Trichy', 'Trichy', 370, 'ECE', 'NIT', 8.4, 2023),
('BITS Pilani', 'Pilani', 310, 'ECE', 'Private', 8.2, 2023),
('Manipal Institute', 'Bangalore', 305, 'ECE', 'Private', 8.0, 2023),
('IIT Delhi', 'Delhi', 420, 'Mechanical', 'IIT', 9.5, 2023),
('IIT Bombay', 'Mumbai', 425, 'Mechanical', 'IIT', 9.4, 2023),
('NIT Delhi', 'Delhi', 355, 'Mechanical', 'NIT', 8.5, 2023),
('NIT Trichy', 'Trichy', 350, 'Mechanical', 'NIT', 8.4, 2023),
('BITS Pilani', 'Pilani', 290, 'Mechanical', 'Private', 8.2, 2023),
('Manipal Institute', 'Bangalore', 285, 'Mechanical', 'Private', 8.0, 2023),
('IIT Delhi', 'Delhi', 440, 'Civil', 'IIT', 9.5, 2023),
('IIT Bombay', 'Mumbai', 445, 'Civil', 'IIT', 9.4, 2023);

-- Insert 5 years of historical cutoff data (2020-2024)
-- 2020 Data
INSERT INTO cutoff_history (college_id, cutoff_score, cutoff_year, branch, category, seat_type, seats_available) VALUES
(1, 430, 2020, 'CSE', 'General', 'Open', 60),
(1, 425, 2020, 'CSE', 'OBC', 'Reserved', 20),
(1, 420, 2020, 'CSE', 'SC', 'Reserved', 15),
(2, 435, 2020, 'CSE', 'General', 'Open', 50),
(3, 360, 2020, 'CSE', 'General', 'Open', 80),
(4, 355, 2020, 'CSE', 'General', 'Open', 75),
(5, 300, 2020, 'CSE', 'General', 'Open', 100),
(6, 290, 2020, 'CSE', 'General', 'Open', 120),
(7, 425, 2020, 'ECE', 'General', 'Open', 60),
(8, 430, 2020, 'ECE', 'General', 'Open', 50),
(9, 355, 2020, 'ECE', 'General', 'Open', 75),
(10, 350, 2020, 'ECE', 'General', 'Open', 70),
(13, 400, 2020, 'Mechanical', 'General', 'Open', 90),
(14, 405, 2020, 'Mechanical', 'General', 'Open', 80),
(15, 335, 2020, 'Mechanical', 'General', 'Open', 100),
(16, 330, 2020, 'Mechanical', 'General', 'Open', 95);

-- 2021 Data
INSERT INTO cutoff_history (college_id, cutoff_score, cutoff_year, branch, category, seat_type, seats_available) VALUES
(1, 440, 2021, 'CSE', 'General', 'Open', 60),
(1, 435, 2021, 'CSE', 'OBC', 'Reserved', 20),
(1, 430, 2021, 'CSE', 'SC', 'Reserved', 15),
(2, 445, 2021, 'CSE', 'General', 'Open', 50),
(3, 370, 2021, 'CSE', 'General', 'Open', 80),
(4, 365, 2021, 'CSE', 'General', 'Open', 75),
(5, 310, 2021, 'CSE', 'General', 'Open', 100),
(6, 300, 2021, 'CSE', 'General', 'Open', 120),
(7, 435, 2021, 'ECE', 'General', 'Open', 60),
(8, 440, 2021, 'ECE', 'General', 'Open', 50),
(9, 365, 2021, 'ECE', 'General', 'Open', 75),
(10, 360, 2021, 'ECE', 'General', 'Open', 70),
(13, 410, 2021, 'Mechanical', 'General', 'Open', 90),
(14, 415, 2021, 'Mechanical', 'General', 'Open', 80),
(15, 345, 2021, 'Mechanical', 'General', 'Open', 100),
(16, 340, 2021, 'Mechanical', 'General', 'Open', 95);

-- 2022 Data
INSERT INTO cutoff_history (college_id, cutoff_score, cutoff_year, branch, category, seat_type, seats_available) VALUES
(1, 445, 2022, 'CSE', 'General', 'Open', 60),
(1, 440, 2022, 'CSE', 'OBC', 'Reserved', 20),
(1, 435, 2022, 'CSE', 'SC', 'Reserved', 15),
(2, 450, 2022, 'CSE', 'General', 'Open', 50),
(3, 375, 2022, 'CSE', 'General', 'Open', 80),
(4, 370, 2022, 'CSE', 'General', 'Open', 75),
(5, 315, 2022, 'CSE', 'General', 'Open', 100),
(6, 305, 2022, 'CSE', 'General', 'Open', 120),
(7, 440, 2022, 'ECE', 'General', 'Open', 60),
(8, 445, 2022, 'ECE', 'General', 'Open', 50),
(9, 370, 2022, 'ECE', 'General', 'Open', 75),
(10, 365, 2022, 'ECE', 'General', 'Open', 70),
(13, 415, 2022, 'Mechanical', 'General', 'Open', 90),
(14, 420, 2022, 'Mechanical', 'General', 'Open', 80),
(15, 350, 2022, 'Mechanical', 'General', 'Open', 100),
(16, 345, 2022, 'Mechanical', 'General', 'Open', 95);

-- 2023 Data
INSERT INTO cutoff_history (college_id, cutoff_score, cutoff_year, branch, category, seat_type, seats_available) VALUES
(1, 450, 2023, 'CSE', 'General', 'Open', 60),
(1, 445, 2023, 'CSE', 'OBC', 'Reserved', 20),
(1, 440, 2023, 'CSE', 'SC', 'Reserved', 15),
(2, 455, 2023, 'CSE', 'General', 'Open', 50),
(3, 380, 2023, 'CSE', 'General', 'Open', 80),
(4, 375, 2023, 'CSE', 'General', 'Open', 75),
(5, 320, 2023, 'CSE', 'General', 'Open', 100),
(6, 310, 2023, 'CSE', 'General', 'Open', 120),
(7, 445, 2023, 'ECE', 'General', 'Open', 60),
(8, 450, 2023, 'ECE', 'General', 'Open', 50),
(9, 375, 2023, 'ECE', 'General', 'Open', 75),
(10, 370, 2023, 'ECE', 'General', 'Open', 70),
(13, 420, 2023, 'Mechanical', 'General', 'Open', 90),
(14, 425, 2023, 'Mechanical', 'General', 'Open', 80),
(15, 355, 2023, 'Mechanical', 'General', 'Open', 100),
(16, 350, 2023, 'Mechanical', 'General', 'Open', 95);

-- 2024 Data (Current year)
INSERT INTO cutoff_history (college_id, cutoff_score, cutoff_year, branch, category, seat_type, seats_available) VALUES
(1, 450, 2024, 'CSE', 'General', 'Open', 60),
(1, 445, 2024, 'CSE', 'OBC', 'Reserved', 20),
(1, 440, 2024, 'CSE', 'SC', 'Reserved', 15),
(2, 455, 2024, 'CSE', 'General', 'Open', 50),
(3, 380, 2024, 'CSE', 'General', 'Open', 80),
(4, 375, 2024, 'CSE', 'General', 'Open', 75),
(5, 320, 2024, 'CSE', 'General', 'Open', 100),
(6, 310, 2024, 'CSE', 'General', 'Open', 120),
(7, 445, 2024, 'ECE', 'General', 'Open', 60),
(8, 450, 2024, 'ECE', 'General', 'Open', 50),
(9, 375, 2024, 'ECE', 'General', 'Open', 75),
(10, 370, 2024, 'ECE', 'General', 'Open', 70),
(13, 420, 2024, 'Mechanical', 'General', 'Open', 90),
(14, 425, 2024, 'Mechanical', 'General', 'Open', 80),
(15, 355, 2024, 'Mechanical', 'General', 'Open', 100),
(16, 350, 2024, 'Mechanical', 'General', 'Open', 95);

-- Create indexes for optimal query performance
CREATE INDEX idx_college_cutoff ON cutoff_history(college_id, cutoff_year);
CREATE INDEX idx_branch ON cutoff_history(branch);
CREATE INDEX idx_category ON cutoff_history(category);
CREATE INDEX idx_year_range ON cutoff_history(cutoff_year);
