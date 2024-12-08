// pages/api/session.js
import { NextResponse } from "next/server";
import { checkUserExist } from "@/app/lib/data";
import bcrypt from "bcrypt";
import { generateTokens, setTokens } from "@/app/lib/tokenManagement";

export async function POST(res) {
  try {
    const { email, password } = await res.json();
    const userExist = await checkUserExist(email);
    if (!userExist.success) {
      return NextResponse.json({
        status: 409,
        message:
          "Error interno, por favor revise su conexion a internet e intente nuevamente.",
      });
    }
    const { id, correo, password_hash, role, salt, nombre } = userExist.data;
    const isPasswordValid = await bcrypt.compare(
      password + salt,
      password_hash
    );
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      return NextResponse.json({
        status: 409,
        message:
          "Usuario o contraseña incorrectos, por favor intente nuevamente.",
      });
    }

    const tokenInfo = {
      nombre,
      correo,
      userId: id,
      role,
    };

    const { accessToken, refreshToken } = await generateTokens(tokenInfo);
    setTokens(accessToken, refreshToken);
    return NextResponse.json({
      status: 201,
      message: "Usuario logeado correctamente",
      user: {
        role,
        nombre,
        correo,
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "Internal server error" });
  }
}
