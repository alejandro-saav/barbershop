import Image from "next/image";
import heroImg from "@/public/images/fondo.jpg";
import test1 from "@/public/images/test1.jpg";
import { permanent_marker, roboto } from "./fonts";
export default function Hero() {
  return (
    <div className="h-screen w-full relative opacity-80">
      {/* <img src="../../public/fondo.jpg" className="h-full w-full opacity-30" /> */}
      <div className="h-[90%] w-full">
        <Image src={test1} fill className="object-cover" />
      </div>
      {/* <h1
        className={`bg-zinc-700 p-2 opacity-100 absolute top-1/4 right-1/2 translate-x-1/2 translate-y-1/4 text-3xl ${permanent_marker.className}`}
      >
        Transforma tu{" "}
        <span className={`${permanent_marker.className} text-yellow-400`}>
          estilo
        </span>
        . Eleva tu{" "}
        <span className={`${permanent_marker.className} text-yellow-400`}>
          confianza
        </span>
        .
      </h1>
      <h1
        className={`bg-zinc-700 p-2 opacity-100 absolute top-1/3 right-1/2 translate-x-1/2 translate-y-1/4 text-3xl ${permanent_marker.className}`}
      >
        Descubre el{" "}
        <span className={`${permanent_marker.className} text-yellow-400`}>
          poder
        </span>{" "}
        de un corte impecable.
      </h1>
      <button
        className={`absolute top-1/2 right-1/2 text-yellow-500 translate-x-1/2 translate-y-1/4 text-2xl px-6 py-2 bg-slate-950 rounded-full hover:bg-slate-800 border-2 border-white hover:text-yellow-500 transition-all ease-in duration-200 ${roboto.className}`}
      >
        Reserva tu cita!
      </button> */}
      <h5
        className={`contrast-125 p-2 opacity-100 absolute top-28 left-16 translate-y-1/4 text-3xl ${permanent_marker.className} shadow-md`}
      >
        Transforma tu{" "}
        <span className={`${permanent_marker.className} text-yellow-400`}>
          estilo
        </span>
        . Eleva tu{" "}
        <span className={`${permanent_marker.className} text-yellow-400`}>
          confianza
        </span>
        .
      </h5>
      <h5
        className={`contrast-125 p-2 opacity-100 absolute top-36 left-16 translate-y-1/4 text-3xl ${permanent_marker.className} shadow-md`}
      >
        Descubre el{" "}
        <span className={`${permanent_marker.className} text-yellow-400`}>
          poder
        </span>{" "}
        de un corte impecable.
      </h5>
      <button
        className={`absolute top-52 left-16 ${roboto.className} font-bold brightness-125 text-xl bg-orange-600 hover:bg-orange-700 px-16 py-2 rounded-lg`}
      >
        Reserva tu cita!
      </button>
    </div>
  );
}
