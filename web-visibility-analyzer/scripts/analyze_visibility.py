import os
import sys
import argparse
import re

"""
Web Visibility Analyzer Script
Automates basic SEO, GEO, and CRO checks for a given HTML file or project directory.
"""

class VisibilityAnalyzer:
    def __init__(self, target_path):
        self.target_path = target_path
        self.results = {
            "p0": [],
            "p1": [],
            "p2": [],
            "p3": []
        }

    def analyze_file(self, file_path):
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        # --- SEO Checks ---
        if not re.search(r'<title>.*?</title>', content, re.IGNORECASE):
            self.results["p0"].append(f"[{os.path.basename(file_path)}] Missing <title> tag.")
        
        if not re.search(r'<h1.*?>.*?</h1>', content, re.IGNORECASE):
            self.results["p0"].append(f"[{os.path.basename(file_path)}] Missing H1 tag.")

        if not re.search(r'<meta name="description"', content, re.IGNORECASE):
            self.results["p1"].append(f"[{os.path.basename(file_path)}] Missing meta description.")

        # --- GEO Checks ---
        if not re.search(r'id=["\'](tldr|summary)["\']', content, re.IGNORECASE) and not "summary" in content.lower()[:1000]:
            self.results["p1"].append(f"[{os.path.basename(file_path)}] No clear TL;DR or summary found in the first 1000 characters (GEO signal).")

        if not re.search(r'application/ld\+json', content, re.IGNORECASE):
            self.results["p1"].append(f"[{os.path.basename(file_path)}] Missing Schema Markup (JSON-LD).")

        # --- CRO Checks ---
        if not re.search(r'property=["\']og:', content, re.IGNORECASE):
            self.results["p2"].append(f"[{os.path.basename(file_path)}] Missing OpenGraph (OG) tags for social visibility.")

    def run(self):
        if os.path.isfile(self.target_path):
            self.analyze_file(self.target_path)
        elif os.path.isdir(self.target_path):
            for root, dirs, files in os.walk(self.target_path):
                for file in files:
                    if file.endswith(('.html', '.htm', '.php', '.jsx', '.tsx')):
                        self.analyze_file(os.path.join(root, file))
        else:
            print(f"Error: Path {self.target_path} not found.")
            return

        self.print_report()

    def print_report(self):
        print("# Visibility Analysis Report")
        print(f"Target: {self.target_path}\n")

        for p in ["p0", "p1", "p2", "p3"]:
            if self.results[p]:
                print(f"## {p.upper()} - Priority Issues")
                for issue in self.results[p]:
                    print(f"- {issue}")
                print("")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Analyze website visibility (SEO/GEO/CRO).")
    parser.add_argument("path", help="Path to a file or directory to analyze.")
    args = parser.parse_args()

    analyzer = VisibilityAnalyzer(args.path)
    analyzer.run()
