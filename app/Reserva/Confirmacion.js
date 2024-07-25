"use client";
import axios from "axios";
import { useState, useRef } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function Home() {
  // const emailRef = useRef();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit("");

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
      console.log(emailResponse);
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
