$path = "c:\Users\Usuario\Workspace\01_Proyectos\Anclora-Agents-Skills\creador_apps_luxury\resources\anclora_data_lab.html"
$content = Get-Content -Path $path -Raw -Encoding UTF8

# 1. Remove Duplicate Certification Section
# We look for the first occurrence of the section and remove it.
# The structure appears to be: ... </section> [duplicate] <section id="certificaciones" ...
# We'll use a regex to remove the first block if two exist.
$certPattern = '(?s)<div id="certificaciones".*?</div>\s*</section>'
# Note: The ID in the file viewed was on a div in one place (line 631 in Step 1346) or section in another?
# In Step 1371: Line 631 is `<div id="certificaciones" ...>`. Line 665 is `<section id="certificaciones" ...>`.
# Wait, line 631 in Step 1371 shows `<div id="certificaciones" ...`. 
# Line 665 shows `<section id="certificaciones" ...`.
# The previous `write_to_file` script (Step 1336) inserted `<section id="certificaciones" ...` before `</main>`.
# The previous `multi_replace` (Step 1333 - failed) tried to insert a div? No, I need to check Step 1339.
# Step 1339 used `<section id="certificaciones"...`.
# It seems there is a mismatch or a leftover.
# I will remove the first occurrence which seems to be a `div` or `section` at lines 631-663.
# Let's remove the block from line 631 to 663 approx.
# We can match by the specific content start.
$content = $content -replace '(?s)\s*<div id="certificaciones" class="chart-container reveal".*?</div>\s*</div>\s*</section>', '' 
# Actually simpler: The first one starts after `#datalab` section ends.
# Let's target the exact string of the first duplicate. It seems to start with <div id="certificaciones"... at line 631 in View 1371.
# And ends around 663? No, wait. 
# View 1371:
# 630: </section>
# 631: <div id="certificaciones" ...
# ...
# 662: </div>
# 663: </section> <-- This closing section tag might be unmatched if 631 matches a div?
# Ah, looking at 631: `<div id="certificaciones" ...>`
# Looking at 665: `<section id="certificaciones" ...>`
# The first one seems to be valid HTML structure wise if it's inside main, but the user says it's duplicate.
# I will remove the one starting with `<div id="certificaciones"`.

$content = $content -replace '(?s)\s*<div id="certificaciones" class="chart-container reveal".*?</div>\s*</div>', ''

# 2. Insert "Tesis Inversión" Content
# We'll insert it after the hero section (id="tesis").
$tesisContent = '
        <section id="tesis-content" class="thesis-section reveal" style="padding: 60px 10%; background: #05070A;">
            <div class="thesis-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center;">
                <div class="thesis-text">
                    <h2 data-lang="es" style="margin-bottom: 20px;">Filosofía de Inversión</h2>
                    <h2 data-lang="en" style="margin-bottom: 20px;">Investment Philosophy</h2>
                    <h2 data-lang="de" style="margin-bottom: 20px;">Investitionsphilosophie</h2>
                    
                    <p data-lang="es" style="margin-bottom: 15px; color: #a0a0a0; line-height: 1.6;">
                        Nuestra tesis se fundamenta en la <strong>escasez irreproducible</strong> del suelo en primera línea de Mallorca. Identificamos activos "trofeo" infravalorados por ineficiencias de gestión, no por defectos estructurales.
                    </p>
                    <p data-lang="en" style="margin-bottom: 15px; color: #a0a0a0; line-height: 1.6;">
                        Our thesis is grounded in the <strong>irreproducible scarcity</strong> of prime coastline land in Mallorca. We identify "trophy" assets undervalued due to management inefficiencies, not structural defects.
                    </p>
                    <p data-lang="de" style="margin-bottom: 15px; color: #a0a0a0; line-height: 1.6;">
                        Unsere These stützt sich auf die <strong>unwiederbringliche Knappheit</strong> von erstklassigem Küstenland auf Mallorca. Wir identifizieren "Trophy"-Assets, die aufgrund von Managementineffizienzen unterbewertet sind.
                    </p>

                    <ul style="color: var(--anclora-gold); list-style: none; padding: 0;">
                        <li style="margin-bottom: 10px;">✓ <span style="color: #fff">Prime Location Arbitrage</span></li>
                        <li style="margin-bottom: 10px;">✓ <span style="color: #fff">Value-Add through Design</span></li>
                        <li style="margin-bottom: 10px;">✓ <span style="color: #fff">Off-Market Access</span></li>
                    </ul>
                </div>
                <div class="thesis-visual" style="background: rgba(212, 175, 55, 0.05); padding: 30px; border-radius: 8px; border: 1px solid rgba(212, 175, 55, 0.2);">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                        <span style="color: #fff;">Target IRR</span>
                        <span style="color: var(--anclora-gold); font-weight: bold;">15% - 18%</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                        <span style="color: #fff;">MoIC</span>
                        <span style="color: var(--anclora-gold); font-weight: bold;">1.5x - 2.0x</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: #fff;">Hold Period</span>
                        <span style="color: var(--anclora-gold); font-weight: bold;">24 - 36 Months</span>
                    </div>
                </div>
            </div>
        </section>
'
# Insert after the hero section closing tag
$content = $content -replace '</section>\s*<section class="data-grid reveal">', ("</section>`n" + $tesisContent + "`n        <section class=\"data-grid reveal\">")

# 3. Update Menu Link for Tesis
$content = $content -replace 'href="#tesis"', 'href="#tesis-content"'

# 4. Fix Chart Truncation (Port d''Andratx) and Styling
# We update the layout padding in the Chart config.
$newChartScript = '
        function updateCharts(lang) {
            const labels = {
                es: { price: "Precio m²", zones: ["Santa Ponsa", "Bendinat", "Port d''Andratx", "Portals Nous", "Son Vida"] },
                en: { price: "Price sqm", zones: ["Santa Ponsa", "Bendinat", "Port d''Andratx", "Portals Nous", "Son Vida"] },
                de: { price: "Preis m²", zones: ["Santa Ponsa", "Bendinat", "Port d''Andratx", "Portals Nous", "Son Vida"] }
            };

            const l = labels[lang] || labels.es;

            if(evoChart) evoChart.destroy();
            if(benchChart) benchChart.destroy();

            const evoCtx = document.getElementById("evolutionChart").getContext("2d");
            evoChart = new Chart(evoCtx, {
                type: "line",
                data: {
                    labels: ["2023", "2024", "2025 (Fcst)", "2026 (Fcst)"],
                    datasets: [{
                        label: l.price,
                        data: [8200, 9200, 9850, 10600],
                        borderColor: "#D4AF37",
                        borderWidth: 4,
                        tension: 0.45,
                        fill: true,
                        backgroundColor: (context) => {
                            const chart = context.chart;
                            const {ctx, chartArea} = chart;
                            if (!chartArea) return null;
                            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                            gradient.addColorStop(0, "rgba(212, 175, 55, 0.15)");
                            gradient.addColorStop(1, "rgba(212, 175, 55, 0)");
                            return gradient;
                        },
                        pointBackgroundColor: "#FFF",
                        pointBorderColor: "#D4AF37",
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    plugins: { 
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: "#1A252F",
                            titleFont: fontConfig,
                            bodyFont: fontConfig,
                            padding: 15,
                            displayColors: false
                        }
                    },
                    scales: {
                        y: { 
                            grid: { color: "rgba(212, 175, 55, 0.05)" }, 
                            ticks: { color: "rgba(255,255,255,0.5)", font: fontConfig } 
                        },
                        x: { 
                            grid: { display: false }, 
                            ticks: { color: "rgba(255,255,255,0.5)", font: fontConfig } 
                        }
                    }
                }
            });

            const benchCtx = document.getElementById("benchmarkingChart").getContext("2d");
            benchChart = new Chart(benchCtx, {
                type: "bar",
                data: {
                    labels: l.zones,
                    datasets: [{
                        data: [6500, 8400, 9800, 10800, 11500],
                        backgroundColor: (context) => {
                            const chart = context.chart;
                            const {ctx, chartArea} = chart;
                            if (!chartArea) return null;
                            
                            const index = context.dataIndex;
                            const gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
                            
                            if (index === 4) { 
                                gradient.addColorStop(0, "rgba(212, 175, 55, 0.7)");
                                gradient.addColorStop(1, "#D4AF37"); 
                            } else if (index === 3) { 
                                gradient.addColorStop(0, "rgba(197, 160, 89, 0.6)");
                                gradient.addColorStop(1, "#C5A059"); 
                            } else if (index === 2) { 
                                gradient.addColorStop(0, "rgba(220, 200, 100, 0.5)");
                                gradient.addColorStop(1, "#E6C96E"); 
                            } else {
                                gradient.addColorStop(0, "rgba(212, 175, 55, 0.2)");
                                gradient.addColorStop(1, "rgba(212, 175, 55, 0.5)"); 
                            }
                            return gradient;
                        },
                        borderRadius: 4,
                        barPercentage: 0.7,
                        maxBarThickness: 40
                    }]
                },
                options: {
                    indexAxis: "y",
                    responsive: true,
                    layout: {
                        padding: {
                            left: 0, // Chart.js handles axis label space automatically, but if cutoff, we add padding
                            right: 30 // Extra space for value labels or aesthetics
                        }
                    },
                    plugins: { 
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: "#1A252F",
                            titleFont: fontConfig,
                            bodyFont: fontConfig,
                            padding: 12
                        }
                    },
                    scales: {
                        x: { 
                            grid: { color: "rgba(212, 175, 55, 0.05)" }, 
                            ticks: { color: "rgba(255,255,255,0.5)", font: fontConfig } 
                        },
                        y: { 
                            grid: { display: false }, 
                            ticks: { 
                                color: "#FFF", 
                                font: { ...fontConfig, weight: "600", size: 11 },
                                autoSkip: false,
                                padding: 10, // Increase padding between label and axis to ensure space
                                mirror: false // Ensure labels are outside
                            },
                            afterFit: function(scaleInstance) {
                                scaleInstance.width = 120; // Force Y-axis width to accommodate "Port d''Andratx"
                            }
                        }
                    }
                }
            });
        }
'

$pattern = '(?s)function updateCharts\(lang\) \{.*?\}\s+// Init'
$replacement = $newChartScript + "`n        // Init"
$content = [regex]::Replace($content, $pattern, $replacement)

Set-Content -Path $path -Value $content -Encoding UTF8
