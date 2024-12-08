"use client";
import { roboto } from "../fonts";
import { useState } from "react";
import { GoAlert } from "react-icons/go";
import { useRouter } from "next/navigation";
import { useUser } from "../lib/userContext";

export default function Login() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, setUser } = useUser();
  console.log(user);
  async function handleLogin(e) {
    e.preventDefault();

    try {
      setError(null);
      setLoading(true);
      const email = e.target[0].value;
      const password = e.target[1].value;
      const res = await fetch("/api/loginUser", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
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
        setError(response.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Un error inesperado ha ocurrido. Por favor intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="w-screen flex justify-center mt-20">
      <div className="">
        <form
          className="bg-[#181818] border-2 border-yellow-500 p-6 flex flex-col gap-5 rounded-lg shadow-orange-600 shadow-inner"
          onSubmit={handleLogin}
        >
          <h1
            className={`text-center ${roboto.className} text-4xl mt-6 text-amber-600`}
          >
            Bienvenido
          </h1>
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
          {error && (
            <p className="text-red-700 flex justify-center items-center gap-4">
              {" "}
              <GoAlert className="text-2xl" />
              {error}
            </p>
          )}
          {!loading ? (
            <button
              className={`${roboto.className} font-bold text-lg bg-orange-600 hover:bg-orange-700 px-16 py-2 rounded-lg`}
              type="submit"
            >
              Iniciar Sesion
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
              Iniciando Sesion...
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

// async function loginAccess(formData) {
//   "use server";
//   const correo = formData.get("correo");
//   const password = formData.get("password");
//   if (typeof correo !== "string" || correo.length < 3 || correo.length > 31) {
//     console.log("primer error");
//     return {
//       error: "Usuario no valido",
//     };
//   }
//   if (
//     typeof password !== "string" ||
//     password.length < 6 ||
//     password.length > 255
//   ) {
//     console.log("Contraseña mal");
//     return {
//       error: "Contraseña no valida",
//     };
//   }

//   try {
//     const usuario = await checkUserExist(correo);
//     console.log("USUARIO:", usuario);
//     if (!usuario) {
//       return {
//         error: "Usuario o contraseña incorrectos",
//       };
//     }

//     const validPassword = await verify(usuario.password_hash, password, {
//       memoryCost: 19456,
//       timeCost: 2,
//       outputLen: 32,
//       parallelism: 1,
//     });
//     if (!validPassword) {
//       return {
//         error: "Usuario o contraseña incorrectos",
//       };
//     }

//     const session = await lucia.createSession(usuario.id, {});
//     const sessionCookie = lucia.createSessionCookie(session.id);
//     cookies().set(
//       sessionCookie.name,
//       sessionCookie.value,
//       sessionCookie.attributes
//     );
//   } catch (e) {
//     console.log("ERROR FUNCION LOGIN CATCH: ", e);
//     return {
//       error: "An unknown error occurred",
//     };
//   }
//   return redirect("/dashboard");
// }
