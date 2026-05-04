"""
Script to consolidate engineering branches in the database to 5-6 main branches.
"""

import pymysql

# Branch mapping to consolidate many branches into 5-6 main categories
BRANCH_MAPPING = {
    # Computer Science & Engineering (CSE/IT/AI/Data Science)
    'Computer Science and Engineering': 'Computer Science & Engineering',
    'Computer Engineering': 'Computer Science & Engineering',
    'CSE': 'Computer Science & Engineering',
    'Computer Science and Engineering (Artificial Intelligence)': 'Computer Science & Engineering',
    'Computer Science and Engineering (Cyber Security)': 'Computer Science & Engineering',
    'Computer Science and Engineering (Internet of Things and Cyber Security Including Block Chain': 'Computer Science & Engineering',
    'Computer Science and Engineering (IoT)': 'Computer Science & Engineering',
    'Computer Science and Engineering(Artificial Intelligence and Machine Learning)': 'Computer Science & Engineering',
    'Computer Science and Engineering(Cyber Security)': 'Computer Science & Engineering',
    'Computer Science and Engineering(Data Science)': 'Computer Science & Engineering',
    'Computer Science and Information Technology': 'Computer Science & Engineering',
    'Computer Technology': 'Computer Science & Engineering',
    'Computer Science and Business Systems': 'Computer Science & Engineering',
    'Computer Science and Design': 'Computer Science & Engineering',
    'Computer Engineering (Regional Language)': 'Computer Science & Engineering',
    'Computer Engineering (Software Engineering)': 'Computer Science & Engineering',
    'Information Technology': 'Computer Science & Engineering',
    'Artificial Intelligence': 'Computer Science & Engineering',
    'Artificial Intelligence (AI) and Data Science': 'Computer Science & Engineering',
    'Artificial Intelligence and Data Science': 'Computer Science & Engineering',
    'Artificial Intelligence and Machine Learning': 'Computer Science & Engineering',
    'Data Science': 'Computer Science & Engineering',
    'Internet of Things (IoT)': 'Computer Science & Engineering',
    'Industrial IoT': 'Computer Science & Engineering',
    
    # Mechanical Engineering
    'Mechanical Engineering': 'Mechanical Engineering',
    'Mechanical': 'Mechanical Engineering',
    'Mechanical & Automation Engineering': 'Mechanical Engineering',
    'Mechanical and Mechatronics Engineering (Additive Manufacturing)': 'Mechanical Engineering',
    'Mechanical Engineering Automobile': 'Mechanical Engineering',
    'Mechatronics Engineering': 'Mechanical Engineering',
    'Automobile Engineering': 'Mechanical Engineering',
    'Automotive Technology': 'Mechanical Engineering',
    'Manufacturing Science and Engineering': 'Mechanical Engineering',
    'Production Engineering': 'Mechanical Engineering',
    'Production Engineering[Sandwich]': 'Mechanical Engineering',
    'Robotics and Artificial Intelligence': 'Mechanical Engineering',
    'Robotics and Automation': 'Mechanical Engineering',
    'Automation and Robotics': 'Mechanical Engineering',
    
    # Civil Engineering
    'Civil Engineering': 'Civil Engineering',
    'Civil and Environmental Engineering': 'Civil Engineering',
    'Structural Engineering': 'Civil Engineering',
    
    # Electrical Engineering
    'Electrical Engineering': 'Electrical Engineering',
    'Electrical Engg[Electronics and Power]': 'Electrical Engineering',
    'Electronics and Telecommunication Engg': 'Electrical Engineering',
    'Electronics and Communication Engineering': 'Electrical Engineering',
    'Electronics and Communication(Advanced Communication Technology)': 'Electrical Engineering',
    'Electronics and Computer Engineering': 'Electrical Engineering',
    'Electronics and Computer Science': 'Electrical Engineering',
    'Electronics Engineering': 'Electrical Engineering',
    'Electronics Engineering ( VLSI Design and Technology)': 'Electrical Engineering',
    'Instrumentation Engineering': 'Electrical Engineering',
    'Instrumentation and Control Engineering': 'Electrical Engineering',
    
    # Chemical Engineering
    'Chemical Engineering': 'Chemical Engineering',
    'Petro Chemical Engineering': 'Chemical Engineering',
    'Bio Technology': 'Chemical Engineering',
    'Biotechnology': 'Chemical Engineering',
    'Bio Medical Engineering': 'Chemical Engineering',
    'Pharmaceuticals Chemistry and Technology': 'Chemical Engineering',
    'Food Technology': 'Chemical Engineering',
    'Food Engineering and Technology': 'Chemical Engineering',
    'Food Technology And Management': 'Chemical Engineering',
    'Dyestuff Technology': 'Chemical Engineering',
    'Oil,Oleochemicals and Surfactants Technology': 'Chemical Engineering',
    'Plastic and Polymer Engineering': 'Chemical Engineering',
    'Polymer Engineering and Technology': 'Chemical Engineering',
    'Surface Coating Technology': 'Chemical Engineering',
    
    # Additional branches - map to closest main branch
    'Aeronautical Engineering': 'Mechanical Engineering',
    'Agricultural Engineering': 'Civil Engineering',
    'Agriculture Engineering': 'Civil Engineering',
    'Fashion Technology': 'Chemical Engineering',
    'Fibres and Textile Processing Technology': 'Chemical Engineering',
    'Industrial Engineering': 'Mechanical Engineering',
    'Man Made Textile Technology': 'Chemical Engineering',
    'Metallurgy and Material Technology': 'Mechanical Engineering',
    'Textile Chemistry': 'Chemical Engineering',
    'Textile Engineering (Fashion Technology)': 'Chemical Engineering',
    'Textile Plant Engineering': 'Chemical Engineering',
    'Textile Technology': 'Chemical Engineering',
}

def update_branches():
    conn = pymysql.connect(
        host='localhost',
        user='root',
        password='pratibhachavan@18',
        database='college_prediction_db'
    )
    cursor = conn.cursor()
    
    # Get all unique branches
    cursor.execute("SELECT DISTINCT branch FROM colleges WHERE branch IS NOT NULL")
    college_branches = [r[0] for r in cursor.fetchall()]
    
    cursor.execute("SELECT DISTINCT branch FROM cutoff_history WHERE branch IS NOT NULL")
    cutoff_branches = [r[0] for r in cursor.fetchall()]
    
    all_branches = set(college_branches + cutoff_branches)
    
    print(f"Found {len(all_branches)} unique branches in database")
    print("\nCurrent branches:")
    for b in sorted(all_branches):
        print(f"  - {b}")
    
    # Update colleges table
    print("\n--- Updating colleges table ---")
    college_updates = 0
    for old_branch, new_branch in BRANCH_MAPPING.items():
        if old_branch in college_branches:
            cursor.execute(
                "UPDATE colleges SET branch = %s WHERE branch = %s",
                (new_branch, old_branch)
            )
            if cursor.rowcount > 0:
                print(f"  Updated {cursor.rowcount} rows: '{old_branch}' -> '{new_branch}'")
                college_updates += cursor.rowcount
    
    # Update cutoff_history table
    print("\n--- Updating cutoff_history table ---")
    cutoff_updates = 0
    for old_branch, new_branch in BRANCH_MAPPING.items():
        if old_branch in cutoff_branches:
            cursor.execute(
                "UPDATE cutoff_history SET branch = %s WHERE branch = %s",
                (new_branch, old_branch)
            )
            if cursor.rowcount > 0:
                print(f"  Updated {cursor.rowcount} rows: '{old_branch}' -> '{new_branch}'")
                cutoff_updates += cursor.rowcount
    
    conn.commit()
    
    # Verify remaining branches
    cursor.execute("SELECT DISTINCT branch FROM colleges WHERE branch IS NOT NULL ORDER BY branch")
    remaining_college = [r[0] for r in cursor.fetchall()]
    
    cursor.execute("SELECT DISTINCT branch FROM cutoff_history WHERE branch IS NOT NULL ORDER BY branch")
    remaining_cutoff = [r[0] for r in cursor.fetchall()]
    
    print(f"\n--- Summary ---")
    print(f"Colleges table: {len(remaining_college)} unique branches")
    print(f"Cutoff_history table: {len(remaining_cutoff)} unique branches")
    print(f"\nRemaining branches in colleges: {remaining_college}")
    print(f"\nRemaining branches in cutoff_history: {remaining_cutoff}")
    print(f"\nTotal updates: {college_updates} in colleges, {cutoff_updates} in cutoff_history")
    
    conn.close()
    print("\nBranch consolidation complete!")

if __name__ == "__main__":
    update_branches()