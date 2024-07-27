import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchProductos() {
  noStore();

  try {
    const data = await sql`SELECT * FROM productos`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchServiciosYBarberos() {
  noStore();
  try {
    const servicios = await sql`SELECT * FROM servicios`;
    const barberos = await sql`SELECT * FROM barberos`;
    return { servicios: servicios.rows, barberos: barberos.rows };
  } catch (error) {
    console.log("Database Error:", error);
    throw new Error("Error al traer los servicios o barberos.");
  }
}

export async function fetchDisponibilidadHorarios(id_barbero, diaSeleccionado) {
  noStore();
  try {
    const horariosOcupados =
      await sql`SELECT TO_CHAR(fecha_cita, 'HH24:MI') AS hora_cita FROM citas WHERE id_barbero = ${id_barbero} AND EXTRACT(DAY FROM fecha_cita) = ${diaSeleccionado};`;
    return horariosOcupados.rows;
  } catch (error) {
    console.log("Database Error:", error);
    throw new Error("Error al consultar disponibilidad de horarios.");
  }
}

export async function insertarCita(datosCita) {
  try {
    // Perform the insert operation and return the ID
    const result = await sql`
      INSERT INTO citas (correo_cliente, fecha_cita, id_estado, id_barbero, referencia_pago) 
      VALUES (${datosCita.email}, ${datosCita.fecha}, 1, ${datosCita.id_barbero}, ${datosCita.referencia_pago}) 
      RETURNING id;
    `;

    // Retrieve the ID of the newly inserted row
    const idNuevaCita = result.rows[0].id;
    return idNuevaCita;
  } catch (error) {
    console.error("Error inserting cita:", error);
    throw new Error("Error inserting cita");
  }
}
