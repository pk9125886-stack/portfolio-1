import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Integrate with EmailJS, Resend, or Nodemailer in production
    console.log("[Contact Form]", { name, email, message, timestamp: new Date().toISOString() });

    return NextResponse.json({ success: true, message: "Message received" });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
