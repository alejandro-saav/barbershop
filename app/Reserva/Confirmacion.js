"use client";
import axios from "axios";
import { useState, useRef } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { cambiarFormato12a24 } from "./UtilityFunctions";

export default function Home({
  diaSeleccionado,
  horaSeleccionada,
  id_barbero,
  servicios,
  checkedItems,
}) {
  // const emailRef = useRef();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const serviciosIds = servicios
    .filter((item, index) => checkedItems[index] === true)
    .map((item) => item.id);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit("");
    const referencia = e.target[0].value;
    const email = e.target[1].value;

    ///* PA BORRAR DESPUES
    const hora = cambiarFormato12a24(horaSeleccionada);
    const now = new Date();
    const year = now.getFullYear();
    const diaHoy = now.getDate();
    let month = now.getMonth() + 1;
    if (diaSeleccionado >= 1 && diaSeleccionado <= 4 && diaHoy > 4) {
      month += 1;
    }
    const fecha = `${year}-${String(month).padStart(2, "0")}-${String(
      diaSeleccionado
    ).padStart(2, "0")} ${hora}`;
    const datosCita = {
      email,
      fecha,
      id_barbero,
      referencia,
      servicios: serviciosIds,
    };
    async function insertarNuevaCita() {
      try {
        const response = await fetch("/api/insertarCita", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(datosCita),
        });
        if (response.ok) {
          const { citaId } = await response.json();
          console.log(citaId);
        }
      } catch (error) {
        console.log(error);
      }
    }
    insertarNuevaCita();
    ///*-------------------------------------------------------

    if (!executeRecaptcha) {
      console.log("not available to execute recaptcha");
      return;
    }

    const gRecaptchaToken = await executeRecaptcha("inquirySubmit");

    const response = await axios({
      method: "post",
      url: "/api/recaptchaSubmit",
      data: {
        gRecaptchaToken,
      },
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });

    if (response.data.success === true) {
      setSubmit("Verificado y enviado!");
      const emailResponse = await axios({
        method: "post",
        url: "/api/sendEmail",
        data: {
          email: "oacastro999@gmail.com",
          subject: "Subject test",
          message: "Message test",
        },
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });
      if (emailResponse.ok) {
        /// SEND DATA TO DB
        /// Data needed email, day and hour, id_barbero, referencia_pago, servicios
        // const hora = cambiarFormato12a24(horaSeleccionada);
        // const now = new Date();
        // const year = now.getFullYear();
        // const month = now.getMonth() + 1;
        // const timestampString = `${year}-${String(month).padStart(
        //   2,
        //   "0"
        // )}-${String(diaSeleccionado).padStart(2, "0")} ${hora}`;
        // const datosCita = { email };
      }
    } else {
      setSubmit("Error! intenta de nuevo");
    }
  };

  const [submit, setSubmit] = useState("");
  return (
    <main>
      <h1 className="text-xl text-center">
        Porfavor realiza tu pago a la siguiente cuenta de nequi: 3002515632.
        Escribe la referencia en el cuadro de abajo para finalizar el proceso y
        tu email donde se enviara la confirmacion de la cita programada.
      </h1>
      <br />
      <form
        className="flex flex-col justify-start items-center gap-4"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="referencia"
          placeholder="Escribe la referencia aqui"
          className="border p-4 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Escribe tu email aqui:"
          className="border p-4 rounded"
          required
        />
        <input
          type="submit"
          className="border px-10 py-1 text-lg rounded bg-orange-700 cursor-pointer m-2"
        />
      </form>
      {submit && <p className="text-lg text-center">{submit}</p>}
    </main>
  );
}
