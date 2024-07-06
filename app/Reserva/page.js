"use client";
import { useState } from "react";
import { roboto } from "../fonts";
import Servicios from "./Servicios";
import Barbero from "./Barbero";
import { fotos_barberos } from "@/utilitys/galeriaImages";
import logoIMG from "@/public/images/download3.png";
import Image from "next/image";
import Fecha from "./fecha";
import { MdOutlineDateRange, MdOutlineAccessTime } from "react-icons/md";

export default function Reserva() {
  const [pestana, setPestana] = useState(2);
  const [tiempo, setTiempo] = useState("");

  const diaDeLaSemana = new Date().getDay();
  const diaNumero = new Date().getDate();
  const mesHoy = new Date().getMonth();
  const dias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const servicios = [
    { nombre: "Corte Adulto", tiempo: "60min", precio: "15.000" },
    { nombre: "Clasico o Niño", tiempo: "45min", precio: "14.000" },
    { nombre: "Corte + Barba", tiempo: "30min", precio: "22.000" },
    { nombre: "Corte + Cejas", tiempo: "30min", precio: "17.000" },
    { nombre: "Delineado de Barba", tiempo: "90min", precio: "8.000" },
    { nombre: "Corte + Barba + Cejas", tiempo: "45min", precio: "24.000" },
    { nombre: "Depilacion Cera", tiempo: "30min", precio: "7.000" },
    { nombre: "Oidos * Nariz * Cejas", tiempo: "45min", precio: "4.000" },
    { nombre: "Marco Barba + Cejas", tiempo: "30min", precio: "10.000" },
    { nombre: "Mascarilla", tiempo: "45min", precio: "16.000" },
    { nombre: "Exfoliacion", tiempo: "30min", precio: "25.000" },
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

  function sumTimeByCondition(timesArray, conditionsArray) {
    let totalTime = 0;

    for (let i = 0; i < timesArray.length; i++) {
      if (conditionsArray[i]) {
        const timeStr = timesArray[i].tiempo;
        const timeInMinutes = parseInt(timeStr.replace("min", ""));
        totalTime += timeInMinutes;
      }
    }

    return totalTime;
  }

  const [checkedItems, setCheckedItems] = useState(
    new Array(servicios.length).fill(false)
  );
  const [checkedBarber, setCheckedBarber] = useState("");

  const totalTime = sumTimeByCondition(servicios, checkedItems);
  console.log(totalTime);
  const handleContainerClick = (index) => {
    setCheckedItems((prevCheckedItems) =>
      prevCheckedItems.map((item, i) => (i === index ? !item : item))
    );
  };
  return (
    <div>
      <div>
        <ul className="flex text-sm mt-6 ml-8 gap-2 text-orange-500">
          <li
            className="cursor-pointer"
            onClick={() => {
              setPestana(0);
              setCheckedBarber("");
            }}
          >
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
        <div className="grow w-1/2 h-96 overflow-auto">
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
          {pestana === 1 && (
            <Barbero barberos={barberos} setCheckedBarber={setCheckedBarber} />
          )}
          {pestana === 2 && <Fecha setTiempo={setTiempo} />}
        </div>
        <div
          className={`${roboto.className} grow w-1/2 flex justify-start h-[27rem] `}
        >
          <div className="w-2/4 mt-1 mx-8 p-2 bg-[#181818] border-orange-500 rounded-lg shadow-sm shadow-black">
            <div className="flex justify-center gap-11 border-b-2 border-orange-500 shadow-slate-800">
              <div className="relative w-16 h-12">
                <Image
                  src={logoIMG}
                  fill
                  alt={"Logo de Da corner Barbershop"}
                />
              </div>
              <div>
                <h1 className="text-orange-500 font-bold">
                  Da Corner Barbershop
                </h1>
                <h1 className="text-orange-300">San Carlos</h1>
              </div>
            </div>
            <div className="p-2">
              <div className="flex text-sm gap-2">
                <MdOutlineDateRange />
                <span>
                  {dias[diaDeLaSemana]} {diaNumero} {meses[mesHoy]}
                </span>
              </div>
              <div className="flex text-sm gap-2">
                <MdOutlineAccessTime />
                <span>{tiempo}</span>
              </div>
            </div>
            <div className="overflow-auto p-2 mostrarScrollbar h-64">
              {servicios.map((item, index) => {
                if (checkedItems[index])
                  return (
                    <div className="flex justify-between">
                      <div>
                        <h1 className="font-light text-orange-500">
                          {item.nombre}
                        </h1>
                        <h1 className="font-light text-orange-300">
                          {`${item.tiempo} ${
                            checkedBarber != "" ? "con " : ""
                          }`}{" "}
                          <span className="text-white font-light">
                            {checkedBarber}
                          </span>
                        </h1>
                      </div>
                      <div>{item.precio}</div>
                    </div>
                  );
              })}
            </div>
            <button
              onClick={() => setPestana((prev) => prev + 1)}
              className="w-full px-8 py-2 mt-2 bg-orange-600 rounded-md text-lg font-bold hover:bg-orange-700 transition-all duration-200"
            >
              Siguiente {"->"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
