import Galeria from "./galeria";
import Hero from "./hero";
import Servicios from "./servicios";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <Servicios />
      <Galeria />
    </main>
  );
}
