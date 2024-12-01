import Image from "next/image";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { TbBrandTiktok } from "react-icons/tb";
import Loginstatus from "./loginstatus";
import { inter, roboto } from "./fonts";
import "./globals.css";
import logoIMG from "@/public/images/download3.png";
import Link from "next/link";

export const metadata = {
  title: "BarberShop",
  description:
    "Barbershop store where you can find everything you need for your barbershop.",
};

export default function RootLayout({ children }) {
  console.log("HELLO");
  const lista = [
    "Inicio",
    "Servicios",
    "Productos",
    "Sobre nosotros",
    "Contactanos",
  ];
  const redes = [
    {
      icon: <CiFacebook />,
      link: "https://www.facebook.com/Dacornerbarbershop/",
      class: "hover:text-sky-600 text-2xl",
    },
    {
      icon: <FaInstagram />,
      link: "https://www.instagram.com/explore/locations/100847377940359/da-corner-barber/",
      class: "hover:text-amber-400 text-2xl",
    },
    {
      icon: <TbBrandTiktok />,
      link: "https://www.tiktok.com/@dacornerbarberlounge",
      class: "hover:text-rose-400 text-2xl",
    },
  ];
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-full h-14 flex justify-around border-b-2 border-amber-400">
          <Image
            src={logoIMG}
            alt="Logo image of the company"
            className="object-fill rounded-full cursor-pointer h-16 w-28"
          />
          <ul className="w-1/3 flex justify-between content-center flex-wrap ml-2 select-none">
            <li>
              <Link className="cursor-pointer hover:text-sky-600" href="/">
                Inicio
              </Link>
            </li>
            <li>
              <Link
                className="cursor-pointer hover:text-sky-600"
                href="/Servicios"
              >
                Servicios
              </Link>
            </li>
            <li>
              <Link
                className="cursor-pointer hover:text-sky-600"
                href="/Productos"
              >
                Productos
              </Link>
            </li>
            <li>
              <Link
                className="cursor-pointer hover:text-sky-600"
                href="/Reserva"
              >
                Reservar Cita
              </Link>
            </li>
            <li>
              <Link
                className="cursor-pointer hover:text-sky-600"
                href="/Contactanos"
              >
                Contactanos
              </Link>
            </li>
          </ul>
          <ul className="flex justify-between content-center flex-wrap gap-4">
            {redes.map((item, index) => {
              return (
                <li className={item.class} key={index}>
                  <a target="_blank" href={item.link}>
                    {item.icon}
                  </a>
                </li>
              );
            })}
          </ul>
          <Loginstatus />
        </div>
        {children}
      </body>
    </html>
  );
}
