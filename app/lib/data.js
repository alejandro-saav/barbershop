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

export async function fetchDisponibilidadHorarios(
  id_barbero,
  fechaSeleccionada
) {
  noStore();
  try {
    const horariosOcupados =
      await sql`SELECT c.id, TO_CHAR(c.fecha_cita, 'HH24:MI') AS hora_cita, cs.id_servicio FROM citas c JOIN citas_servicios cs ON c.id = cs.id_cita WHERE c.id_barbero = ${id_barbero} AND c.fecha_cita::date = ${fechaSeleccionada};`;
    // await sql`SELECT TO_CHAR(fecha_cita, 'HH24:MI') AS hora_cita FROM citas WHERE id_barbero = ${id_barbero} AND EXTRACT(DAY FROM fecha_cita) = ${fechaSeleccionada};`;
    return horariosOcupados.rows;
  } catch (error) {
    console.log("Database Error:", error);
    throw new Error("Error al consultar disponibilidad de horarios.");
  }
}

// try {
//   const result = await sql`
//     INSERT INTO citas (correo_cliente, fecha_cita, id_estado, id_barbero, referencia_pago)
//     VALUES (${datosCita.email}, ${datosCita.fecha}, 1, ${datosCita.id_barbero}, ${datosCita.referencia})
//     RETURNING id;
//   `;
//   const idNuevaCita = result.rows[0].id;
//   return idNuevaCita;
// } catch (error) {
//   console.error("Error inserting cita:", error);
//   throw new Error("Error inserting cita");
// }
// export async function insertarCita(datosCita) {
//   const { email, fecha, id_barbero, referencia, servicios } = datosCita;
//   const client = await sql.connect();

//   try {
//     // Begin the transaction
//     await client.query("BEGIN");

//     // Insert the appointment into the database and get the new ID
//     const result = await client.query(`
//       INSERT INTO citas (correo_cliente, fecha_cita, id_estado, id_barbero, referencia_pago)
//       VALUES (${email}, ${fecha}, 1, ${id_barbero}, ${referencia})
//       RETURNING id;
//     `);

//     const idNuevaCita = result.rows[0].id;

//     // Insert associated services
//     for (const id_servicio of servicios) {
//       await client.query(`
//         INSERT INTO citas_servicios (id_cita, id_servicio)
//         VALUES (${idNuevaCita}, ${id_servicio});
//       `);
//     }

//     // Commit the transaction
//     await client.query("COMMIT");

//     return idNuevaCita;
//   } catch (error) {
//     // Rollback the transaction in case of an error
//     await client.query("ROLLBACK");
//     console.error("Error inserting cita:", error);
//     throw new Error("Error inserting cita");
//   } finally {
//     // Release the client back to the pool
//     client.release();
//   }
// }
export async function insertarCita(datosCita) {
  const { email, fecha, id_barbero, referencia, servicios } = datosCita;
  const client = await sql.connect();

  try {
    // Begin the transaction
    await client.query("BEGIN");

    // Insert the appointment into the database and get the new ID
    const result = await client.query(
      `
      INSERT INTO citas (correo_cliente, fecha_cita, id_estado, id_barbero, referencia_pago) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING id;
    `,
      [email, fecha, 1, id_barbero, referencia]
    );

    const idNuevaCita = result.rows[0].id;

    // Insert associated services
    for (const id_servicio of servicios) {
      await client.query(
        `
        INSERT INTO citas_servicios (id_cita, id_servicio) 
        VALUES ($1, $2);
      `,
        [idNuevaCita, id_servicio]
      );
    }

    // Commit the transaction
    await client.query("COMMIT");

    return idNuevaCita;
  } catch (error) {
    // Rollback the transaction in case of an error
    await client.query("ROLLBACK");
    console.error("Error inserting cita:", error);
    throw new Error("Error inserting cita");
  } finally {
    // Release the client back to the pool
    await client.release();
  }
}

export async function checkAndInsertUser({ nombre, correo, password, salt }) {
  // noStore();
  console.log(
    "CHECKANDINSERUSER FUNCTION CALLING:",
    nombre,
    correo,
    password,
    salt
  );
  try {
    // Check if the user exists
    const result = await sql`
      SELECT correo FROM "user"
      WHERE correo = ${correo}
    `;
    console.log("RESULT:", result);
    if (result.rows.length > 0) {
      // User exists
      return {
        success: false,
        message: "User already exists",
      };
    } else {
      // User doesn't exist, insert new user
      const insertResult = await sql`
        INSERT INTO "user" (correo, password_hash, role, salt, nombre)
        VALUES (${correo}, ${password}, 'user', ${salt}, ${nombre})
        RETURNING id
      `;

      return {
        success: true,
        message: "New user inserted",
        userId: insertResult.rows[0],
      };
    }
  } catch (error) {
    console.error("Error checking/inserting user:", error);
    return { success: false, message: "Error processing request" };
  }
}

export async function checkUserExist(correo) {
  try {
    const result = await sql`SELECT * FROM "user" WHERE correo = ${correo}`;
    console.log("checkUserExist result:", result.rows);
    if (result.rows.length > 0) {
      return { data: result.rows[0], success: true };
    } else {
      return { error: "Usuario ya existe.", success: false };
    }
  } catch (error) {
    console.log("Database error: ", error);
    return { error: null, success: false };
  }
}
