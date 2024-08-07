"use client";
import { roboto } from "../fonts";
import { useState } from "react";

function formatTime(hour, minutes) {
  const period = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12; // Convert to 12-hour format
  const formattedMinutes = minutes.toString().padStart(2, "0");
  return `${formattedHour}:${formattedMinutes}${period}`;
}

function getHalfHourIntervals() {
  const startHour = 10; // 10 AM
  const endHour = 21; // 9 PM (21 in 24-hour format)
  const intervals = [];

  for (let hour = startHour; hour <= endHour; hour++) {
    intervals.push(formatTime(hour, 0)); // Add the full hour (e.g., 10:00 AM)
    if (hour !== endHour) {
      // Add the half-hour (e.g., 10:30 AM), but not after the last full hour (9 PM)
      intervals.push(formatTime(hour, 30));
    }
  }

  return intervals;
}

const horas = getHalfHourIntervals();
export default function Fecha({
  setTiempo,
  id_barbero,
  diaSeleccionado,
  setDiaSeleccionado,
  horaSeleccionada,
  setHoraSeleccionada,
  servicios,
}) {
  const [horasOcupadas, setHorasOcupadas] = useState([]);
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
      console.log("XD");
      setHorasOcupadas(
        data.map((item) =>
          formatTime(
            Number(item.hora_cita.split(":")[0]),
            Number(item.hora_cita.split(":")[1])
          )
        )
      );
      console.log("Disponibilidad de horarios:", data.data);
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
              setDiaSeleccionado(obtenerCincoDiasSiguientes(index));
              consultarDisponibilidadHorarios(
                id_barbero,
                obtenerFechaDiaSeleccionado(index)
              );
            }}
          >
            <div
              className={`w-16 cursor-pointer text-center py-4 rounded-full mb-2 shadow-sm shadow-black  group-hover:bg-[#262626]  ${
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
          if (!horasOcupadas.includes(item))
            return (
              <div
                className={`w-full border-2 px-4 py-4 shadow-md shadow-black mb-2 cursor-pointer flex justify-between hover:bg-[#181818] ${
                  item === horaSeleccionada
                    ? "bg-[#181818] border-orange-300"
                    : "border-orange-500 bg-[#242424]"
                }`}
                key={index}
                onClick={() => {
                  setHoraSeleccionada(item);
                  setTiempo(item);
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
