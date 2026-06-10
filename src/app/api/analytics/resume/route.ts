import { NextResponse } from "next/server";

let downloadCount = 0;

export async function POST() {
  downloadCount += 1;
  console.log(`[Resume Analytics] Total downloads: ${downloadCount}`);
  return NextResponse.json({ success: true, count: downloadCount });
}

export async function GET() {
  return NextResponse.json({ count: downloadCount });
}
