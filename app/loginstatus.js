"use client";

import { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { MdLogout, MdHistory, MdDashboard } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/app/lib/userContext";
import { roboto } from "./fonts";

export default function Loginstatus({ userCookieData }) {
  const { user, setUser } = useUser();
  console.log(userCookieData);
  // if (userCookieData != null) {
  //   setUser(userCookieData);
  // }

  useEffect(() => {
    if (userCookieData != null) {
      setUser(userCookieData);
    }
  }, [userCookieData]);
  const router = useRouter();

  // const [user, setUser] = useState(undefined);
  const [isHovered, setIsHovered] = useState(false);

  const handleLogout = async () => {
    const res = await fetch("/api/logout", {
      method: "POST",
    });
    const response = await res.json();
    if (response.success) {
      setUser(null);
      router.push("/");
    } else {
      console.error("Failed to log out");
    }
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      className="relative flex justify-between content-center flex-wrap gap-4 p-3"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href="/Login" className="flex gap-2">
        <CgProfile className="hover:text-orange-200 text-xl cursor-pointer" />
        {user && (
          <span className={`text-sm ${roboto.className}`}>
            <span className="text-orange-400">Bienvenido:</span>{" "}
            <span className="text-orange-200">{user.nombre}</span>
          </span>
        )}
      </Link>

      {isHovered && user && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-[#242424] border rounded shadow-md p-3 pt-1 w-[11rem] z-50">
          <div className="mt-2 pb-2 mb-2 border-b-2 border-slate-700">
            {user.role === "admin" || user.role === "super admin" ? (
              <Link className="flex items-center gap-2" href="/dashboard">
                <MdDashboard className="text-red-600 text-xl" />
                Dashboard
              </Link>
            ) : (
              <Link href="/Historial" className="flex items-center gap-2">
                <MdHistory className="text-red-600 text-xl" />
                Historial
              </Link>
            )}
          </div>
          <form action={handleLogout}>
            <button className="flex items-center gap-2 text-white">
              <MdLogout className="text-red-600 text-xl" />
              Cerrar Sesion
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
