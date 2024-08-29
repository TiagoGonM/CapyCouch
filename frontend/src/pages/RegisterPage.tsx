import React from "react";

import { FieldValues, UseFormHandleSubmit, useForm } from "react-hook-form";
import { Button } from "../components/ui";

const onSubmit = (
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>
) => {
  handleSubmit(async (data: FieldValues) => {
    if (data.password !== data.confirmPassword)
      return alert("Password and confirm password are not equal");

    console.log(data);

    // const res = await fetch("/api/auth/register", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    //   headers: { "Content-Type": "application/json" },
    // });

    // const user = await res.json();
    // console.log(user);
  });
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="flex items-center justify-center h-[calc(100vh-7rem)]">
      <form onSubmit={() => onSubmit(handleSubmit)} className="space-y-2">
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
        <a href="/auth/login" className="underline pl-2">
          Inicia sesión
        </a>
      </form>
    </div>
  );
};

export default RegisterPage;
