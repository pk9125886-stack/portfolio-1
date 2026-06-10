import { NextResponse } from "next/server";
import { fetchGitHubUser } from "@/lib/github";

export async function GET() {
  const user = await fetchGitHubUser();
  if (!user) {
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
  return NextResponse.json(user);
}
