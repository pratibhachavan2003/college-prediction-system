package com.collegeprediction.collegebackend.config;

import com.collegeprediction.collegebackend.model.College;
import com.collegeprediction.collegebackend.repository.CollegeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

  private final CollegeRepository collegeRepository;

  public DataLoader(CollegeRepository collegeRepository) {
    this.collegeRepository = collegeRepository;
  }

  @Override
  public void run(String... args) throws Exception {
    long count = collegeRepository.count();
    if (count == 0) {
      List<College> colleges = new ArrayList<>();

      // IITs - All branches available at all IITs
      colleges.add(new College("IIT Bombay", "Mumbai", 98.2, "CSE", "Government", 98.5));
      colleges.add(new College("IIT Bombay", "Mumbai", 98.2, "Mechanical", "Government", 98.0));
      colleges.add(new College("IIT Bombay", "Mumbai", 98.2, "Civil", "Government", 97.5));
      colleges.add(new College("IIT Bombay", "Mumbai", 98.2, "Electrical", "Government", 98.2));
      colleges.add(new College("IIT Bombay", "Mumbai", 98.2, "Electronics", "Government", 98.1));
      colleges.add(new College("IIT Delhi", "Delhi", 98.0, "CSE", "Government", 98.2));
      colleges.add(new College("IIT Delhi", "Delhi", 98.0, "Mechanical", "Government", 97.8));
      colleges.add(new College("IIT Delhi", "Delhi", 98.0, "Civil", "Government", 97.2));
      colleges.add(new College("IIT Delhi", "Delhi", 98.0, "Electrical", "Government", 98.0));
      colleges.add(new College("IIT Delhi", "Delhi", 98.0, "Electronics", "Government", 97.9));
      colleges.add(new College("IIT Madras", "Chennai", 97.8, "CSE", "Government", 98.0));
      colleges.add(new College("IIT Madras", "Chennai", 97.8, "Mechanical", "Government", 97.5));
      colleges.add(new College("IIT Madras", "Chennai", 97.8, "Civil", "Government", 97.0));
      colleges.add(new College("IIT Madras", "Chennai", 97.8, "Electrical", "Government", 97.8));
      colleges.add(new College("IIT Madras", "Chennai", 97.8, "Electronics", "Government", 97.7));

      // NITs - Major branches only (CSE, Mechanical, Civil, Electrical)
      colleges.add(new College("NIT Tiruchirappalli", "Tiruchirappalli", 94.8, "CSE", "Government", 95.0));
      colleges.add(new College("NIT Tiruchirappalli", "Tiruchirappalli", 94.8, "Mechanical", "Government", 94.5));
      colleges.add(new College("NIT Tiruchirappalli", "Tiruchirappalli", 94.8, "Civil", "Government", 94.0));
      colleges.add(new College("NIT Surathkal", "Surathkal", 94.5, "CSE", "Government", 94.8));
      colleges.add(new College("NIT Surathkal", "Surathkal", 94.5, "Mechanical", "Government", 94.2));
      colleges.add(new College("NIT Surathkal", "Surathkal", 94.5, "Civil", "Government", 93.8));
      colleges.add(new College("NIT Warangal", "Warangal", 94.2, "CSE", "Government", 94.5));
      colleges.add(new College("NIT Warangal", "Warangal", 94.2, "Mechanical", "Government", 93.8));
      colleges.add(new College("NIT Warangal", "Warangal", 94.2, "Civil", "Government", 93.5));
      colleges.add(new College("NIT Rourkela", "Rourkela", 93.8, "CSE", "Government", 94.0));
      colleges.add(new College("NIT Rourkela", "Rourkela", 93.8, "Mechanical", "Government", 93.5));
      colleges.add(new College("NIT Rourkela", "Rourkela", 93.8, "Civil", "Government", 93.2));
      colleges.add(new College("NIT Calicut", "Calicut", 93.5, "CSE", "Government", 93.8));
      colleges.add(new College("NIT Calicut", "Calicut", 93.5, "Mechanical", "Government", 93.2));
      colleges.add(new College("NIT Calicut", "Calicut", 93.5, "Civil", "Government", 92.8));

      // BITS - Multiple branches
      colleges.add(new College("BITS Pilani", "Pilani", 95.5, "CSE", "Private", 95.8));
      colleges.add(new College("BITS Pilani", "Pilani", 95.5, "Mechanical", "Private", 95.2));
      colleges.add(new College("BITS Pilani", "Pilani", 95.5, "Civil", "Private", 94.8));
      colleges.add(new College("BITS Pilani", "Pilani", 95.5, "Electronics", "Private", 95.5));
      colleges.add(new College("BITS Goa", "Goa", 94.8, "CSE", "Private", 95.0));
      colleges.add(new College("BITS Goa", "Goa", 94.8, "Mechanical", "Private", 94.5));
      colleges.add(new College("BITS Goa", "Goa", 94.8, "Electronics", "Private", 94.8));
      colleges.add(new College("BITS Hyderabad", "Hyderabad", 94.5, "CSE", "Private", 94.8));
      colleges.add(new College("BITS Hyderabad", "Hyderabad", 94.5, "Mechanical", "Private", 94.2));
      colleges.add(new College("BITS Hyderabad", "Hyderabad", 94.5, "Civil", "Private", 93.8));

      // VIT - Multiple branches
      colleges.add(new College("VIT Vellore", "Vellore", 92.5, "CSE", "Private", 93.0));
      colleges.add(new College("VIT Vellore", "Vellore", 92.5, "Mechanical", "Private", 92.2));
      colleges.add(new College("VIT Vellore", "Vellore", 92.5, "Civil", "Private", 91.8));
      colleges.add(new College("VIT Vellore", "Vellore", 92.5, "Electronics", "Private", 92.8));
      colleges.add(new College("VIT Chennai", "Chennai", 91.8, "CSE", "Private", 92.0));
      colleges.add(new College("VIT Chennai", "Chennai", 91.8, "Mechanical", "Private", 91.5));
      colleges.add(new College("VIT Bhopal", "Bhopal", 91.2, "CSE", "Private", 91.5));
      colleges.add(new College("VIT Bhopal", "Bhopal", 91.2, "Mechanical", "Private", 90.8));
      colleges.add(new College("VIT Amaravati", "Amaravati", 90.5, "CSE", "Private", 91.0));
      colleges.add(new College("VIT Amaravati", "Amaravati", 90.5, "Mechanical", "Private", 90.2));

      // Top State Universities/Colleges
      colleges.add(new College("College of Engineering, Pune", "Pune", 93.5, "CSE", "Government", 93.8));
      colleges.add(new College("College of Engineering, Pune", "Pune", 93.5, "Mechanical", "Government", 93.0));
      colleges.add(new College("Delhi Technological University", "Delhi", 93.2, "CSE", "Government", 93.5));
      colleges.add(new College("Delhi Technological University", "Delhi", 93.2, "Mechanical", "Government", 92.8));
      colleges.add(new College("PEC University of Technology", "Chandigarh", 92.8, "CSE", "Government", 93.0));
      colleges.add(new College("PEC University of Technology", "Chandigarh", 92.8, "Civil", "Government", 92.2));
      colleges.add(new College("Jadavpur University", "Kolkata", 92.5, "CSE", "Government", 92.8));
      colleges.add(new College("Jadavpur University", "Kolkata", 92.5, "Mechanical", "Government", 92.0));
      colleges.add(new College("Anna University", "Chennai", 92.2, "CSE", "Government", 92.5));
      colleges.add(new College("Anna University", "Chennai", 92.2, "Civil", "Government", 91.8));
      colleges.add(new College("IIIT Hyderabad", "Hyderabad", 95.5, "CSE", "Deemed", 96.0));
      colleges.add(new College("IIIT Hyderabad", "Hyderabad", 95.5, "Electronics", "Deemed", 95.5));
      colleges.add(new College("IIIT Delhi", "Delhi", 95.2, "CSE", "Deemed", 95.5));
      colleges.add(new College("IIIT Delhi", "Delhi", 95.2, "Electronics", "Deemed", 95.0));
      colleges.add(new College("IIIT Bangalore", "Bangalore", 94.8, "CSE", "Deemed", 95.0));

      // More NITs - Adding CSE focus
      colleges.add(new College("NIT Kurukshetra", "Kurukshetra", 91.5, "CSE", "Government", 91.8));
      colleges.add(new College("NIT Kurukshetra", "Kurukshetra", 91.5, "Mechanical", "Government", 91.0));
      colleges.add(new College("NIT Allahabad", "Allahabad", 92.8, "CSE", "Government", 93.0));
      colleges.add(new College("NIT Allahabad", "Allahabad", 92.8, "Mechanical", "Government", 92.5));
      colleges.add(new College("NIT Bhopal", "Bhopal", 90.5, "CSE", "Government", 90.8));
      colleges.add(new College("NIT Bhopal", "Bhopal", 90.5, "Mechanical", "Government", 90.0));
      colleges.add(new College("NIT Jaipur", "Jaipur", 90.2, "CSE", "Government", 90.5));
      colleges.add(new College("NIT Jaipur", "Jaipur", 90.2, "Electrical", "Government", 89.8));

      // More Private Colleges with CSE
      colleges.add(new College("Manipal Institute of Technology", "Manipal", 91.5, "CSE", "Private", 91.8));
      colleges.add(new College("Manipal Institute of Technology", "Manipal", 91.5, "Mechanical", "Private", 91.2));
      colleges.add(new College("SRM Institute of Technology", "Chennai", 89.5, "CSE", "Private", 90.0));
      colleges.add(new College("SRM Institute of Technology", "Chennai", 89.5, "Mechanical", "Private", 89.2));
      colleges.add(new College("Thapar University", "Patiala", 90.8, "CSE", "Private", 91.0));
      colleges.add(new College("Thapar University", "Patiala", 90.8, "Mechanical", "Private", 90.5));
      colleges.add(new College("UPES Dehradun", "Dehradun", 85.5, "CSE", "Private", 86.0));
      colleges.add(new College("UPES Dehradun", "Dehradun", 85.5, "Mechanical", "Private", 85.2));
      colleges.add(new College("Amrita University", "Coimbatore", 88.5, "CSE", "Private", 89.0));
      colleges.add(new College("Amrita University", "Coimbatore", 88.5, "Mechanical", "Private", 88.0));
      colleges.add(new College("KIIT University", "Bhubaneswar", 86.5, "CSE", "Private", 87.0));
      colleges.add(new College("KIIT University", "Bhubaneswar", 86.5, "Mechanical", "Private", 86.2));
      colleges.add(new College("Chandigarh University", "Chandigarh", 81.5, "CSE", "Private", 82.0));
      colleges.add(new College("Chandigarh University", "Chandigarh", 81.5, "Mechanical", "Private", 81.2));

      // More Bangalore Colleges (top tier private)
      colleges.add(new College("MS Ramaiah Institute of Technology", "Bangalore", 88.2, "CSE", "Private", 88.5));
      colleges.add(new College("MS Ramaiah Institute of Technology", "Bangalore", 88.2, "Mechanical", "Private", 87.8));
      colleges.add(new College("RV College of Engineering", "Bangalore", 89.5, "CSE", "Private", 89.8));
      colleges.add(new College("RV College of Engineering", "Bangalore", 89.5, "Mechanical", "Private", 89.0));
      colleges.add(new College("BMS College of Engineering", "Bangalore", 88.8, "CSE", "Private", 89.0));
      colleges.add(new College("BMS College of Engineering", "Bangalore", 88.8, "Mechanical", "Private", 88.5));
      colleges.add(new College("PES University", "Bangalore", 88.5, "CSE", "Private", 88.8));
      colleges.add(new College("PES University", "Bangalore", 88.5, "Mechanical", "Private", 88.0));
      colleges.add(new College("BITS Mesra", "Ranchi", 89.5, "CSE", "Private", 90.0));
      colleges.add(new College("BITS Mesra", "Ranchi", 89.5, "Mechanical", "Private", 89.0));

      // South Indian Colleges
      colleges.add(new College("PSG College of Technology", "Coimbatore", 89.2, "CSE", "Private", 89.5));
      colleges.add(new College("PSG College of Technology", "Coimbatore", 89.2, "Mechanical", "Private", 88.8));
      colleges.add(new College("Anna University", "Chennai", 92.2, "CSE", "Government", 92.5));
      colleges.add(new College("Anna University", "Chennai", 92.2, "Mechanical", "Government", 91.8));
      colleges
          .add(new College("Government Engineering College, Thrissur", "Thrissur", 88.5, "CSE", "Government", 88.8));
      colleges
          .add(new College("Government Engineering College, Thrissur", "Thrissur", 88.5, "Civil", "Government", 88.0));

      // Mumbai Engineering Colleges (top tier)
      colleges.add(new College("VJTI Mumbai", "Mumbai", 90.8, "CSE", "Government", 91.0));
      colleges.add(new College("VJTI Mumbai", "Mumbai", 90.8, "Mechanical", "Government", 90.5));
      colleges.add(new College("Veermata Jijabai Technological Institute", "Mumbai", 90.5, "CSE", "Government", 90.8));
      colleges
          .add(new College("Veermata Jijabai Technological Institute", "Mumbai", 90.5, "Civil", "Government", 90.0));

      // Additional variety - More branches represented
      colleges.add(new College("NIT Nagpur", "Nagpur", 91.2, "CSE", "Government", 91.5));
      colleges.add(new College("NIT Nagpur", "Nagpur", 91.2, "Mechanical", "Government", 90.8));
      colleges.add(new College("NIT Surat", "Surat", 90.8, "CSE", "Government", 91.0));
      colleges.add(new College("NIT Surat", "Surat", 90.8, "Mechanical", "Government", 90.5));
      colleges.add(new College("Symbiosis Institute of Technology", "Pune", 87.5, "CSE", "Private", 88.0));
      colleges.add(new College("Symbiosis Institute of Technology", "Pune", 87.5, "Mechanical", "Private", 87.0));
      colleges.add(new College("NMIMS University", "Mumbai", 87.5, "CSE", "Private", 88.0));
      colleges.add(new College("NMIMS University", "Mumbai", 87.5, "Mechanical", "Private", 87.0));
      colleges.add(new College("Shiv Nadar University", "Greater Noida", 88.8, "CSE", "Private", 89.2));
      colleges.add(new College("Shiv Nadar University", "Greater Noida", 88.8, "Mechanical", "Private", 88.5));
      colleges.add(new College("Institute of Engineering & Management", "Kolkata", 86.5, "CSE", "Private", 87.0));
      colleges.add(new College("Institute of Engineering & Management", "Kolkata", 86.5, "Civil", "Private", 86.0));

      collegeRepository.saveAll(colleges);
      System.out.println("Seeded colleges database with " + colleges.size() + " colleges for 2025");
    } else {
      System.out.println("Colleges already present in database: " + count);
    }
  }
}
