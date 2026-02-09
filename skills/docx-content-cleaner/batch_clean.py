import os
import sys
import shutil
from pathlib import Path
from resources.markdown_to_docx_fixer import clean_docx

def process_directory(source_dir, output_dir):
    source_path = Path(source_dir)
    output_path = Path(output_dir)
    
    if not source_path.exists():
        print(f"Error: Directory {source_dir} not found.")
        return
        
    output_path.mkdir(exist_ok=True)
    
    files = list(source_path.glob("*.docx"))
    print(f"Found {len(files)} files to process.")
    
    for f in files:
        target = output_path / f.name
        # Copy first to maintain original structure and metadata if fix doesn't change anything
        shutil.copy2(f, target)
        
        print(f"Cleaning: {f.name}...")
        try:
            if clean_docx(target, target):
                print(f"  [FIXED] Markdown removed and formatted.")
            else:
                print(f"  [OK] No markdown artifacts detected.")
        except Exception as e:
            print(f"  [ERROR] Failed to process {f.name}: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        # Default for the current project context
        s_dir = "triumph-renta-mallorca-SEO/Entregables_v1.0"
        o_dir = "triumph-renta-mallorca-SEO/Entregables_v2.0_Final"
    else:
        s_dir = sys.argv[1]
        o_dir = sys.argv[2]
        
    # Adjust paths if running from skill root or project root
    # For this specific task, we'll run it from the project root
    process_directory(s_dir, o_dir)
