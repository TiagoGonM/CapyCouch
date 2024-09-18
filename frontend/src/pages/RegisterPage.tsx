import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { Button } from "../components/ui";

import { api } from "../api/api";

import { useAuthStore } from "../hooks/useAuthStore";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: string;
}


const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  
  const { startLogin } = useAuthStore();
  const onSubmit = handleSubmit(async ({age, ...data}) => {
      if (data.password !== data.confirmPassword)
        return alert("Password and confirm password are not equal");
      try {

        await api.post("/users", {age: parseInt(age), ...data});

        startLogin({ email: data.email, password: data.password });
      } catch (error) {
        console.error(error);
      }
  });
  
  return (
    <div className="flex items-center justify-center h-[calc(100vh-7rem)]">
      <form onSubmit={onSubmit} className="space-y-2">
        <label htmlFor="username" className="block text-foreground">
          Nombre de usuario
        </label>
        <input
          type="text"
          className="border-primary border-2 bg-secondary text-foreground bg-opacity-30 rounded-xl w-full p-1"
          {...register("username", { required: true })}
        />

        <label htmlFor="email" className="block text-foreground text-sl">
          Email
        </label>

        <input
          type="email"
          className="border-primary border-2 bg-secondary text-foreground bg-opacity-30 rounded-xl w-full p-1"
          {...register("email", { required: true })}
        />

        <label htmlFor="password" className="block text-foreground text-sl">
          Contraseña
        </label>
        <input
          type="password"
          className="border-primary border-2 bg-secondary text-foreground bg-opacity-30 rounded-xl w-full p-1"
          {...register("password", { required: true })}
        />

        <label
          htmlFor="confirmPassword"
          className="block text-foreground text-sl"
        >
          Confirmar contraseña
        </label>
        <input
          type="password"
          className="border-primary border-2 bg-secondary text-foreground bg-opacity-30 rounded-xl w-full p-1"
          {...register("confirmPassword", { required: true })}
        />

        <label htmlFor="age" className="block text-foreground text-sl">
          Edad
        </label>
        <input
          type="number"
          className="border-primary border-2 bg-secondary text-foreground bg-opacity-30 rounded-xl w-full p-1"
          {...register("age", { required: true })}
        />

        <Button value="Registrarse" />

        <span className=" text-foreground mt-5 text-center">
          ¿Ya tienes cuenta?
        </span>
        <Link to="/auth/login" className="underline pl-2">
          Inicia sesión
        </Link>
      </form>
    </div>
  );
};

export default RegisterPage;
