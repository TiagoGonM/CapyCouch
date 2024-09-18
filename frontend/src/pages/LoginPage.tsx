import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { Button } from "../components/ui";

import { useAuthStore } from "../hooks/useAuthStore";


interface FormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { register, handleSubmit } = useForm<FormData>();
  const { startLogin } = useAuthStore();

  const onSubmit = handleSubmit(async ({ email, password }) => {
    startLogin({ email, password });
  });

  return (
    <div className="flex items-center justify-center h-[calc(100vh-7rem)]">
      <form onSubmit={onSubmit} className="space-y-2">
        <label htmlFor="email" className="block text-foreground text-sl">
          Correo electrónico
        </label>
        <input
          type="email"
          className="border-primary border-2 bg-secondary text-foreground bg-opacity-30 rounded-xl w-full p-1"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />

        <label htmlFor="password" className="block text-foreground text-sl">
          Contraseña
        </label>
        <input
          type="password"
          className="border-primary border-2 bg-secondary text-foreground bg-opacity-30 rounded-xl w-full p-1"
          {...register("password", { required: true })}
        />

        <Button value="Iniciar sesión" type="submit" />

        <span className="inline-block text-foreground mt-5 text-center">
          ¿Todavia no tienes cuenta?
        </span>
        <Link
          to="/auth/register"
          className="text-foreground mt-5 text-center underline pl-2"
        >
          Registrate
        </Link>
      </form>
    </div>
  );
}
