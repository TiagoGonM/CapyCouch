import React, { useEffect } from "react";
import { Button, Input } from "../components/ui";

export default function LoginForm() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-7rem)]">
      <form className="space-y-2">
        
        <label htmlFor="email" className="block text-foreground text-sl">
          Correo electrónico
        </label>
        <Input type="email" id="email" required></Input>


        <label htmlFor="password" className="block text-foreground text-sl">
          Contraseña
        </label>

        <Input type="password" id="password" required></Input>

        <Button value="Iniciar sesión" type="submit"/>

        <span className="inline-block text-foreground mt-5 text-center">
          ¿Todavia no tienes cuenta?
        </span>
        <a
          href="/auth/register"
          className="text-foreground mt-5 text-center underline pl-2"
        >
          Registrate
        </a>
      </form>
    </div>
  );
}
