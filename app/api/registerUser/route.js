import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(res) {
  try {
    const { nombre, correo, password } = await res.json();
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500 });
  }
}
