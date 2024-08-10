"use client";
import { Suspense, useEffect, useState } from "react";
import { roboto } from "../fonts";
import Servicios from "./Servicios";
import Barbero from "./Barbero";
import Fecha from "./fecha";
import BarraNavegacion from "./barraNavegacion";
import PanelDerecho from "./PanelDerecho";
import {
  calculateEndTime,
  sumTimeByCondition,
  calcularTiempoEnHorasMinutos,
} from "./UtilityFunctions";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import Confirmacion from "./Confirmacion";
export default function Reserva() {
  const [servicios, setServicios] = useState([]);
  const [barberos, setBarberos] = useState([]);
  const [diaSeleccionado, setDiaSeleccionado] = useState(null);
  const [horaSeleccionada, setHoraSeleccionada] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/fetchServicios");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setServicios(data.servicios);
        setBarberos(data.barberos);
        setCheckedItems(new Array(data.servicios.length).fill(false));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const [pestana, setPestana] = useState(0);
  const [tiempo, setTiempo] = useState("");

  const [checkedItems, setCheckedItems] = useState(
    new Array(servicios.length).fill(false)
  );
  const [checkedBarber, setCheckedBarber] = useState([]);
  const totalTime = sumTimeByCondition(servicios, checkedItems);
  const tiempoEnHorasMinutos = calcularTiempoEnHorasMinutos(totalTime);
  const endTime = calculateEndTime(tiempo, totalTime);
  const handleContainerClick = (index) => {
    setCheckedItems((prevCheckedItems) =>
      prevCheckedItems.map((item, i) => (i === index ? !item : item))
    );
  };
  const titles = ["Servicios", "Especialista", "Fecha", "Confirmacion"];
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_SITE_KEY}>
      <div>
        <BarraNavegacion
          pestana={pestana}
          setPestana={setPestana}
          setCheckedBarber={setCheckedBarber}
          setDiaSeleccionado={setDiaSeleccionado}
          setHoraSeleccionada={setHoraSeleccionada}
        />
        <h1
          className={`${roboto.className} text-4xl text-orange-500 ml-6 mt-2 border-b-2 border-orange-500`}
        >
          {titles[pestana]}
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
                checkedBarber={checkedBarber}
                setCheckedBarber={setCheckedBarber}
              />
            )}
            {pestana === 2 && (
              <Fecha
                setTiempo={setTiempo}
                id_barbero={
                  checkedBarber.length > 0 ? checkedBarber[0].id_barbero : ""
                }
                diaSeleccionado={diaSeleccionado}
                setDiaSeleccionado={setDiaSeleccionado}
                horaSeleccionada={horaSeleccionada}
                setHoraSeleccionada={setHoraSeleccionada}
                servicios={servicios}
              />
            )}
            {pestana === 3 && (
              <Confirmacion
                diaSeleccionado={diaSeleccionado}
                horaSeleccionada={horaSeleccionada}
                id_barbero={
                  checkedBarber.length > 0 ? checkedBarber[0].id_barbero : ""
                }
                servicios={servicios}
                checkedItems={checkedItems}
              />
            )}
          </div>
          <PanelDerecho
            tiempo={tiempo}
            pestana={pestana}
            setPestana={setPestana}
            servicios={servicios}
            checkedItems={checkedItems}
            checkedBarber={
              checkedBarber.length > 0 ? checkedBarber[0].nombre_barbero : ""
            }
            endTime={endTime}
            tiempoEnHorasMinutos={tiempoEnHorasMinutos}
            diaSeleccionado={diaSeleccionado}
            horaSeleccionada={horaSeleccionada}
          />
        </div>
      </div>
    </GoogleReCaptchaProvider>
  );
}
