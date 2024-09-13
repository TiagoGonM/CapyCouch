import React from "react";
import { useAuthStore } from "../hooks/useAuthStore";

export default function UserPage() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-[#05080a]">
      <header className="fixed flex justify-center w-full h-20 bg-[#2d1f3b] items-center shadow-md px-4 md:px-8 border-b-4 border-[#c4853a]">
        <img src="src/assets/logo.png" width="170" height="150" alt="CapyCouch logo" className="mr-3" />
        <div className="text-[#cddbe5] font-bold text-xl md:text-2xl">CapyCouch</div>
        <div className="flex-1"></div>
      </header>

      <main className="flex flex-col min-h-screen pt-24">
      
        <section className="w-full bg-[#2b2f31] p-8 md:p-16 border-t-4 border-b-4 border-[#c4853a]">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <div>
              <h2 className="text-4xl font-semibold text-[#c4853a] mb-3">(nombre de usuario)</h2>
              <p className="text-2xl text-[#cddbe5]">EmailDe@prueba.com</p>
            </div>
            <button className="px-4 py-2 bg-[#2d1f3b] text-[#cddbe5] border-2 border-[#c4853a] rounded-md hover:bg-black hover:text-[#c4853a] transition-colors duration-200">
              Editar
            </button>
          </div>
        </section>

        <div className="flex flex-col items-center mt-8 space-y-8">
          <button className="bg-[#2b2f31] text-[#cddbe5] py-2 px-6 w-52 rounded-md transition-colors duration-300 hover:border-2 hover:border-[#c4853a] hover:text-[#c4853a]">
            Configuración
          </button>
          <button className="bg-[#2b2f31] text-[#cddbe5] py-2 px-6 w-52 rounded-md transition-colors duration-300 hover:border-2 hover:border-[#c4853a] hover:text-[#c4853a]">
            Configuración de grupos
          </button>
        </div>

   
        <div className="flex-grow flex items-center">
          <div className="pl-8 md:pl-16 lg:pl-24 border-l-4 border-[#c4853a]">
          </div>
        </div>

    
        <section className="w-full bg-[#2b2f31] p-8 md:p-16 border-t-4 border-[#c4853a]">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <p className="text-lg text-[#cddbe5]">Nuestro e-mail de contacto es:</p>
            <p className="text-lg text-[#c4853a]">contacto@capycouch.com</p>
          </div>
        </section>
      </main>
    </div>
  );
}
