"use client";
import { useState } from "react";
import { roboto } from "../fonts";
import Servicios from "./Servicios";
import Barbero from "./Barbero";
import { fotos_barberos } from "@/utilitys/galeriaImages";
import logoIMG from "@/public/images/download3.png";
import Image from "next/image";

export default function Reserva() {
  const [pestana, setPestana] = useState(0);

  const servicios = [
    { nombre: "Corte Adulto", tiempo: "60min", precio: "15.000" },
    { nombre: "Clasico o Niño", tiempo: "60min", precio: "14.000" },
    { nombre: "Corte + Barba", tiempo: "60min", precio: "22.000" },
    { nombre: "Corte + Cejas", tiempo: "60min", precio: "17.000" },
    { nombre: "Delineado de Barba", tiempo: "60min", precio: "8.000" },
    { nombre: "Corte + Barba + Cejas", tiempo: "60min", precio: "24.000" },
    { nombre: "Depilacion Cera", tiempo: "60min", precio: "7.000" },
    { nombre: "Oidos * Nariz * Cejas", tiempo: "60min", precio: "4.000" },
    { nombre: "Marco Barba + Cejas", tiempo: "60min", precio: "10.000" },
    { nombre: "Mascarilla", tiempo: "60min", precio: "16.000" },
    { nombre: "Exfoliacion", tiempo: "60min", precio: "25.000" },
  ];
  const barberos = [
    { foto: "icono", nombre: "Cualquier Especialista" },
    { foto: fotos_barberos[0], nombre: "Dante" },
    { foto: fotos_barberos[1], nombre: "Oskar" },
    { foto: fotos_barberos[2], nombre: "Alejandro" },
    { foto: fotos_barberos[3], nombre: "Johan" },
    { foto: fotos_barberos[4], nombre: "Valentina" },
    { foto: fotos_barberos[5], nombre: "Armando" },
  ];
  const [checkedItems, setCheckedItems] = useState(
    new Array(servicios.length).fill(false)
  );
  const [checkedBarber, setCheckedBarber] = useState(
    new Array(barberos.length).fill(false)
  );

  const handleContainerClick = (index) => {
    setCheckedItems((prevCheckedItems) =>
      prevCheckedItems.map((item, i) => (i === index ? !item : item))
    );
  };

  return (
    <div>
      <div>
        <ul className="flex text-sm mt-6 ml-8 gap-2 text-orange-500">
          <li className="cursor-pointer" onClick={() => setPestana(0)}>
            Servicios {" >"}
          </li>
          <li
            className={`${
              pestana > 0
                ? "text-orange-500 opacity-100 cursor-pointer"
                : "text-orange-200 opacity-40 cursor-auto"
            }`}
            onClick={() => pestana > 0 && setPestana(1)}
          >
            Barbero {" >"}
          </li>
          <li
            className={`${
              pestana > 1
                ? "text-orange-500 opacity-100 cursor-pointer"
                : "text-orange-200 opacity-40 cursor-auto"
            }`}
            onClick={() => pestana > 1 && setPestana(2)}
          >
            Fecha {" >"}
          </li>
          <li
            className={`${
              pestana > 2
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
        <div className="grow w-1/2">
          {pestana === 0 &&
            servicios.map((item, index) => {
              const isChecked = checkedItems[index];
              return (
                <Servicios
                  index={index}
                  isChecked={isChecked}
                  item={item}
                  key={index}
                  handleContainerClick={handleContainerClick}
                />
              );
            })}
          {pestana === 1 && <Barbero barberos={barberos} />}
        </div>
        <div
          className={`${roboto.className} grow w-1/2 flex justify-start h-[27rem] `}
        >
          <div className="w-3/4 mt-1 mx-8 p-4 border-2 border-orange-500 rounded-lg shadow-lg shadow-black">
            <div className="flex justify-center gap-11 shadow-md shadow-slate-800">
              <div className="relative w-16 h-16">
                <Image src={logoIMG} fill />
              </div>
              <div>
                <h1 className="text-orange-500 font-bold">
                  Da Corner Barbershop
                </h1>
                <h1 className="text-orange-300">San Carlos</h1>
              </div>
            </div>
            <div className="mt-8 overflow-y-scroll h-60">
              {servicios.map((item, index) => {
                return (
                  <div className="tarjeta flex justify-between">
                    <div>
                      <h1 className="font-light text-orange-500">
                        {item.nombre}
                      </h1>
                      <h1 className="font-light text-orange-300">
                        {item.tiempo}
                      </h1>
                    </div>
                    <div>{item.precio}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
