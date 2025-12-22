# PowerShell script to add Node.js and Maven to PATH
# Run this as Administrator

# Paths (update these if you extracted to different locations)
$nodePath = "C:\Program Files\node-v24.12.0-win-x64"
$mavenPath = "C:\Program Files\apache-maven-3.9.12\bin"  # Assuming Maven bin folder

# Get current PATH
$currentPath = [Environment]::GetEnvironmentVariable("Path", "Machine")

# Check if already in PATH
if ($currentPath -notlike "*$nodePath*") {
    $newPath = "$currentPath;$nodePath"
    [Environment]::SetEnvironmentVariable("Path", $newPath, "Machine")
    Write-Host "Added Node.js to PATH: $nodePath"
} else {
    Write-Host "Node.js already in PATH"
}

if ($currentPath -notlike "*$mavenPath*") {
    $newPath = "$currentPath;$mavenPath"
    [Environment]::SetEnvironmentVariable("Path", $newPath, "Machine")
    Write-Host "Added Maven to PATH: $mavenPath"
} else {
    Write-Host "Maven already in PATH"
}

Write-Host "Restart your terminals/command prompts for changes to take effect."