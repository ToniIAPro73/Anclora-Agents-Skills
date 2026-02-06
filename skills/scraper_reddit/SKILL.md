---
name: Reddit Scraper
description: Scrapes the top 5 posts from any specified subreddit and displays them in a table.
---

# Reddit Scraper

Use this skill to quickly see what's trending in a specific community on Reddit.

## Instructions

1.  **Select Subreddit**: Ask the user for the name of the subreddit they want to crawl.
2.  **Run Scraper**: Use the `run_command` tool to execute the scraping script:
    ```bash
    python "c:/Users/Usuario/Workspace/01_Proyectos/Habilidades de Agentes/scraper_reddit/scripts/reddit_scraper.py" [subreddit_name]
    ```
3.  **Process Output**: Parse the JSON output from the script.
4.  **Display Results**: Format the results into a Markdown table with the following columns:
    - **Title**
    - **Author**
    - **Score**
    - **Link**

## Example Table Format

| Title | Author | Score | Link |
| :--- | :--- | :--- | :--- |
| Example Post Title | u/example_user | 1200 | [Link](https://reddit.com/...) |
