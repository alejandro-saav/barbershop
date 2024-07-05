"use client";
import Image from "next/image";
import { useState } from "react";
import { IoIosPeople } from "react-icons/io";

export default function Barbero({ barberos }) {
  const [barberoSeleccionado, setBarberoSeleccionado] = useState(null);
  console.log(barberoSeleccionado);
  return (
    <div className="grid grid-cols-3 gap-y-6 w-full mt-4">
      {barberos.map((item, index) => {
        const estaSeleccionada = index === barberoSeleccionado;
        return (
          <div
            className={`flex flex-col justify-center items-center shadow-md rounded-lg p-2 shadow-slate-800 mx-2 cursor-pointer hover:bg-slate-950 group select-none ${
              estaSeleccionada
                ? "text-orange-500 font-bold border-2 border-orange-500 bg-slate-950"
                : "bg-slate-900"
            }`}
            key={index}
            onClick={() => setBarberoSeleccionado(index)}
          >
            <div className="border-2 border-orange-500 w-20 h-20 flex justify-center items-center rounded-full shadow-md shadow-orange-500 mb-1 relative">
              {item.foto === "icono" ? (
                <IoIosPeople className="text-3xl" />
              ) : (
                <Image
                  fill
                  src={item.foto}
                  className="rounded-full group-hover:contrast-125"
                  alt={`Foto del barbero ${item.nombre}`}
                />
              )}
            </div>
            <h1 className="text-center">{item.nombre}</h1>
          </div>
        );
      })}
    </div>
  );
}
