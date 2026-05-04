-- Remove duplicate colleges, keeping only oldest records (by ID)
DELETE FROM college 
WHERE id NOT IN (
    SELECT MIN(id) 
    FROM (
        SELECT id 
        FROM college 
        GROUP BY name, city, branch, cutoff_year
    ) AS min_ids
);

-- Verify the count
SELECT COUNT(*) as total_colleges FROM college;

-- Show unique colleges by name, city, branch, year
SELECT name, city, branch, cutoff_year, COUNT(*) as count 
FROM college 
GROUP BY name, city, branch, cutoff_year 
HAVING count > 1;
