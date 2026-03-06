import os
import sys
import argparse
import subprocess

# Paths to existing skills
SKILL_MD_TO_HTML = "skills/md-to-html/scripts/convert_md_to_html.py"
SKILL_TOC_GEN = "skills/md-toc-word-generator/scripts/generate_md_toc.py"

def run_script(script_path, args):
    cmd = [sys.executable, script_path] + args
    print(f"Running: {' '.join(cmd)}")
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"Error running {script_path}: {result.stderr}")
        return False
    return True

def find_cover(filename, covers_dir):
    name_upper = filename.upper()
    lang = "ES"
    if "_EN" in name_upper: lang = "EN"
    elif "_DE" in name_upper: lang = "DE"
    
    doc_type = "PROPUESTA"
    if "ANEXO" in name_upper: doc_type = "ANEXO"
    elif "PLAN" in name_upper: doc_type = "PLAN"
    elif "RESUMEN" in name_upper: doc_type = "RESUMEN"
    elif "ROI" in name_upper: doc_type = "ROI"
    
    cover_name = f"{doc_type}_{lang}.jpg"
    cover_path = os.path.join(covers_dir, cover_name)
    if os.path.exists(cover_path):
        return cover_path
    return os.path.join(covers_dir, f"{doc_type}_ES.jpg")

def process_document(md_file, base_dir, covers_dir, output_dir):
    abs_md = os.path.abspath(md_file)
    basename = os.path.splitext(os.path.basename(md_file))[0]
    
    # 1. Generate HTML
    html_file = os.path.join(os.path.dirname(abs_md), f"{basename}.html")
    if not run_script(SKILL_MD_TO_HTML, [abs_md, html_file]):
        return False
        
    # 2. Generate TOC (as reference or text)
    # The current TOC generator creates a .docx, we can use the logic 
    # but the browser subagent will need the text or be instructed to merge.
    # For GDocs assembly, let's ensure the TOC exist.
    indices_dir = os.path.join(base_dir, "triumph-renta-mallorca-SEO", "pro_indices")
    if not run_script(SKILL_TOC_GEN, ["--input", abs_md, "--output_dir", indices_dir]):
        return False
    
    cover_path = find_cover(basename, covers_dir)
    print(f"Assets ready for {basename}. Optimized for Browser Assembly.")
    return {
        "html_path": html_file,
        "toc_path": os.path.join(indices_dir, f"{basename}_INDICE.docx"),
        "cover_path": cover_path,
        "basename": basename
    }

# This script prepares assets. The actual "Browser Assembly" step 
# is handled by the AI model invoking the browser subagent with these paths.
if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True)
    parser.add_argument("--covers", required=True)
    parser.add_argument("--output", required=True)
    args = parser.parse_args()
    
    base_proj_dir = os.getcwd()
    
    if os.path.isfile(args.input):
        result = process_document(args.input, base_proj_dir, args.covers, args.output)
        if result:
            print(f"ASSEMBLY_DATA:{result}")
    else:
        # Process directory logic here if needed
        pass
