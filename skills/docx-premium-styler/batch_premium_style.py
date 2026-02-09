import os
import sys
import shutil
from pathlib import Path
from resources.premium_styler import apply_premium_style

def process_directory(source_dir, output_dir):
    source_path = Path(source_dir)
    output_path = Path(output_dir)
    
    if not source_path.exists():
        print(f"Error: Directory {source_dir} not found.")
        return
        
    output_path.mkdir(exist_ok=True)
    
    files = list(source_path.glob("*.docx"))
    print(f"Found {len(files)} files to style.")
    
    for f in files:
        target = output_path / f.name.replace(".docx", "_Premium.docx")
        print(f"Styling: {f.name} -> {target.name}...")
        try:
            apply_premium_style(f, target)
            print(f"  [SUCCESS] Professional formatting applied.")
        except Exception as e:
            print(f"  [ERROR] Failed to process {f.name}: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        # Default for the project
        s_dir = "triumph-renta-mallorca-SEO/Entregables_v2.0_Final"
        o_dir = "triumph-renta-mallorca-SEO/Entregables_v3.0_Premium"
    else:
        s_dir = sys.argv[1]
        o_dir = sys.argv[2]
        
    process_directory(s_dir, o_dir)
