import os
import shutil
import csv
from tqdm import tqdm

# --- CONFIGURATION ---
SOURCE_FOLDER = "./Unsorted_Images"
BASE_OUTPUT = "./Sorted_Images"
LOG_FILE = "process_log.csv"
SUMMARY_FILE = "image_summary.csv" # New: Read the summary file
REAL_RUN = True 

def load_processed_files():
    if not os.path.exists(LOG_FILE):
        return set()
    with open(LOG_FILE, 'r') as f:
        # Assuming the log file stores only the filename in the first column
        return set(line.strip().split(',')[0] for line in f)

def log_success(filename, destination):
    with open(LOG_FILE, 'a', newline='') as f:
        writer = csv.writer(f)
        writer.writerow([filename, destination])

def sort_images_from_summary():
    
    # 1. Load Summary Data
    summary_data = []
    if not os.path.exists(SUMMARY_FILE):
        print(f"ERROR: Summary file '{SUMMARY_FILE}' not found. Run metadata_scraper.py first.")
        return

    with open(SUMMARY_FILE, 'r', newline='') as f:
        reader = csv.DictReader(f)
        summary_data = list(reader)

    processed_files = load_processed_files()
    
    print(f"Starting Final Sort. Found {len(summary_data)} entries in summary file.")

    for row in tqdm(summary_data, desc="Sorting", unit="img"):
        filename = row['filename']

        if filename in processed_files:
            continue 

        filepath = os.path.join(SOURCE_FOLDER, filename)
        
        # --- Retrieve Pre-Calculated Data ---
        folder = row['AI_Folder']
        city = row['Offline_City']
        
        try:
            # --- Copy File (The only remaining action) ---
            final_dir = os.path.join(BASE_OUTPUT, folder, city)
            
            if REAL_RUN:
                os.makedirs(final_dir, exist_ok=True)
                shutil.copy2(filepath, os.path.join(final_dir, filename))
                log_success(filename, final_dir)

        except Exception as e:
            with open("error_log.txt", "a") as err_f:
                err_f.write(f"Copy/Log Error for {filename}: {e}\n")

if __name__ == "__main__":
    sort_images_from_summary()