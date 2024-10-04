import { redirect } from "next/navigation";
import { roboto } from "../fonts";
import { checkUserExist } from "../lib/data";
import { verify } from "@node-rs/argon2";
import { lucia } from "../lib/auth";
import { cookies } from "next/headers";
export default async function Login() {
  return (
    <div className="w-screen flex justify-center mt-20">
      <div className="">
        <form
          className="bg-[#181818] border-2 border-yellow-500 p-6 h-[23rem] flex flex-col gap-5 rounded-lg shadow-orange-600 shadow-inner"
          action={loginAccess}
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
          <button
            className={`${roboto.className} font-bold text-lg bg-orange-600 hover:bg-orange-700 px-16 py-2 rounded-lg`}
          >
            Iniciar Sesion
          </button>
        </form>
      </div>
    </div>
  );
}

async function loginAccess(formData) {
  "use server";
  const correo = formData.get("correo");
  const password = formData.get("password");
  if (typeof correo !== "string" || correo.length < 3 || correo.length > 31) {
    return {
      error: "Usuario no valido",
    };
  }
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return {
      error: "Contraseña no valida",
    };
  }

  try {
    const usuario = await checkUserExist(correo);
    console.log("USUARIO:", usuario);
    if (!usuario) {
      return {
        error: "Usuario o contraseña incorrectos",
      };
    }

    const validPassword = await verify(usuario.password_hash, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });
    if (!validPassword) {
      return {
        error: "Usuario o contraseña incorrectos",
      };
    }

    const session = await lucia.createSession(usuario.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (e) {
    console.log("ERROR FUNCION LOGIN CATCH: ", e);
    return {
      error: "An unknown error occurred",
    };
  }
  return redirect("/dashboard");
}
