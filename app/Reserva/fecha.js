"use client";
import { roboto } from "../fonts";
import { useState } from "react";
import {
  getHalfHourIntervals,
  formatTime,
  calculateEndTimes,
  removeBookedHours,
} from "./UtilityFunctions";

// const horas = getHalfHourIntervals();
export default function Fecha({
  setTiempo,
  id_barbero,
  diaSeleccionado,
  setDiaSeleccionado,
  horaSeleccionada,
  setHoraSeleccionada,
  servicios,
}) {
  //* Por cada id_cita -> calcular hora final -> quitar horas de array horas
  const [horas, setHoras] = useState(getHalfHourIntervals());
  const diaDeLaSemana = new Date().getDay();
  const diaNumero = new Date();
  const mesHoy = new Date().getMonth();
  const ano = new Date().getFullYear();
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
  const dias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];
  let siguientesCincoDias = [];
  for (let i = 0; i <= 5; i++) {
    siguientesCincoDias.push(dias[(diaDeLaSemana + i) % 7]);
  }
  // const horas = getHalfHourIntervals();
  async function consultarDisponibilidadHorarios(
    id_barbero,
    fechaSeleccionada
  ) {
    const response = await fetch(
      `/api/fetchDisponibilidadHorarios?${new URLSearchParams({
        id_barbero,
        fechaSeleccionada,
      })}`
    );

    if (response.ok) {
      const { data } = await response.json();
      let duracion = 0;
      data.map((item) => {
        servicios.find((servicio) =>
          servicio.id === item.id_servicio
            ? (duracion += servicio.duracion)
            : ""
        );
      });
      const result = calculateEndTimes(data, servicios);
      if (result.length > 0) {
        setHoras(removeBookedHours(horas, result));
      }
    } else {
      console.log("Error al consultar la disponibilidad de horarios");
    }
  }

  function obtenerCincoDiasSiguientes(numeroSiguiente) {
    const fechaHoy = new Date();
    fechaHoy.setDate(fechaHoy.getDate() + numeroSiguiente);
    return fechaHoy.getDate();
  }
  function obtenerFechaDiaSeleccionado(indexSeleccionado) {
    const fechaHoy = new Date();
    fechaHoy.setDate(fechaHoy.getDate() + indexSeleccionado);
    const formatedDate = `${fechaHoy.getFullYear()}-${
      fechaHoy.getMonth() + 1
    }-${fechaHoy.getDate()}`;
    return formatedDate;
  }
  return (
    <div className={`${roboto.className} mt-4 font-thin`}>
      <h1 className="text-white text-sm">
        {meses[mesHoy]} {ano}
      </h1>
      <div className="flex justify-around px-10 mt-2">
        {siguientesCincoDias.map((item, index) => (
          <div
            className={`flex flex-col justify-center items-center cursor-pointer group`}
            key={index}
            onClick={() => {
              setDiaSeleccionado((prev) =>
                prev === obtenerCincoDiasSiguientes(index)
                  ? null
                  : obtenerCincoDiasSiguientes(index)
              );
              consultarDisponibilidadHorarios(
                id_barbero,
                obtenerFechaDiaSeleccionado(index)
              );
            }}
          >
            <div
              className={`w-16 cursor-pointer text-center py-4 rounded-md mb-2 shadow-sm shadow-black   ${
                obtenerCincoDiasSiguientes(index) === diaSeleccionado
                  ? "bg-orange-500"
                  : "bg-[#151515]"
              }`}
            >
              {obtenerCincoDiasSiguientes(index)}
            </div>
            <div className="text-orange-500 font-bold group-hover:text-orange-700">
              {item.slice(0, 3)}
            </div>
          </div>
        ))}
      </div>
      <div
        className={`h-96 overflow-auto mt-4 ${
          diaSeleccionado != null ? "block" : "hidden"
        }`}
      >
        {horas.map((item, index) => {
          return (
            <div
              className={`w-full border-2 px-4 py-4 shadow-md shadow-black mb-2 cursor-pointer flex justify-between hover:bg-[#181818] ${
                item === horaSeleccionada
                  ? "bg-[#181818] border-orange-300"
                  : "border-orange-500 bg-[#242424]"
              }`}
              key={index}
              onClick={() => {
                setHoraSeleccionada((prev) => (prev === item ? null : item));
                setTiempo((prev) => (prev === item ? "" : item));
              }}
            >
              <span>{item}</span>
              <div className="mr-5">
                <input
                  type="checkbox"
                  readOnly
                  checked={item === horaSeleccionada}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
