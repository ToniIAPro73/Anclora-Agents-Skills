import os
import shutil
import logging
import re

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
logger = logging.getLogger(__name__)

# Base paths
BASE_DIR = r"c:\Users\Usuario\Workspace\01_Proyectos\ecosistema-digital-anclora"
SOURCE_FOLDERS = ["videos"]  # Temporarily processing only videos folder

# Destination mappings
BRAND_FOLDERS = {
    "MATRIZ": os.path.join(BASE_DIR, "00-Anclora (Matriz)", "Assets"),
    "PRIVATE": os.path.join(BASE_DIR, "01-Private Estates", "assets"),
    "COGNITIVE": os.path.join(BASE_DIR, "02-Cognitive Solutions", "Assets"),
}

# Classification keywords
KEYWORDS = {
    "MATRIZ": ["anclora", "nexus", "group", "matriz", "corporativo", "holding", "logo_anclora"],
    "PRIVATE": ["private", "estates", "luxury", "villa", "mallorca", "son vida", "andratx", "property", "alquiler", "rent", "inmobiliaria"],
    "COGNITIVE": ["cognitive", "solutions", "ai", "ia", "data", "lab", "tech", "digital", "software", "tecnologia", "consultoria"],
}

def classify_file(filename):
    """Classifies a file based on its name."""
    name_lower = filename.lower()
    
    # Simple keyword matching
    scores = {brand: 0 for brand in KEYWORDS}
    for brand, kw_list in KEYWORDS.items():
        for kw in kw_list:
            if kw in name_lower:
                scores[brand] += 1
                
    # Determine the best match
    best_brand = None
    max_score = 0
    for brand, score in scores.items():
        if score > max_score:
            max_score = score
            best_brand = brand
        elif score == max_score and score > 0:
            # Tie case - mark as uncertain
            return None
            
    if max_score > 0:
        return best_brand
    
    return None

def organize_assets(dry_run=True, max_files=50):
    """Main function to scan and organize assets.
    
    Args:
        dry_run: If True, only shows what would be done without moving files
        max_files: Maximum number of files to process (default: 50)
    """
    logger.info(f"Starting asset organization (Dry Run: {dry_run}, Max Files: {max_files})")
    
    files_processed = 0
    stats = {"MATRIZ": 0, "PRIVATE": 0, "COGNITIVE": 0, "DUDA": 0}
    
    for folder in SOURCE_FOLDERS:
        source_path = os.path.join(BASE_DIR, folder)
        if not os.path.exists(source_path):
            logger.warning(f"Source folder not found: {source_path}")
            continue
            
        logger.info(f"Scanning folder: {folder}")
        
        for root, dirs, files in os.walk(source_path):
            for file in files:
                if files_processed >= max_files:
                    logger.warning(f"Reached max file limit ({max_files}). Stopping.")
                    break
                    
                source_file = os.path.join(root, file)
                brand = classify_file(file)
                
                if brand:
                    dest_dir = BRAND_FOLDERS[brand]
                    dest_file = os.path.join(dest_dir, file)
                    logger.info(f"[{files_processed+1}/{max_files}] Classified: {file} -> {brand}")
                    stats[brand] += 1
                    
                    if not dry_run:
                        if not os.path.exists(dest_dir):
                            os.makedirs(dest_dir, exist_ok=True)
                        
                        # Handle filename collisions
                        if os.path.exists(dest_file):
                            base, ext = os.path.splitext(file)
                            dest_file = os.path.join(dest_dir, f"{base}_clash{ext}")
                        
                        shutil.move(source_file, dest_file)
                        logger.info(f"Moved: {file} to {dest_dir}")
                else:
                    new_name = f"[DUDA_ANALISIS]_{file}"
                    logger.warning(f"[{files_processed+1}/{max_files}] Uncertain: {file} -> Marking as duda")
                    stats["DUDA"] += 1
                    
                    if not dry_run:
                        os.rename(source_file, os.path.join(root, new_name))
                
                files_processed += 1
            
            if files_processed >= max_files:
                break
        
        if files_processed >= max_files:
            break
    
    # Print summary
    logger.info("\n" + "="*50)
    logger.info("SUMMARY")
    logger.info("="*50)
    logger.info(f"Files processed: {files_processed}")
    logger.info(f"  - Anclora Matriz: {stats['MATRIZ']}")
    logger.info(f"  - Private Estates: {stats['PRIVATE']}")
    logger.info(f"  - Cognitive Solutions: {stats['COGNITIVE']}")
    logger.info(f"  - Marked as DUDA: {stats['DUDA']}")
    logger.info("="*50)
    
    if dry_run:
        logger.info("\n⚠️  DRY RUN MODE - No files were actually moved")
        logger.info("To execute for real, run: organize_assets(dry_run=False)")

if __name__ == "__main__":
    # Safe default: dry run with limit of 50 files
    # To run for real: organize_assets(dry_run=False, max_files=100)
    organize_assets(dry_run=True, max_files=50)
