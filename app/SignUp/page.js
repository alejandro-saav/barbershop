"use client";
import { roboto } from "../fonts";
import { useState } from "react";
import { GoAlert } from "react-icons/go";
import { useRouter } from "next/navigation";
import { useUser } from "../lib/userContext";
export default function SignUp() {
  const [disbledButton, setDisabledButton] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useUser();
  async function handleSignUp(e) {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const nombre = e.target[0].value;
      const correo = e.target[1].value;
      const password = e.target[2].value;
      const passwordConfirm = e.target[3].value;
      if (password != passwordConfirm) {
        setError("Las contraseñas no coinciden, intenta otra vez");
        setLoading(false);
        return;
      }
      const res = await fetch("/api/registerUser", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ nombre, correo, password }),
      });
      const response = await res.json();
      if (response.status === 201) {
        setUser(response.user);
        if (response.user.role == "user") {
          router.push("/Historial");
        } else {
          router.push("/dashboard");
        }
      } else {
        setError("response.message");
      }
    } catch (error) {
      console.error("Sign up error:", error);
      setError("Un error inesperado ha ocurrido. Por favor intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="w-screen flex justify-center mt-11">
      <div className="">
        <form
          className="bg-[#181818] border-2 border-yellow-500 w-96 p-6 flex flex-col gap-5 rounded-lg shadow-orange-600 shadow-inner"
          onSubmit={handleSignUp}
        >
          <h1
            className={`text-center ${roboto.className} text-4xl mt-6 text-amber-600`}
          >
            Crear cuenta
          </h1>
          <div className="flex flex-col">
            <label htmlFor="correo" className="text-lg">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              placeholder="Nombre"
              required
              className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 focus:placeholder:opacity-100"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="correo" className="text-lg">
              Correo
            </label>
            <input
              type="email"
              name="correo"
              id="correo"
              placeholder="Correo"
              required
              className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 focus:placeholder:opacity-100"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-lg">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Contraseña"
              required
              className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 focus:placeholder:opacity-100"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="confirmar_contrasea" className="text-lg">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              placeholder="Confirmar Contraseña"
              required
              className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 focus:placeholder:opacity-100"
            />
          </div>
          {error && (
            <p className="text-red-700 flex justify-center items-center gap-4">
              <GoAlert className="text-2xl" />
              {error}
            </p>
          )}
          {!loading ? (
            <button
              className={`${roboto.className} font-bold text-lg bg-orange-600 hover:bg-orange-700 px-16 py-2 rounded-lg`}
              type="submit"
            >
              Confirmar
            </button>
          ) : (
            <button
              className={`${roboto.className} font-bold text-lg text-black bg-gray-400 px-16 py-2 rounded-lg flex justify-start items-center cursor-not-allowed`}
              type="submit"
              disabled
            >
              <svg
                class="animate-spin  h-4 w-4 mr-12 bg-zinc-800"
                viewBox="0 0 5 5"
              ></svg>
              Cargando
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

// async function signup(formData) {
//   "use server";
//   // console.log(_, formData);
//   const username = formData.get("correo");
//   // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
//   // keep in mind some database (e.g. mysql) are case insensitive
//   // if (
//   //   typeof username !== "string" ||
//   //   username.length < 3 ||
//   //   username.length > 31 ||
//   //   !/^[a-z0-9_-]+$/.test(username)
//   // ) {
//   //   return {
//   //     error: "Correo Invalido",
//   //   };
//   // }
//   const password = formData.get("password");
//   if (
//     typeof password !== "string" ||
//     password.length < 6 ||
//     password.length > 255
//   ) {
//     return {
//       error: "Contraseña no valida",
//     };
//   }

//   const passwordHash = await hash(password, {
//     // recommended minimum parameters
//     memoryCost: 19456,
//     timeCost: 2,
//     outputLen: 32,
//     parallelism: 1,
//   });
//   const userId = generateId(15);

//   try {
//     // db.prepare(
//     //   "INSERT INTO user (id, username, password_hash) VALUES(?, ?, ?)"
//     // ).run(userId, username, passwordHash);
//     const resultado = await checkAndInsertUser(userId, username, passwordHash);

//     const session = await lucia.createSession(userId, {});
//     const sessionCookie = lucia.createSessionCookie(session.id);
//     cookies().set(
//       sessionCookie.name,
//       sessionCookie.value,
//       sessionCookie.attributes
//     );
//   } catch (e) {
//     // if (!resultado.success) {
//     //   return resultado.message;
//     // }
//     console.log(e);
//     return {
//       error: "An unknown error occurred",
//     };
//   }
//   return redirect("/dashboard");
// }
