import zipfile
import os
from pathlib import Path

# Change to the project directory
os.chdir(r"C:\Dev\ai-teacher-portfolio")

# Files to include in the audit bundle
files = [
    "src\\App.tsx",
    "src\\constants.ts",
    "src\\types.ts",
    "src\\index.tsx",
    "src\\components\\About.tsx",
    "src\\components\\Gallery.tsx",
    "src\\components\\modules\\Module4.tsx",
    "src\\components\\modules\\Module5.tsx",
    "src\\components\\AITeacherApp.tsx",
    "src\\components\\PortfolioHome.tsx",
    "package.json",
    "vite.config.ts"
]

# Remove old zip if exists
zip_path = "audit-bundle.zip"
if os.path.exists(zip_path):
    os.remove(zip_path)
    print(f"Removed existing {zip_path}")

# Create zip
with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for file in files:
        if os.path.exists(file):
            zipf.write(file, file)
            print(f"Added: {file}")
        else:
            print(f"Warning: {file} not found, skipping")

print(f"\nCreated {zip_path} - upload this to Claude")
