---
name: playwright-skill
description: Complete browser automation with Playwright. Auto-detects dev servers, writes clean test scripts to /tmp. Test pages, fill forms, take screenshots, check responsive design, validate UX, test login flows, check links, automate any browser task. Use when user wants to test websites, automate browser interactions, validate web functionality, or perform any browser-based testing.
---

# Playwright Browser Automation

General-purpose browser automation skill. I'll write custom Playwright code for any automation task you request and execute it via the universal executor.

**CRITICAL WORKFLOW - Follow these steps in order:**

1. **Auto-detect dev servers** - For localhost testing, ALWAYS run server detection FIRST:

   ```bash
   cd $SKILL_DIR && node -e "require('./lib/helpers').detectDevServers().then(servers => console.log(JSON.stringify(servers)))"
   ```

   - If **1 server found**: Use it automatically, inform user
   - If **multiple servers found**: Ask user which one to test
   - If **no servers found**: Ask for URL or offer to help start dev server

2. **Write scripts to /tmp** - NEVER write test files to skill directory; always use `/tmp/playwright-test-*.js`

3. **Use visible browser by default** - Always use `headless: false` unless user specifically requests headless mode

4. **Parameterize URLs** - Always make URLs configurable via environment variable or constant at top of script

## How It Works

1. You describe what you want to test/automate
2. I auto-detect running dev servers (or ask for URL if testing external site)
3. I write custom Playwright code in `/tmp/playwright-test-*.js` (won't clutter your project)
4. I execute it via: `cd $SKILL_DIR && node run.js /tmp/playwright-test-*.js`
5. Results displayed in real-time, browser window visible for debugging
6. Test files auto-cleaned from /tmp by your OS

## Setup (First Time)

```bash
cd $SKILL_DIR
npm run setup
```

This installs Playwright and Chromium browser. Only needed once.

## Execution Pattern (Simplified)

**Step 1: Write test script to /tmp**

```javascript
// /tmp/playwright-test-page.js
const { chromium } = require('playwright');
const TARGET_URL = 'https://docs.openclaw.ai/'; 

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(TARGET_URL);
  console.log('Page loaded:', await page.title());
  await browser.close();
})();
```

**Step 2: Execute**

```bash
node /tmp/playwright-test-page.js
```

## Common Patterns

### Check for Sidebars and Links

```javascript
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://docs.openclaw.ai/');
  
  const links = await page.evaluate(() => {
    const sidebar = document.querySelector('aside, .sidebar, nav, #sidebar');
    if (!sidebar) return [];
    return Array.from(sidebar.querySelectorAll('a'))
      .map(a => a.href)
      .filter(href => href.startsWith('http'));
  });
  
  console.log(links.join('\n'));
  await browser.close();
})();
```

## Notes

- This skill expects Playwright to be installed in the environment.
- Use `headless: false` to see the browser in action.
- Always use `waitForSelector` for dynamic content.
