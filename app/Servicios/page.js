import Image from "next/image";
import beardManIMG from "@/public/images/beardMan.png";
import barberIcon from "@/public/images/download3.png";
import { permanent_marker, roboto } from "../fonts";

export default function Servicios() {
  const servicios = [
    {
      nombre: "Corte Adulto",
      precio: "15.000",
    },
    {
      nombre: "Clasico o Niño",
      precio: "14.000",
    },
    {
      nombre: "Corte + Barba",
      precio: "22.000",
    },
    {
      nombre: "Corte + Cejas",
      precio: "17.000",
    },
    {
      nombre: "Delineado de Barba",
      precio: "8.000",
    },
    {
      nombre: "Corte + Barba + Cejas",
      precio: "24.000",
    },
    {
      nombre: "Depilacion Cera",
      precio: "7.000",
    },
    {
      nombre: "Oidos * Nariz * Cejas",
      precio: "4.000",
    },
    {
      nombre: "Marco Barba + Cejas",
      precio: "10.000",
    },
    {
      nombre: "Mascarilla",
      precio: "16.000",
    },
    {
      nombre: "Exfoliacion",
      precio: "25.000",
    },
  ];
  return (
    <div className="flex justify-center bg-black h-screen">
      <div className="w-1/3 grow flex justify-center border-r-2 border-amber-600">
        <Image src={beardManIMG} className="" />
      </div>
      <div className="w-2/3 text-4xl grow p-4 relative">
        <h1
          className={`${permanent_marker.className} text-5xl mt-6 text-amber-600`}
        >
          Da Corner BarberShop Servicios
        </h1>
        <h1 className={`${permanent_marker.className} text-4xl`}>
          Lista de precios
        </h1>
        <ul>
          {servicios.map((item, index) => {
            return (
              <li className={`${roboto.className} text-xl`}>
                <span className="mr-5 text-amber-300">{item.nombre}:</span>
                <span>{item.precio}</span>
              </li>
            );
          })}
        </ul>
        <button
          className={`${roboto.className} mt-2 px-36 py-2 font-bold rounded-md text-xl bg-amber-700 hover:bg-amber-600`}
        >
          Agenda tu cita!
        </button>
        <Image src={barberIcon} className="absolute right-10 top-1/2" />
      </div>
    </div>
  );
}
