import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  verifyRefreshToken,
  generateTokens,
  setTokens,
} from "@/app/lib/tokenManagement";

export async function POST(res) {
  try {
    // Get refresh token from cookies
    const cookieStore = await cookies();
    const refreshTokenCookie = cookieStore.get("refresh_token");

    if (!refreshTokenCookie) {
      return NextResponse.json({
        status: 401,
        message: "Unauthorized",
      });
    }

    // Verify refresh token
    const payload = await verifyRefreshToken(refreshTokenCookie.value);

    if (!payload || !payload.userId) {
      return NextResponse.json({
        status: 401,
        message: "Invalid refresh token",
      });
    }

    // Generate new access and refresh tokens
    const { accessToken, refreshToken } = await generateTokens(payload.userId);

    // Set new tokens in cookies
    setTokens(accessToken, refreshToken);

    return NextResponse.json({
      status: 200,
      message: "Tokens refreshed successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
    });
  }
}
