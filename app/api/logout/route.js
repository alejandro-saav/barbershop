import { NextResponse } from "next/server";
import { clearTokens } from "@/app/lib/tokenManagement";

export async function POST() {
  // Clear cookies
  clearTokens();

  return NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });
}
