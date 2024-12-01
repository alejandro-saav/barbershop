// pages/api/session.js
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(res) {
  try {
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500 });
  }
}
