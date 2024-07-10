"use client";
import { useState } from "react";
import { roboto } from "../fonts";
import Servicios from "./Servicios";
import Barbero from "./Barbero";
import { fotos_barberos } from "@/utilitys/galeriaImages";
import Fecha from "./fecha";
import BarraNavegacion from "./barraNavegacion";
import PanelDerecho from "./PanelDerecho";
import {
  calculateEndTime,
  sumTimeByCondition,
  calcularTiempoEnHorasMinutos,
} from "./UtilityFunctions";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";
import Confirmacion from "./Confirmacion";

export default function Reserva() {
  const [pestana, setPestana] = useState(2);
  const [tiempo, setTiempo] = useState("");
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

  const [checkedItems, setCheckedItems] = useState(
    new Array(servicios.length).fill(false)
  );
  const [checkedBarber, setCheckedBarber] = useState("");

  const totalTime = sumTimeByCondition(servicios, checkedItems);
  const tiempoEnHorasMinutos = calcularTiempoEnHorasMinutos(totalTime);
  const endTime = calculateEndTime(tiempo, totalTime);
  const handleContainerClick = (index) => {
    setCheckedItems((prevCheckedItems) =>
      prevCheckedItems.map((item, i) => (i === index ? !item : item))
    );
  };
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.SITE_KEY}>
      <div>
        <BarraNavegacion
          pestana={pestana}
          setPestana={setPestana}
          setCheckedBarber={setCheckedBarber}
        />
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
              <Barbero
                barberos={barberos}
                setCheckedBarber={setCheckedBarber}
              />
            )}
            {pestana === 2 && <Fecha setTiempo={setTiempo} />}
            {pestana === 3 && <Confirmacion />}
          </div>
          <PanelDerecho
            tiempo={tiempo}
            setPestana={setPestana}
            servicios={servicios}
            checkedItems={checkedItems}
            checkedBarber={checkedBarber}
            endTime={endTime}
            tiempoEnHorasMinutos={tiempoEnHorasMinutos}
          />
        </div>
      </div>
    </GoogleReCaptchaProvider>
  );
}
