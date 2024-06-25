import curlLeft from "@/public/images/curlLeft.svg";
import curlRight from "@/public/images/curlRight.svg";
import Image from "next/image";
import { permanent_marker, roboto } from "./fonts";
import corteIMG from "@/public/images/corte.jpg";
import barbaIMG from "@/public/images/barba.jpg";
import afeitarIMG from "@/public/images/afeitar.jpg";
import tratamientoIMG from "@/public/images/tratamientoCapilar.jpg";

export default function Servicios() {
  return (
    <div className="w-full">
      <div
        className={`${permanent_marker.className} flex w-full justify-around`}
      >
        <Image src={curlLeft} />
        <h1 className="ml-5 mt-5 text-4xl">Nuestros servicios</h1>
        <Image src={curlRight} />
      </div>
      <div className={`${roboto.className} flex px-14 w-full`}>
        <div className="w-full p-5">
          <p className={`ml-4 mb-4 px-5 text-[#dddddd]`}>
            Ofrecemos cortes de pelo modernos, afeitados clásicos, arreglos de
            barba y tratamientos de cuidado capilar en un ambiente relajado y
            profesional, brindando una experiencia de barbería excepcional para
            hombres de todas las edades.
          </p>
          <div className="flex justify-center gap-10">
            <div className="bg-[#181818] p-4 w-52 rounded-lg border-2 border-[#000000]">
              <h1 className="font-bold">Corte de cabello</h1>
              <p className="text-sm mt-2 text-[#cccccc]">
                Estilos modernos y clásicos, adaptados a las preferencias del
                cliente.
              </p>
            </div>
            <div className="bg-[#181818] p-4 w-52 rounded-lg border-2  border-[#000000]">
              <h1 className="font-bold">Afeitado</h1>
              <p className="text-sm mt-2 text-[#cccccc]">
                Afeitado tradicional con navaja y toalla caliente.
              </p>
            </div>
          </div>
          <div className="flex justify-center gap-10 mt-4">
            <div className="bg-[#181818] p-4 w-52 rounded-lg border-2  border-[#000000]">
              <h1 className="font-bold">Arreglo de barba</h1>
              <p className="text-sm mt-2 text-[#cccccc]">
                Recorte y diseño de barba para mantenerla bien cuidada.
              </p>
            </div>
            <div className="bg-[#181818] p-4 w-52 rounded-lg border-2  border-[#000000]">
              <h1 className="font-bold">Tratamientos capilares</h1>
              <p className="text-sm mt-2 text-[#cccccc]">
                Servicios de cuidado del cabello como lavados y tratamientos de
                hidratación.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full p-5 px-16 flex justify-start">
          <Image
            src={corteIMG}
            className="object-fill w-96 h-96 rounded-lg border-4 border-[#a16a1b]"
          />
        </div>
      </div>
    </div>
  );
}
