import Image from "next/image";
import equipoIMG from "@/public/images/equipo.jpg";
import curlLeft from "@/public/images/curlLeft.svg";
import curlRight from "@/public/images/curlRight.svg";
import { permanent_marker } from "./fonts";

export default function Equipo() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex justify-around w-full mt-10">
        <Image src={curlLeft} />
        <h1 className={`${permanent_marker.className} text-4xl mb-6`}>
          Nuestro Equipo
        </h1>
        <Image src={curlRight} />
      </div>
      <div className="relative h-96 w-2/4 group">
        <button className="absolute right-0 bottom-0 shadow-xl bg-amber-600 px-6 py-3 opacity-80 transition-all duration-300 group-hover:opacity-100 z-30">
          Conoce a nuestro equipo!
        </button>
        <Image
          src={equipoIMG}
          className="rounded-2xl border-4 border-amber-600 object-center h-96 w-full contrast-125 transition-all duration-300 z-50 group-hover:opacity-70"
        />
      </div>
    </div>
  );
}
