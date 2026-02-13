import os
import csv
import reverse_geocoder as rg
from ultralytics import YOLO, settings
import exifread
from tqdm import tqdm

# --- CONFIGURATION ---
# FIX: 'uuid' must be set to a string, not None, to avoid TypeError.
# Setting sync: False disables anonymous usage statistics for privacy.
settings.update({'sync': False, 'uuid': ''}) 

SOURCE_FOLDER = "./Unsorted_Images"
SUMMARY_FILE = "image_summary.csv"

# Global variables for models
detection_model = None
classification_model = None

def check_and_load_models():
    """Checks for, downloads (if needed), and loads the YOLO models."""
    print("Checking and Loading AI Models...")
    
    global detection_model, classification_model
    
    # YOLO() attempts to download the file if not found locally.
    try:
        detection_model = YOLO("yolov8n.pt") 
        classification_model = YOLO("yolov8n-cls.pt")
    except Exception as e:
        print(f"Error loading one or both YOLO models: {e}")
        print("Please ensure you have run 'pip install -r requirements.txt' and the files (yolov8n.pt, yolov8n-cls.pt) are available.")
        raise
        
    print("AI Models Loaded Successfully.")

# --- CORE GPS FUNCTIONS ---
def convert_to_degrees(value):
    """Converts EXIF GPS D:M:S fraction to Decimal Degrees."""
    # (Degrees/1) + (Minutes/60) + (Seconds/3600)
    d = float(value.values[0].num) / float(value.values[0].den)
    m = float(value.values[1].num) / float(value.values[1].den)
    s = float(value.values[2].num) / float(value.values[2].den)
    return d + (m / 60.0) + (s / 3600.0)

def extract_gps_and_city(image_path):
    """
    Extracts GPS coordinates and looks up City Name LOCALLY.
    Returns: (city_name, lat, lon) or ("Unknown_Location", None, None)
    """
    try:
        with open(image_path, 'rb') as f:
            tags = exifread.process_file(f)
            
            gps_lat = tags.get('GPS GPSLatitude')
            gps_lat_ref = tags.get('GPS GPSLatitudeRef')
            gps_lon = tags.get('GPS GPSLongitude')
            gps_lon_ref = tags.get('GPS GPSLongitudeRef')

            if not gps_lat or not gps_lon:
                return "Unknown_Location", None, None

            lat = convert_to_degrees(gps_lat)
            # Apply North/South reference
            if gps_lat_ref.values[0] != 'N': lat = -lat

            lon = convert_to_degrees(gps_lon)
            # Apply East/West reference
            if gps_lon_ref.values[0] != 'E': lon = -lon
            
            # Offline Lookup
            results = rg.search((lat, lon)) 
            # Replace spaces and commas for clean folder names
            city = results[0]['name'].replace(',', '').replace(' ', '_')
            
            return city, lat, lon

    except Exception:
        return "Unknown_Location", None, None


# --- MAIN METADATA SCRAPING LOGIC ---
def scrape_and_summarize():
    """Runs AI and GPS analysis on all images and writes results to a CSV summary."""
    
    if not os.path.isdir(SOURCE_FOLDER):
        print(f"ERROR: Source folder '{SOURCE_FOLDER}' not found. Please create it and add images.")
        return

    all_files = [f for f in os.listdir(SOURCE_FOLDER) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
    
    if not all_files:
        print(f"No images found in '{SOURCE_FOLDER}'. Exiting.")
        return

    print(f"Starting Metadata Scrape. Found {len(all_files)} images.")

    with open(SUMMARY_FILE, 'w', newline='') as csvfile:
        fieldnames = ['filename', 'AI_Folder', 'Offline_City', 'People_Count', 
                      'Top_Class_ID', 'Top_Class_Name', 'GPS_Latitude', 'GPS_Longitude']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()

        for filename in tqdm(all_files, desc="Processing Images", unit="img"):
            filepath = os.path.join(SOURCE_FOLDER, filename)
            
            # Default values for error handling
            ai_folder = "Unsorted_AI_Error"
            people_count = 0
            top_class_id = None
            class_name = None
            city, lat, lon = "Unknown_Location", None, None
            
            try:
                # 1. AI Analysis
                # Run detection first to count people
                detection_results = detection_model(filepath, verbose=False)
                people_count = len([x for x in detection_results[0].boxes.cls if int(x) == 0]) # Class 0 is 'person'

                if 1 <= people_count <= 3:
                    ai_folder = "Omar"
                elif people_count > 3:
                    ai_folder = "Session_Delivery"
                else:
                    # Secondary Classification check (only if 0 people are detected)
                    classification_results = classification_model(filepath, verbose=False)
                    top_class_id = classification_results[0].probs.top1
                    class_name = classification_results[0].names[top_class_id]
                    
                    if "plant" in class_name or "flower" in class_name:
                        ai_folder = "Plants"
                    else:
                        ai_folder = "KPMG_Offices" # Default catch-all

                # 2. GPS/City Lookup
                city, lat, lon = extract_gps_and_city(filepath)
                
                # 3. Write to CSV
                writer.writerow({
                    'filename': filename,
                    'AI_Folder': ai_folder,
                    'Offline_City': city,
                    'People_Count': people_count,
                    'Top_Class_ID': top_class_id,
                    'Top_Class_Name': class_name,
                    'GPS_Latitude': lat,
                    'GPS_Longitude': lon
                })

            except Exception as e:
                # Log errors for files that failed processing entirely
                with open("metadata_error_log.txt", "a") as err_f:
                    err_f.write(f"{filename} (AI/Processing Error): {e}\n")
                
if __name__ == "__main__":
    check_and_load_models()
    scrape_and_summarize()
    print(f"\n✅ Processing complete. Review results in '{SUMMARY_FILE}'.")