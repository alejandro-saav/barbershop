"use client";
import { CldImage } from "next-cloudinary";

export default function ProductoImagen({ imagen, width, height, alt }) {
  return (
    <CldImage src={imagen} sizes="100vw" alt={alt} crop="fill" fill={true} />
  );
}
