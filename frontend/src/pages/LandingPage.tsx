import React from "react";

export default function LandingPage() {
  return (
    <header className="flex w-full h-15 bg-black">
      <div className="flex-1"></div>
      <a
        href="/auth/login"
        className="p-5 hover:text-accent hover:underline transition-all"
      >
        Iniciar sesión
      </a>
      <a
        href="/auth/register"
        className="p-5 hover:text-accent hover:underline transition-all"
      >
        Registrarse
      </a>
    </header>
  );
}
