import logoIMG from "@/public/images/download3.png";
import { roboto } from "../fonts";
import { MdOutlineDateRange, MdOutlineAccessTime } from "react-icons/md";
import Image from "next/image";
export default function PanelDerecho({
  tiempo,
  setPestana,
  servicios,
  checkedItems,
  checkedBarber,
  endTime,
  tiempoEnHorasMinutos,
}) {
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
  return (
    <div
      className={`${roboto.className} grow w-1/2 flex justify-start h-[27rem] `}
    >
      <div className="w-2/4 mt-1 mx-8 p-2 bg-[#181818] border-orange-500 rounded-lg shadow-sm shadow-black">
        <div className="flex justify-center gap-11 border-b-2 border-orange-500 shadow-slate-800">
          <div className="relative w-16 h-12">
            <Image src={logoIMG} fill alt={"Logo de Da corner Barbershop"} />
          </div>
          <div>
            <h1 className="text-orange-500 font-bold">Da Corner Barbershop</h1>
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
            <span className="text-sm">
              {tiempo}-{endTime} {`(${tiempoEnHorasMinutos})`}
            </span>
          </div>
        </div>
        <div className="overflow-auto p-2 mostrarScrollbar h-64">
          {servicios.map((item, index) => {
            if (checkedItems[index])
              return (
                <div className="flex justify-between" key={index}>
                  <div>
                    <h1 className="font-light text-orange-500">
                      {item.nombre.replaceAll("_", " ")}
                    </h1>
                    <h1 className="font-light text-orange-300">
                      {`${item.duracion}min ${
                        checkedBarber != "" ? "con " : ""
                      }`}{" "}
                      <span className="text-white font-light">
                        {checkedBarber}
                      </span>
                    </h1>
                  </div>
                  <div>{item.precio.toLocaleString("es-CO")}</div>
                </div>
              );
          })}
        </div>
        <button
          onClick={() =>
            setPestana((prev) => (prev === 3 ? (prev = 0) : prev + 1))
          }
          className="w-full px-8 py-2 mt-2 bg-orange-600 rounded-md text-lg font-bold hover:bg-orange-700 transition-all duration-200"
        >
          Siguiente {"->"}
        </button>
      </div>
    </div>
  );
}
