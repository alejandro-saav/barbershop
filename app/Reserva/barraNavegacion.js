"use cliente";
export default function BarraNavegacion({
  pestana,
  setPestana,
  setCheckedBarber,
  setDiaSeleccionado,
  setHoraSeleccionada,
}) {
  return (
    <div>
      <ul className="flex text-sm mt-6 ml-8 gap-2 text-orange-500">
        <li
          className="cursor-pointer"
          onClick={() => {
            setPestana(0);
            setCheckedBarber("");
            setDiaSeleccionado(null);
            setHoraSeleccionada(null);
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
          onClick={() => {
            setDiaSeleccionado(null);
            setHoraSeleccionada(null);
            pestana > 0 && setPestana(1);
          }}
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
  );
}
