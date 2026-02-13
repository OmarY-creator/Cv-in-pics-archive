import os
import csv
import reverse_geocoder as rg
from ultralytics import YOLO, settings
import exifread
from tqdm import tqdm

# --- CONFIGURATION ---
# FIX: 'uuid' must be set to a string. Setting sync: False disables analytics.
settings.update({'sync': False, 'uuid': ''}) 

SOURCE_FOLDER = "./Unsorted_Images"
SUMMARY_FILE = "image_summary.csv"

# New Rule Settings
MIN_SESSION_PEOPLE = 6  # Minimum people for a Session Delivery (used to be 4)
MAX_SESSION_PEOPLE = 70 # Cap the person count to prevent extreme false positives (e.g., 16 people)

# Global variables for models
detection_model = None
classification_model = None

# Keywords for Indoor/Outdoor inference using ImageNet classes
INDOOR_KEYWORDS = [
    'desk', 'monitor', 'chair', 'auditorium', 'conference_room', 'library', 'kitchen', 
    'computer', 'cup', 'table', 'screen', 'keyboard', 'office', 'room', 'bookcase'
]
OUTDOOR_KEYWORDS = [
    'mountain', 'seashore', 'sky', 'car', 'street_sign', 'building', 'flagpole', 
    'beach', 'field', 'valley', 'road', 'umbrella', 'tent'
]


def check_and_load_models():
    """Checks for, downloads (if needed), and loads the YOLO models."""
    print("Checking and Loading AI Models...")
    
    global detection_model, classification_model
    
    try:
        detection_model = YOLO("yolov8n.pt") 
        classification_model = YOLO("yolov8n-cls.pt")
    except Exception as e:
        print(f"Error loading one or both YOLO models: {e}")
        raise
        
    print("AI Models Loaded Successfully.")


def check_scene_type(class_names):
    """Determines if the scene is indoor, outdoor, or unknown based on keywords."""
    
    # Check if any top class is an indoor keyword
    if any(k in name for k in INDOOR_KEYWORDS for name in class_names):
        return 'Indoor'
    
    # Check if any top class is an outdoor keyword
    if any(k in name for k in OUTDOOR_KEYWORDS for name in class_names):
        return 'Outdoor'
        
    return 'Unknown'


def convert_to_degrees(value):
    # ... (Keep this function the same)
    d = float(value.values[0].num) / float(value.values[0].den)
    m = float(value.values[1].num) / float(value.values[1].den)
    s = float(value.values[2].num) / float(value.values[2].den)
    return d + (m / 60.0) + (s / 3600.0)

def extract_gps_and_city(image_path):
    # ... (Keep this function the same)
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
            if gps_lat_ref.values[0] != 'N': lat = -lat

            lon = convert_to_degrees(gps_lon)
            if gps_lon_ref.values[0] != 'E': lon = -lon
            
            results = rg.search((lat, lon)) 
            city = results[0]['name'].replace(',', '').replace(' ', '_')
            
            return city, lat, lon

    except Exception:
        return "Unknown_Location", None, None


# --- MAIN METADATA SCRAPING LOGIC ---
def scrape_and_summarize():
    
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
                      'Top_Class_ID', 'Top_Class_Name', 'GPS_Latitude', 'GPS_Longitude', 
                      'Scene_Type'] # Added Scene_Type for logging
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()

        for filename in tqdm(all_files, desc="Processing Images", unit="img"):
            filepath = os.path.join(SOURCE_FOLDER, filename)
            
            ai_folder = "Unsorted_AI_Error"
            people_count = 0
            top_class_id = None
            class_name = None
            scene_type = None
            city, lat, lon = "Unknown_Location", None, None
            
            try:
                # 1. AI Detection (Count people)
                detection_results = detection_model(filepath, verbose=False)
                people_count = len([x for x in detection_results[0].boxes.cls if int(x) == 0]) 

                
                if 1 <= people_count < MIN_SESSION_PEOPLE:
                    # 1-5 people, definite 'Omar' folder
                    ai_folder = "Omar"
                    
                elif people_count >= MIN_SESSION_PEOPLE and people_count <= MAX_SESSION_PEOPLE:
                    # 6-10 people, check Indoor/Outdoor rule
                    
                    # 2. AI Classification (Check Scene Type)
                    classification_results = classification_model(filepath, verbose=False)
                    top_classes = classification_results[0].probs.top(5)
                    class_names = [classification_results[0].names[i] for i in top_classes]
                    
                    top_class_id = classification_results[0].probs.top1
                    class_name = classification_results[0].names[top_class_id]
                    
                    scene_type = check_scene_type(class_names)
                    
                    if scene_type == 'Indoor':
                        ai_folder = "Session_Delivery"
                    else:
                        # Outdoor scenes with many people go to general category
                        ai_folder = "KPMG_Offices" 
                        
                elif people_count > MAX_SESSION_PEOPLE:
                    # Implausibly high count, assume detection error/clutter
                    ai_folder = "KPMG_Offices" 
                    
                else: # people_count == 0
                    # 0 people, check for plants/scenery
                    classification_results = classification_model(filepath, verbose=False)
                    top_classes = classification_results[0].probs.top(5)
                    class_names = [classification_results[0].names[i] for i in top_classes]
                    
                    top_class_id = classification_results[0].probs.top1
                    class_name = classification_results[0].names[top_class_id]
                    
                    scene_type = check_scene_type(class_names) # Log scene type even here

                    is_plant = any("plant" in name or "flower" in name or "tree" in name for name in class_names)
                    
                    if is_plant:
                        ai_folder = "Plants"
                    else:
                        ai_folder = "KPMG_Offices" 
                        
                # 3. GPS/City Lookup
                city, lat, lon = extract_gps_and_city(filepath)
                
                # 4. Write to CSV
                writer.writerow({
                    'filename': filename,
                    'AI_Folder': ai_folder,
                    'Offline_City': city,
                    'People_Count': people_count,
                    'Top_Class_ID': top_class_id,
                    'Top_Class_Name': class_name,
                    'GPS_Latitude': lat,
                    'GPS_Longitude': lon,
                    'Scene_Type': scene_type
                })

            except Exception as e:
                # Log errors for files that failed processing entirely
                with open("metadata_error_log.txt", "a") as err_f:
                    err_f.write(f"{filename} (AI/Processing Error): {e}\n")
                
if __name__ == "__main__":
    check_and_load_models()
    scrape_and_summarize()
    print(f"\n✅ Processing complete. Review results in '{SUMMARY_FILE}'.")