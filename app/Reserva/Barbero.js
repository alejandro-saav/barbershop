"use client";
import Image from "next/image";
import { useState } from "react";
import { IoIosPeople } from "react-icons/io";
import { CldImage } from "next-cloudinary";

export default function Barbero({ barberos, checkedBarber, setCheckedBarber }) {
  return (
    <div className="grid grid-cols-3 gap-y-6 w-full mt-4">
      {barberos.map((item, index) => {
        return (
          <div
            className={`flex flex-col justify-center items-center shadow-md rounded-lg p-2 shadow-slate-800 mx-2 cursor-pointer hover:bg-slate-950 group select-none ${
              checkedBarber != "" &&
              item.id_barbero === checkedBarber[0].id_barbero
                ? "text-orange-500 font-bold border-2 border-orange-500 bg-slate-950"
                : "bg-slate-900"
            }`}
            key={index}
            onClick={() => {
              setCheckedBarber([item]);
            }}
          >
            <div className="border-2 border-orange-500 w-20 h-20 flex justify-center items-center rounded-full shadow-md shadow-orange-500 mb-1 relative">
              {item.id_imagen === null ? (
                <IoIosPeople className="text-3xl" />
              ) : (
                <CldImage
                  fill
                  src={item.id_imagen}
                  className="rounded-full group-hover:contrast-125"
                  alt={`Foto del barbero ${item.nombre_barbero}`}
                />
              )}
            </div>
            <h1 className="text-center">{item.nombre_barbero}</h1>
          </div>
        );
      })}
    </div>
  );
}
