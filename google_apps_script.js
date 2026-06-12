/**
 * Google Apps Script for Portfolio Contact Form Database
 * 
 * Instructions:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1FT5BEhQTbIzO6JCtw8ecZ8FUwudNlVcxu1ZTP3Rw67c/edit
 * 2. Click on Extensions -> Apps Script.
 * 3. Delete any code in the editor and paste this code.
 * 4. Click Save (disk icon).
 * 5. Click Deploy -> New deployment.
 * 6. Choose "Web app" as type.
 * 7. Set "Execute as" to "Me" (your email).
 * 8. Set "Who has access" to "Anyone".
 * 9. Click Deploy, authorize permissions, and copy the Web App URL.
 * 10. Add the Web App URL to your .env.local file as GOOGLE_SCRIPT_URL.
 */

const SHEET_NAME = "Submissions";

// Helper to get or create sheet with headers
function getSheet() {
  const doc = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = doc.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = doc.insertSheet(SHEET_NAME);
    // Set headers
    sheet.appendRow(["Timestamp", "Name", "Email", "Subject", "Message"]);
    // Format headers (bold and light gray background)
    sheet.getRange(1, 1, 1, 5)
      .setFontWeight("bold")
      .setBackground("#f3f4f6")
      .setFontColor("#111827");
    sheet.setFrozenRows(1);
    
    // Auto fit column widths
    sheet.autoResizeColumns(1, 5);
  }
  return sheet;
}

// Handle GET requests (fetches the latest 5 messages, excluding emails for privacy)
function doGet(e) {
  try {
    const sheet = getSheet();
    const rows = sheet.getDataRange().getValues();
    
    // If only header exists
    if (rows.length <= 1) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        data: []
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const submissions = [];
    
    // Retrieve up to 5 latest records (bottom of the sheet)
    const startIndex = Math.max(1, rows.length - 5);
    for (let i = rows.length - 1; i >= startIndex; i--) {
      const row = rows[i];
      submissions.push({
        timestamp: row[0],
        name: row[1],
        // Exclude email (row[2]) for security & privacy
        subject: row[3],
        message: row[4]
      });
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      data: submissions
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle POST requests (records new contact message)
function doPost(e) {
  try {
    let data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      data = e.parameter;
    }
    
    const { name, email, subject, message } = data;
    
    // Server-side validation inside Apps Script
    if (!name || !email || !subject || !message) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Missing required fields: name, email, subject, and message are all required."
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Invalid email format."
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const sheet = getSheet();
    const timestamp = new Date();
    
    // Append the row
    sheet.appendRow([timestamp, name, email, subject, message]);
    
    // Auto fit column widths to accommodate new values
    sheet.autoResizeColumns(1, 5);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Message recorded successfully"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
