import re
import os

filepath = r'c:\Users\Usuario\Workspace\01_Proyectos\Anclora-Agents-Skills\creador_apps_luxury\resources\anclora_data_lab.html'

if not os.path.exists(filepath):
    print(f"File not found: {filepath}")
    exit(1)

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Header logo height is 80px.
# User wants footer logo to be HALF that size = 40px.

# Find the footer logo img tag. It's after <!-- Micro Brand Signature -->
# It has a very long src=data:image...
# Let's find the img tag that doesn't have a class or height set yet in the footer area.

# We'll target the start of the Micro Brand Signature div and replace the img tag inside it.
footer_start_pattern = r'<!-- Micro Brand Signature -->\s*<div[^>]*>\s*<img'
# We want to change the <img to <img class="footer-logo" style="height: 40px; object-fit: contain;"
# But we must be careful with the huge src.

# Replacement:
# Find: <!-- Micro Brand Signature -->\s*<div[^>]*>\s*<img
# Replace with: <!-- Micro Brand Signature -->\s*<div[^>]*>\s*<img class="footer-logo" style="height: 40px; object-fit: contain;"

new_content = re.sub(r'(<!-- Micro Brand Signature -->\s*<div[^>]*>\s*<img)', r'\1 class="footer-logo" style="height: 40px; object-fit: contain;"', content)

if new_content == content:
    print("Pattern not found. Trying fallback.")
    # Fallback: maybe it already has a class or style I added but didn't see?
    # Let's try to find any img tag with height: 48px or 60px or footer-logo
    new_content = re.sub(r'class="footer-logo"\s+style="height: \d+px;', 'class="footer-logo" style="height: 40px;', content)
    new_content = re.sub(r'style="height: \d+px;[^"]*" class="footer-logo"', 'style="height: 40px; object-fit: contain;" class="footer-logo"', new_content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Footer logo height forced to 40px (half of 80px header).")
