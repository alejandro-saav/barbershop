"use client";
import curlLeft from "@/public/images/curlLeft.svg";
import curlRight from "@/public/images/curlRight.svg";
import Image from "next/image";
import { permanent_marker, roboto } from "./fonts";
import corteIMG from "@/public/images/corte.jpg";
import barbaIMG from "@/public/images/barba.jpg";
import afeitarIMG from "@/public/images/afeitar.jpg";
import tratamientoIMG from "@/public/images/tratamientoCapilar.jpg";
import { useState } from "react";

export default function Servicios() {
  const [servicioSeleccionado, setServicioSeleccionado] = useState(0);
  const images = [corteIMG, barbaIMG, afeitarIMG, tratamientoIMG];
  const servicios = [
    {
      servicio: "Corte de cabello",
      descripcion:
        "Estilos modernos y clásicos, adaptados a las preferencias del cliente.",
    },
    {
      servicio: "Afeitado",
      descripcion: "Afeitado tradicional con navaja y toalla caliente.",
    },
    {
      servicio: "Arreglo de barba",
      descripcion: "Recorte y diseño de barba para mantenerla bien cuidada.",
    },
    {
      servicio: "Tratamientos capilares",
      descripcion:
        "Servicios de cuidado del cabello como lavados y tratamientos de hidratación.",
    },
  ];
  return (
    <div className="w-full">
      <div
        className={`${permanent_marker.className} flex w-full justify-around`}
      >
        <Image src={curlLeft} />
        <h1 className="ml-5 mt-5 text-4xl">Nuestros servicios</h1>
        <Image src={curlRight} />
      </div>
      <div className={`${roboto.className} flex px-14 w-full`}>
        <div className="w-full p-5">
          <p className={`ml-4 mb-4 px-5 text-[#dddddd]`}>
            Ofrecemos cortes de pelo modernos, afeitados clásicos, arreglos de
            barba y tratamientos de cuidado capilar en un ambiente relajado y
            profesional, brindando una experiencia de barbería excepcional para
            hombres de todas las edades.
          </p>
          <div className="grid grid-rows-2 grid-cols-2 justify-items-center content-center gap-10">
            {servicios.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`bg-[#181818] p-4 w-52 rounded-lg border-2 border-[#000000] shadow-2xl cursor-pointer hover:border-white ${
                    index === servicioSeleccionado ? "border-white" : ""
                  } transition-all ease-linear`}
                  onClick={() => setServicioSeleccionado(index)}
                >
                  <h1 className="font-bold">{item.servicio}</h1>
                  <p className="text-sm mt-2 text-[#cccccc]">
                    {item.descripcion}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full p-5 px-16 flex justify-start">
          <Image
            src={images[servicioSeleccionado]}
            alt={`Imagen de ${servicios[servicioSeleccionado]}`}
            className="object-fill w-96 h-96 rounded-lg border-4 border-[#a16a1b] shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}
