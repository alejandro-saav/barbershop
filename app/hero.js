import Image from "next/image";
import heroImg from "@/public/images/fondo.jpg";
import { permanent_marker, roboto } from "./fonts";
export default function Hero() {
  return (
    <div className="h-[90%] w-screen relative">
      {/* <img src="../../public/fondo.jpg" className="h-full w-full opacity-30" /> */}
      <Image src={heroImg} fill className="opacity-30" />
      <h1
        className={`absolute top-1/4 right-1/2 translate-x-1/2 translate-y-1/4 text-3xl ${permanent_marker.className}`}
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
        className={`absolute top-1/3 right-1/2 translate-x-1/2 translate-y-1/4 text-3xl ${permanent_marker.className}`}
      >
        Descubre el{" "}
        <span className={`${permanent_marker.className} text-yellow-400`}>
          poder
        </span>{" "}
        de un corte impecable.
      </h1>
      <button
        className={`absolute top-1/2 right-1/2 text-yellow-500 translate-x-1/2 translate-y-1/4 text-2xl px-6 py-2 bg-slate-950 rounded-full hover:bg-slate-950 border-2 border-white hover:text-yellow-500 transition-all ease-in duration-200 ${roboto.className}`}
      >
        Reserva tu cita!
      </button>
    </div>
  );
}
