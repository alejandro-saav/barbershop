import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

// Secret keys - these should be stored in environment variables
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

// Token generation function
export async function generateTokens(tokenInfo) {
  // Create access token (short-lived)
  const accessToken = await new SignJWT(tokenInfo)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("15m")
    .sign(new TextEncoder().encode(ACCESS_TOKEN_SECRET));

  // Create refresh token (long-lived)
  const refreshToken = await new SignJWT(tokenInfo)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(new TextEncoder().encode(REFRESH_TOKEN_SECRET));

  return { accessToken, refreshToken };
}

// Verify access token
export async function verifyAccessToken(token) {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(ACCESS_TOKEN_SECRET)
    );
    return payload;
  } catch (error) {
    console.log(error);
    if (error.name === "JWTExpired") {
      return { error: "Token expired" };
    }
    return { error: "Invalid token" };
  }
}

// Verify refresh token
export async function verifyRefreshToken(token) {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(REFRESH_TOKEN_SECRET)
    );
    return payload;
  } catch (error) {
    return null;
  }
}

// Set tokens in cookies
export async function setTokens(accessToken, refreshToken) {
  const cookieStore = await cookies();

  // Set access token as an HTTP-only, secure cookie
  cookieStore.set("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60, // 15 minutes
    path: "/",
  });

  // Set refresh token as an HTTP-only, secure cookie
  cookieStore.set("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  });
}

// Clear tokens
export async function clearTokens() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
}

//* Get user Data from cookies
export async function getUserDataFromCookies() {
  const cookieStore = await cookies();
  const accessTokenCookie = cookieStore.get("access_token");
  let userCookieData = null;
  if (accessTokenCookie) {
    userCookieData = await verifyAccessToken(accessTokenCookie.value);
    delete userCookieData.exp;
    delete userCookieData.userId;
  } else {
    const refreshTokenCookie = cookieStore.get("refresh_token");
    if (refreshTokenCookie) {
      userCookieData = await verifyRefreshToken(refreshTokenCookie.value);
      delete userCookieData.exp;
      delete userCookieData.userId;
      const { accessToken, refreshToken } = await generateTokens(
        userCookieData
      );
      setTokens(accessToken, refreshToken);
    }
  }
  return userCookieData;
}
