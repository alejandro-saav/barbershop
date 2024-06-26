"use client";
import galeria_imagenes from "@/utilitys/galeriaImages";
import Image from "next/image";
import curlLeft from "@/public/images/curlLeft.svg";
import curlRight from "@/public/images/curlRight.svg";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import { permanent_marker } from "./fonts";
import { useState } from "react";
export default function Galeria() {
  const [selectedImage, setSelectedImage] = useState(null);
  function Modal({ src, onClose }) {
    document.body.setAttribute("style", "overflow:hidden;");
    return (
      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-20"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-24 text-white text-7xl"
        >
          &times;
        </button>
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <Image src={src} className="rounded-3xl z-50 h-2/3 w-96" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div>
        <div
          className={`${permanent_marker.className} flex w-full justify-around mb-8`}
        >
          <Image src={curlLeft} />
          <h1 className="ml-5 mt-5 text-4xl">Galeria</h1>
          <Image src={curlRight} />
        </div>
      </div>
      <div className="flex justify-center w-full">
        <PiCaretLeftBold className="text-7xl text-slate-600 self-center cursor-pointer opacity-75" />
        <div className="h-52 w-2/3 overflow-scroll flex gap-2">
          {galeria_imagenes.map((item, index) => {
            return (
              <Image
                src={item}
                width={500}
                height={500}
                className="rounded-2xl cursor-pointer contrast-125 hover:contrast-100"
                onClick={() => setSelectedImage(item)}
              />
            );
          })}
        </div>
        <PiCaretRightBold className="text-7xl text-slate-600 self-center cursor-pointer opacity-75" />
      </div>
      {selectedImage && (
        <Modal
          src={selectedImage}
          onClose={() => {
            document.body.setAttribute("style", "overflow:auto;");
            setSelectedImage(null);
          }}
        />
      )}
      <div>HEHLHALSASKLJDSAKLJD</div>
    </div>
  );
}
