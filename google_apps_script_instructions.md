# Google Apps Script Setup & Deployment Guide

This guide describes how to connect your Google Sheet to your portfolio contact form.

## Step 1: Open Apps Script Editor
1. Open your Google Sheet: [Google Sheet Link](https://docs.google.com/spreadsheets/d/1FT5BEhQTbIzO6JCtw8ecZ8FUwudNlVcxu1ZTP3Rw67c/edit)
2. In the top menu, click on **Extensions** -> **Apps Script**.

## Step 2: Paste the Code
1. In the Apps Script editor, delete any existing boilerplate code (like `function myFunction() { }`).
2. Open the file [google_apps_script.js](google_apps_script.js) in your codebase.
3. Copy all of the code from [google_apps_script.js](google_apps_script.js) and paste it into the Apps Script editor.
4. Click the **Save** icon (floppy disk) or press `Ctrl + S` (`Cmd + S` on Mac).

## Step 3: Deploy as a Web App
1. Click the **Deploy** button in the top right corner, then select **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in the deployment details:
   - **Description**: `Portfolio Contact Form API`
   - **Execute as**: Select **Me (your-email@gmail.com)**
   - **Who has access**: Select **Anyone** (this is necessary so your server-side API can send submissions without needing OAuth user login).
4. Click **Deploy**.

## Step 4: Authorize Access
1. You will be prompted to authorize access. Click **Authorize access**.
2. Select your Google account.
3. Google will show an "Advanced" warning because the app is unverified (it is your own script). Click **Advanced** at the bottom, then click **Go to Untitled project (unsafe)** or similar name.
4. Review the permissions (it will read and write to your Google Sheets) and click **Allow**.

## Step 5: Copy the URL
1. Once deployed, Google will display a screen with the **Web app URL**.
2. Copy this URL (it will look like `https://script.google.com/macros/s/AKfycb.../exec`).
3. Save this URL into your environment file (`.env.local`) as `GOOGLE_SCRIPT_URL`:
   ```env
   GOOGLE_SCRIPT_URL="https://script.google.com/macros/s/AKfycb.../exec"
   ```

---

## Security Best Practices Built-In

1. **Email Privacy**: The `doGet()` function completely excludes the `Email` column when sending data back to the portfolio frontend. This ensures your visitors' email addresses are never exposed to the public.
2. **Next.js Server Proxy**: The web app URL is kept secret inside `.env.local` on the server. The frontend client only communicates with `/api/contact`, hiding your Google script link from spam scrapers and bots.
3. **Honeypot Protection**: A hidden field in the HTML contact form will catch automated spam bots. If a bot fills in this field, the server silently drops the request.
4. **IP Rate Limiting**: The Next.js API route rate-limits clients to prevent automated script spam.
