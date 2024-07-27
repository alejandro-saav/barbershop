import { NextResponse } from "next/server";
import { insertarCita } from "@/app/lib/data";

export async function POST(request) {
  const datosCita = await request.json();
  try {
    const citaId = await insertarCita(datosCita);
    return NextResponse.json({ citaId }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "Error al intentar programar cita." },
      { status: 500 }
    );
  }
}
