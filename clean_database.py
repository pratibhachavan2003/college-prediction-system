#!/usr/bin/env python3
"""
Clean database and import only specific important colleges
Keeps: Top tier and government colleges with 2019-2023 data
"""
import mysql.connector

# List of important colleges to keep (top tier + government colleges)
IMPORTANT_COLLEGES = [
    # Government Colleges
    "Government College of Engineering, Pune",
    "Government Institute of Science Education and Research, Pune",
    "Government College of Engineering, Aurangabad",
    "Government College of Engineering, Amravati",
    "Government College of Engineering, Yavatmal",
    "Government Engineering College, Warud",
    "Government College of Engineering and Research, Amal",
    "Government College of Engineering, Chandrapur",
    "Government Engineering College, Karad",
    
    # Top Private Colleges
    "VJTI, Mumbai",
    "MIT, Pune",
    "Cummins College of Engineering for Women, Pune",
    "Pillai's Institute of Information Technology, Navi Mumbai",
    "DJ Sanghvi College of Engineering, Mumbai",
    "Thadomal Shahani Engineering College, Mumbai",
    "NMAM Institute of Technology, Nitte",
    "PES University, Bangalore",
    "Ramaiah Institute of Technology, Bangalore",
    "Manipal Institute of Technology, Manipal",
    "Dayananda Sagar Academy of Technology and Management, Bangalore",
    
    # Top Engineering Colleges - Maharashtra
    "Veermata Jijabai Technological Institute, Mumbai",
    "All India Shri Shivaji Memorial Society's College of Engineering, Pune",
    "Maharashtra Academy of Engineering, Alandi",
    "Sinhgad Institute of Technology and Science, Pune",
    "Vishwakarma Institute of Technology, Pune",
    "Pune Institute of Computer Technology, Pune",
    "Symbiosis Institute of Technology, Pune",
    "Institute of Chemical Technology, Mumbai",
    "Manipal University Jaipur, Jaipur",
    "Nirma University, Ahmedabad",
    "Shri Guru Gobind Singhji Institute of Engineering and Technology, Nanded",
    "G. H. Raisoni Institute of Engineering and Technology, Nagpur",
    "Sinhgad Technical Education Society's College of Engineering, Pune",
    "MIT World Peace University, Pune",
]

def clean_database():
    """Delete all data and reimport only specific colleges"""
    try:
        conn = mysql.connector.connect(
            host='localhost',
            user='root',
            password='pratibhachavan@18',
            database='college_prediction_db'
        )
        cursor = conn.cursor()
        print("[OK] Connected to MySQL database")
        
        # Get list of colleges to keep
        print("\n[INFO] Identifying colleges to keep...")
        colleges_to_keep = {}
        
        cursor.execute("SELECT id, name FROM colleges")
        all_colleges = cursor.fetchall()
        
        for college_id, college_name in all_colleges:
            # Check if college should be kept
            for important_college in IMPORTANT_COLLEGES:
                if important_college.lower() in college_name.lower() or college_name.lower() in important_college.lower():
                    colleges_to_keep[college_id] = college_name
                    break
        
        print(f"[OK] Found {len(colleges_to_keep)} important colleges to keep")
        
        if not colleges_to_keep:
            print("[WARNING] No matching colleges found! Please check the college list.")
            # Print first 20 colleges for reference
            print("\nAvailable colleges (first 20):")
            cursor.execute("SELECT id, name FROM colleges LIMIT 20")
            for cid, cname in cursor.fetchall():
                print(f"  - {cname}")
            cursor.close()
            conn.close()
            return False
        
        # Delete cutoff_history records for colleges NOT in the keep list
        print("\n[INFO] Deleting cutoff records for non-important colleges...")
        college_ids_to_delete = [c[0] for c in all_colleges if c[0] not in colleges_to_keep.keys()]
        
        if college_ids_to_delete:
            placeholders = ','.join(['%s'] * len(college_ids_to_delete))
            cursor.execute(f"DELETE FROM cutoff_history WHERE college_id IN ({placeholders})", college_ids_to_delete)
            conn.commit()
            print(f"[OK] Deleted cutoff records for {len(college_ids_to_delete)} colleges")
        
        # Delete colleges NOT in the keep list
        print("[INFO] Deleting non-important colleges...")
        if college_ids_to_delete:
            placeholders = ','.join(['%s'] * len(college_ids_to_delete))
            cursor.execute(f"DELETE FROM colleges WHERE id IN ({placeholders})", college_ids_to_delete)
            conn.commit()
            print(f"[OK] Deleted {len(college_ids_to_delete)} non-important colleges")
        
        print("\n[SUCCESS] Database cleaned successfully!")
        print(f"[INFO] Remaining colleges: {len(colleges_to_keep)}")
        
        # Display remaining colleges
        print("\nRemaining colleges:")
        for cid, cname in sorted(colleges_to_keep.items()):
            print(f"  - {cname}")
        
        cursor.close()
        conn.close()
        return True
        
    except mysql.connector.Error as err:
        print(f"[ERROR] Database error: {err}")
        return False

if __name__ == '__main__':
    clean_database()
