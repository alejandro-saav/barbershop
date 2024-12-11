import Image from "next/image";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { TbBrandTiktok } from "react-icons/tb";
import Loginstatus from "./loginstatus";
import { inter, roboto } from "./fonts";
import "./globals.css";
import logoIMG from "@/public/images/download3.png";
import Link from "next/link";
import { cookies } from "next/headers";
import { getUserDataFromCookies } from "@/app/lib/tokenManagement";
import { redirect } from "next/navigation";
import { UserProvider } from "@/app/lib/userContext";
import {
  generateTokens,
  verifyAccessToken,
  verifyRefreshToken,
  setTokens,
} from "@/app/lib/tokenManagement";

export const metadata = {
  title: "BarberShop",
  description:
    "Barbershop store where you can find everything you need for your barbershop.",
};

export default async function RootLayout({ children }) {
  console.log("HELLO");
  const cookieStore = await cookies();
  const accessTokenCookie = cookieStore.get("access_token");
  let userCookieData = null;
  if (accessTokenCookie) {
    userCookieData = await verifyAccessToken(accessTokenCookie.value);
    delete userCookieData.exp;
    delete userCookieData.userId;
  } else {
    const refreshTokenCookie = cookieStore.get("refresh_token");
    if (refreshTokenCookie) {
      // api call
      const res = await fetch("http://localhost:3000/api/refreshToken", {
        method: "POST",
        cache: "no-store",
        credentials: "include",
      });
      const response = await res.json();
      console.log("response", response);
      if (response.status === 200) {
        userCookieData = response.userdata;
        delete userCookieData.exp;
        delete userCookieData.userId;
      }
    }
  }
  console.log(userCookieData);
  // const userCookieData = await getUserDataFromCookies();
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
      <UserProvider>
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
            <Loginstatus userCookieData={userCookieData} />
          </div>
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
