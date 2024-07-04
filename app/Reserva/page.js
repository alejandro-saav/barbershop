"use client";
import { useState } from "react";
import { roboto } from "../fonts";

export default function Reserva() {
  const [pestana, setPestana] = useState(0);
  const servicios = [
    {
      nombre: "Corte Adulto",
      tiempo: "60min",
      precio: "15.000",
    },
    {
      nombre: "Clasico o Niño",
      tiempo: "60min",
      precio: "14.000",
    },
    {
      nombre: "Corte + Barba",
      tiempo: "60min",
      precio: "22.000",
    },
    {
      nombre: "Corte + Cejas",
      tiempo: "60min",
      precio: "17.000",
    },
    {
      nombre: "Delineado de Barba",
      tiempo: "60min",
      precio: "8.000",
    },
    {
      nombre: "Corte + Barba + Cejas",
      tiempo: "60min",
      precio: "24.000",
    },
    {
      nombre: "Depilacion Cera",
      tiempo: "60min",
      precio: "7.000",
    },
    {
      nombre: "Oidos * Nariz * Cejas",
      tiempo: "60min",
      precio: "4.000",
    },
    {
      nombre: "Marco Barba + Cejas",
      tiempo: "60min",
      precio: "10.000",
    },
    {
      nombre: "Mascarilla",
      tiempo: "60min",
      precio: "16.000",
    },
    {
      nombre: "Exfoliacion",
      tiempo: "60min",
      precio: "25.000",
    },
  ];
  return (
    <div>
      <div>
        <ul className="flex text-sm mt-6 ml-8 gap-2 text-orange-500">
          <li className="cursor-pointer">Servicios {" >"}</li>
          <li
            className={`${
              pestana > 0
                ? "text-orange-500 opacity-100 cursor-pointer"
                : "text-orange-200 opacity-40 cursor-auto"
            }`}
          >
            Barbero {" >"}
          </li>
          <li
            className={`${
              pestana > 0
                ? "text-orange-500 opacity-100 cursor-pointer"
                : "text-orange-200 opacity-40 cursor-auto"
            }`}
          >
            Fecha {" >"}
          </li>
          <li
            className={`${
              pestana > 0
                ? "text-orange-500 opacity-100 cursor-pointer"
                : "text-orange-200 opacity-40 cursor-auto"
            }`}
          >
            Confirmacion {" >"}
          </li>
        </ul>
      </div>
      <h1
        className={`${roboto.className} text-4xl text-orange-500 ml-6 mt-2 border-b-2 border-orange-500`}
      >
        Servicios
      </h1>
      <div className="flex mx-10">
        <div className="grow">
          {servicios.map((item, index) => {
            return (
              <div
                className={`${roboto.className} mt-4 ml-4 w-2/3 border-2 border-orange-500 p-2 rounded-md shadow-lg shadow-black cursor-pointer hover:contrast-150 hover:border-orange-300`}
              >
                <h1 className="text-orange-500 pl-2 font-bold text-lg">
                  {item.nombre}
                </h1>
                <h4 className="text-sm pl-2">{item.tiempo}</h4>
                <h4 className="text-sm pl-2">{item.precio}</h4>
              </div>
            );
          })}
        </div>
        <div className="grow">2</div>
      </div>
    </div>
  );
}
