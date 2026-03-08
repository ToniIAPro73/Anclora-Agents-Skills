---
name: notebooklm-territorial-auditor
description: A highly specialized skill designed to audit and optimize a Territorial Intelligence NotebookLM workspace (specifically focused on Southwest Mallorca Real Estate, Luxury Market, Tourism, and Urban Development).
license: Apache-2.0
metadata:
  version: "1.0"
  capabilities: ["notebooklm-auditing", "real-estate-analysis", "data-consolidation", "prospecting-optimization"]
---

# NotebookLM Territorial Auditor (Southwest Mallorca)

This skill provides a structured workflow for auditing and refining the NotebookLM notebook named **"Inteligencia Territorial Suroeste Mallorca 2026"**. 

The primary goal is to transform the notebook into a strictly practical and data-driven knowledge base focused exclusively on **Real Estate Opportunities**, **Luxury Market Trends**, **Tourism Impact**, and **Urban Development Signals** in Southwest Mallorca.

## 🎯 Core Objectives

1. **Source Reliability**: Strictly retain and highlight content regarding official data (Idealista, Fotocasa, Registradores, IBESTAT, INE, AENA) and luxury reports (Knight Frank, Savills, JLL).
2. **Geographical Focus**: Filter out any content that is not relevant to Southwest Mallorca (Palma, Son Vida, Portals Nous, Punta Negra, Costa d'en Blanes, Santa Ponsa, Palmanova, Andratx).
3. **Application & Practicality**: Ensure the notebook acts as an expert Real Estate Advisor to provide practical advice, investment opportunity detection, and predictive signals for prospecting.
4. **Noise Reduction**: Eliminate duplicate content, fluff, and any generalist real estate advice that lacks local data backing.

## 🛠️ Step-by-Step Execution Plan

### Step 1: Source Auditing & Pruning (Geography & Duplicate Filter)
1. Use NotebookLM to list all uploaded sources within the notebook.
2. **Redundancy Elimination**: Identify overlapping data (e.g., extracting multiple news articles about the same hotel opening). Keep only the most comprehensive and data-rich version.
3. **Relevance Filtering (Topic & Geography)**: Scan sources for relevance. If a source focuses primarily on mainland Spain or unrelated markets without practical application to the Southwest Mallorca luxury market, remove it.

### Step 2: Custom Instructions Configuration (System Prompting)
To ensure NotebookLM responds correctly, update the notebook's Custom Instructions (System Prompt) or Guide to the following:

> **System Instructions:**
> You are an elite Real Estate Intelligence Analyst specializing in the Southwest Mallorca Luxury Market. Your knowledge base is strictly derived from the provided local reports, demographic data, and urban development signals.
> 
> *   **Role**: Provide highly practical, data-driven, and actionable real estate advice for an independent eXp agent.
> *   **Tone**: Professional, analytical, objective, and territory-focused.
> *   **Tasks**: 
>     1. Answer analytical queries about price trends, buyer profiles, and investment ROI in Southwest Mallorca.
>     2. Offer concrete predictive signals (e.g., new infrastructure leading to price appreciation) to guide proactive prospecting.
>     3. Propose strategic approaches for Value-Add and Patrimonial investments based on current data.
> *   **Constraint**: If asked about unrelated territories or general concepts not backed by data, firmly redirect to the core data of Southwest Mallorca. Never invent data; always cite the provided sources.

### Step 3: Content Structuring & Synthesis (The "Master Briefing")
Create a set of "Pinned Notes" or a master guide document inside the notebook to anchor the AI's generation capabilities. Extract and synthesize:
- **Territorial Signals**: A timeline of upcoming infrastructure, marina, and hotel projects mapped to specific micro-markets.
- **Micro-Market Profiles**: Key characteristics, median prices, and buyer demographics for each specific area (Son Vida, Andratx, etc.).
- **Prospecting Triggers**: Specific data points (e.g., rental prices outpacing sales, off-market transaction volume) that indicate a buying or selling opportunity.

### Step 4: Verification Queries (Testing the Audit)
Run the following test queries against the notebook to ensure the audit was successful.
- *Test 1 (Predictive)*: "Based on the recent luxury hotel developments and infrastructure plans, which micro-market in Southwest Mallorca presents the best Value-Add opportunity for the next 18 months?"
- *Test 2 (Audit)*: "What is the average price per square meter in Madrid?" (Expected output: Refusal / Redirect to Southwest Mallorca data).
- *Test 3 (Strategy)*: "Create a 3-paragraph pitch for a German HNWI buyer interested in a patrimonial investment in Portals Nous, citing current market data."
