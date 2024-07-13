import { fetchProductos } from "../lib/data";
import Image from "next/image";
import imagen from "@/public/images/fotosGaleria/1.jpg";
import { roboto } from "../fonts";
import ProductoImagen from "./productoImagen";

export default async function Productos() {
  const productos = await fetchProductos();
  return (
    <>
      <h1
        className={`text-4xl text-slate-800 text-center h-14 font-bold flex items-center justify-center shadow-2xl contrast-125`}
        style={{
          textShadow:
            "-2px -2px 0 #FFA500, 2px -2px 0 #FFA500, -2px 2px 0 #FFA500, 2px 2px 0 #FFA500",
        }}
      >
        Da Corner Barbershop Productos
      </h1>
      <div className="grid grid-cols-4 p-2 justify-center items-center shadow-2xl mx-14">
        {productos.map((item, index) => {
          return (
            <div
              className="flex flex-col justify-end items-center w-64 h-72 m-4 relative shadow-2xl border-4 group cursor-pointer"
              key={index}
            >
              <div className="w-64 h-56 relative shadow-xl shadow-white group-hover:opacity-25">
                <ProductoImagen
                  imagen={item.imagen}
                  width={300}
                  height={200}
                  alt={`Imagen de ${item.nombreproducto}`}
                />
              </div>
              <div
                className={`${roboto.className} overflow-hidden text-slate-600 self-start bg-slate-100 w-full opacity-80 rounded-md rounded-t-none p-2 group-hover:absolute top-0 group-hover:bg-white transition-all duration-300 group-hover:cursor-default`}
              >
                <h1 className="text-lg font-bold">{item.nombreproducto}</h1>
                <h3 className="text-slate-700">{item.marca}</h3>
              </div>
              <div className="absolute bottom-0 w-full z-50 h-0 overflow-hidden group-hover:h-16 bg-orange-400 opacity-90 group-hover:overflow-visible transition-all duration-300 group-hover:cursor-default">
                <h3
                  className="invisible group-hover:visible transition-all delay-200 p-1 text-slate-800 font-bold ml-2"
                  style={{
                    textShadow:
                      "-1px -1px 0 #aaa, 1px -1px 0 #aaa, -1px 1px 0 #aaa, 1px 1px 0 #aaa",
                  }}
                >
                  Precio: {item.precio.toLocaleString("es-CO")}
                </h3>
                <div className="flex justify-around">
                  <h5 className="invisible group-hover:visible transition-all delay-200 px-2 py-1 bg-orange-600 rounded-full text-xs w-1/3 text-center ml-2 shadow-sm shadow-slate-200">
                    {item.stock > 0 ? "Disponible" : "Sin existencias"}
                  </h5>
                  <h5 className="invisible group-hover:visible transition-all delay-200 px-2 py-1 bg-red-600 rounded-full text-xs w-1/3 text-center ml-2 shadow-md shadow-slate-200 cursor-pointer">
                    Comprar!
                  </h5>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
