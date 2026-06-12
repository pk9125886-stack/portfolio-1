import { NextResponse } from "next/server";

// In-memory rate limiting cache
const ipCache = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const limit = 3; // Max 3 requests
  const windowMs = 60 * 1000; // 1 minute window

  const record = ipCache.get(ip);
  if (!record) {
    ipCache.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (now > record.resetTime) {
    ipCache.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  record.count += 1;
  return record.count > limit;
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";

    // 1. Rate Limiting Check
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute before trying again." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, subject, message, website } = body;

    // 2. Honeypot Spam Prevention
    // If the hidden 'website' field is filled, it is a bot.
    // We return a fake successful response to fool the bot without saving anything.
    if (website && website.trim() !== "") {
      console.warn("[Anti-Spam] Bot detected via honeypot. Ignoring submission.");
      return NextResponse.json({ success: true, message: "Message sent successfully!" });
    }

    // 3. Form Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
    if (!scriptUrl) {
      console.error("[Config Error] GOOGLE_SCRIPT_URL environment variable is missing.");
      return NextResponse.json(
        { error: "Contact service is not configured. Please define GOOGLE_SCRIPT_URL." },
        { status: 500 }
      );
    }

    // 4. Send request to Google Apps Script Web App
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Google Script returned status ${response.status}`);
    }

    const result = await response.json();
    if (result.status === "error") {
      return NextResponse.json({ error: result.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("[Contact API Error]", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
    if (!scriptUrl) {
      console.error("[Config Error] GOOGLE_SCRIPT_URL environment variable is missing.");
      return NextResponse.json(
        { error: "Contact service is not configured. Please define GOOGLE_SCRIPT_URL." },
        { status: 500 }
      );
    }

    // Fetch latest submissions from Google Sheets
    const response = await fetch(scriptUrl, {
      method: "GET",
      // Set cache: "no-store" to ensure we always get fresh messages
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Google Script returned status ${response.status}`);
    }

    const result = await response.json();
    if (result.status === "error") {
      return NextResponse.json({ error: result.message }, { status: 400 });
    }

    // Ensure we sanitize and verify emails are completely excluded
    const sanitizedData = (result.data || []).map((item: any) => ({
      name: item.name || "Anonymous",
      subject: item.subject || "No Subject",
      message: item.message || "",
      timestamp: item.timestamp || new Date().toISOString(),
    }));

    return NextResponse.json({ success: true, data: sanitizedData });
  } catch (error) {
    console.error("[Contact API GET Error]", error);
    return NextResponse.json(
      { error: "Failed to fetch recent messages." },
      { status: 500 }
    );
  }
}
