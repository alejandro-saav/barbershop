import { roboto } from "../fonts";
export default function Servicios({
  index,
  isChecked,
  item,
  handleContainerClick,
}) {
  return (
    <div
      key={index}
      onClick={() => handleContainerClick(index)}
      className={`${
        roboto.className
      } flex justify-around mt-4 ml-4 w-2/3 border-2 p-2 rounded-md shadow-lg shadow-black cursor-pointer hover:contrast-150 ${
        isChecked
          ? "border-orange-300 contrast-150 bg-slate-700"
          : "border-orange-500"
      } select-none`}
    >
      <div className="grow">
        <h1 className="text-orange-500 pl-2 font-bold text-lg">
          {item.nombre}
        </h1>
        <h4 className="text-sm pl-2">{item.tiempo}</h4>
        <h4 className="text-sm pl-2">{item.precio}</h4>
      </div>
      <div className="grow self-center text-end mr-6 justify-self-end">
        <input type="checkbox" checked={isChecked} readOnly />
      </div>
    </div>
  );
}
