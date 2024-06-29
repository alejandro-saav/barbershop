import { SlSocialFacebook, SlSocialInstagram } from "react-icons/sl";
import { TbBrandTiktok } from "react-icons/tb";

const Footer = () => {
  return (
    <>
      <div className="bg-[#242424] grid grid-cols-2 grid-rows-2 pt-10 gap-y-4 lg:gap-y-0 lg:grid-cols-4 lg:grid-rows-1 border-t-2 border-orange-500 mt-5">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-orange-500 text-center">CONTACTANOS</h1>
          <p className=" text-yellow-50 pt-2 text-center">
            Calle 51 sur #18 c 04 San Carlos Tunjuelito, Bogotá - Colombia
          </p>
          <p className=" text-yellow-50">Cel: 300 5221753</p>
        </div>
        <div className="">
          <h1 className="text-orange-500 text-center pb-2">SECCIONES</h1>
          <ul className="flex flex-col items-center text-sm gap-4 lg:gap-2">
            <li>
              <a href="#" className="text-yellow-50 hover:text-yellow-400">
                Principal
              </a>
            </li>
            <li>
              <a href="#" className="text-yellow-50 hover:text-yellow-400">
                Servicios
              </a>
            </li>
            <li>
              <a href="#" className="text-yellow-50 hover:text-yellow-400">
                Productos
              </a>
            </li>
            <li>
              <a href="#" className="text-yellow-50 hover:text-yellow-400">
                Sobre nosotros
              </a>
            </li>
            <li>
              <a href="#" className="text-yellow-50 hover:text-yellow-400">
                Nuestro equipo
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h1 className="text-orange-500 text-center pb-4 lg:pb-2">
            PRODUCTOS
          </h1>
          <ul className="flex flex-col items-center text-sm gap-4 lg:gap-2">
            <li>
              <a href="#" className="text-yellow-50 hover:text-yellow-400">
                Graphic Cards
              </a>
            </li>
            <li>
              <a href="#" className="text-yellow-50 hover:text-yellow-400">
                CPUs
              </a>
            </li>
            <li>
              <a href="#" className="text-yellow-50 hover:text-yellow-400">
                MotherBoards
              </a>
            </li>
          </ul>
        </div>
        <div className="grid grid-cols-2 grid-rows-4 justify-self-center justify-items-center pr-4 w-36">
          <h1 className="text-orange-500 col-span-2">SIGUENOS</h1>
          <a
            target="_blank"
            href="https://www.facebook.com/Dacornerbarbershop/"
          >
            <SlSocialFacebook className="text-white text-1xl hover:brightness-200 hover:text-sky-600 " />
          </a>
          <a
            target="_blank"
            href="https://www.tiktok.com/@dacornerbarberlounge"
          >
            <TbBrandTiktok className="text-white text-1xl hover:brightness-200 hover:text-red-600" />
          </a>
          <a
            target="_blank"
            href="https://www.instagram.com/explore/locations/100847377940359/da-corner-barber/"
            className="col-span-2"
          >
            <SlSocialInstagram className="text-white text-1xl hover:brightness-200 hover:text-amber-400" />
          </a>
        </div>
      </div>
      <div className="w-full bg-[#242424] text-white text-sm text-center mt-4">
        © 2024 Oscar Castro | Todos Los Derechos Reservados
      </div>
    </>
  );
};

export default Footer;
