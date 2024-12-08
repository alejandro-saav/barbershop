import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { checkUserExist, checkAndInsertUser } from "@/app/lib/data";
import bcrypt from "bcrypt";
import { generateTokens, setTokens } from "@/app/lib/tokenManagement";

export async function POST(res) {
  try {
    console.log("INSERT USER CALLING");
    const { nombre, correo, password } = await res.json();

    const userExist = await checkUserExist(correo);
    console.log("NEW USER DATA:", userExist);
    if (userExist.success) {
      return NextResponse.json({ status: 409, message: "user already exists" });
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password + salt, saltRounds);
    const newUser = {
      nombre,
      correo,
      password: hashPassword,
      salt,
    };
    const newUserResponse = await checkAndInsertUser(newUser);
    console.log("newUserResponse:::::", newUserResponse);
    const tokenInfo = {
      nombre,
      correo,
      userId: newUserResponse.id,
      role: newUserResponse.role,
    };
    const { accessToken, refreshToken } = await generateTokens(tokenInfo);
    setTokens(accessToken, refreshToken);
    return NextResponse.json({
      status: 201,
      message: "User created successfully",
      user: {
        role: newUserResponse.role,
        nombre,
        correo,
      },
    });
  } catch (error) {
    console.log("EEEEERRRRROOOOORR:", error);
    return NextResponse.json({ status: 500, message: "Internal server error" });
  }
}
