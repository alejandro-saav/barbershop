import { fetchDisponibilidadHorarios } from "@/app/lib/data";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id_barbero = searchParams.get("id_barbero");
    const diaSeleccionado = searchParams.get("diaSeleccionado");

    if (!id_barbero || !diaSeleccionado) {
      return new Response(JSON.stringify({ message: "Parametros invalidos" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const horariosOcupados = await fetchDisponibilidadHorarios(
      id_barbero,
      diaSeleccionado
    );
    console.log(horariosOcupados);

    return new Response(JSON.stringify({ data: horariosOcupados }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error al consultar disponibilidad de horarios:", error);
    return new Response(
      JSON.stringify({
        message: "Error al consultar disponibilidad de horarios.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
