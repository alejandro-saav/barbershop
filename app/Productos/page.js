//"use client";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import img from "@/public/images/fotosGaleria/9.jpg";

export default function Productos() {
  return (
    <div>
      <CldImage
        width="960"
        height="600"
        src="barbershopGaleria/j1txg9h4h6zxazj4wham"
        sizes="100vw"
        alt="XDXDXDXD"
      />
    </div>
  );
}
