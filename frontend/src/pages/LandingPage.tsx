import React from "react";
import { Link } from "react-router-dom";
import { Group, Suggestion } from "../components";
import { GroupList } from "../components/GroupList";
import { User } from "../components/User";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#05080a]">
      <header className="fixed flex justify-center w-full h-20 bg-[#2d1f3b] items-center shadow-md px-4 md:px-8 border-b-4 border-[#c4853a]">
        <img
          src="src/assets/logo.png"
          width="170"
          height="150"
          alt="CapyCouch logo"
          className="mr-3 max-sm:ml-1"
        />
        <h1 className="max-sm:hidden text-[#cddbe5] font-bold text-xl">
          CapyCouch
        </h1>
        <div className="flex-1 max-sm:hidden"></div>
        <Link
          to="/auth/login"
          className="px-4 py-2 mx-2 bg-[#2b2f31] bg-opacity-70 text-[#cddbe5] rounded-md hover:bg-[#0000003b] hover:text-[#c4853a] transition-all border border-[#c4853a]"
        >
          Iniciar sesión
        </Link>
        <Link
          to="/auth/register"
          className="px-4 py-2 mx-2 bg-[#2b2f31] bg-opacity-70 text-[#cddbe5] rounded-md hover:bg-[#0000003b] hover:text-[#c4853a] transition-all border border-[#c4853a]"
        >
          Registrarse
        </Link>
      </header>

      <main className="flex flex-col min-h-screen pt-24">
        <div className="flex-grow flex items-center">
          <div className="pl-8 md:pl-16 lg:pl-24 border-l-4 border-[#c4853a]">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#cddbe5]">
              Bienvenido a <span className="text-[#c4853a]">CapyCouch</span>
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-[#cddbe5]">
              Encuentra, descubre y decide entre cientos de{" "}
              <span className="text-[#c4853a]">
                peliculas y series entre amigos
              </span>
            </p>
          </div>
        </div>

        <section className="w-full bg-[#2b2f31] p-8 md:p-16 border-t-4 border-[#c4853a]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-[##cddbe5] mb-4">
              Elige peliculas con{" "}
              <span className="text-[#c4853a]">Avanzada IA</span>
            </h2>
            <p className="text-[##cddbe5] mb-4 text-lg">
              Ofrecemos una{" "}
              <span className="text-[#c4853a]">Gran Solucion</span> Para
              resolver el dilema de las juntadas con amigos ¿que pelicula ver?.
            </p>
            <p className="text-[##cddbe5] text-lg">
              Utilizamos las opiniones de los usuarios en grupos, para luego ser
              recopilados por una <span className="text-[#c4853a]">IA</span> y
              enviar las recomendaciones de peliculas para que sean disfrutadas
              por todos.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
