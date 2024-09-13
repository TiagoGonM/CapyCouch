import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { Button } from "./ui";
import { api } from "../api/api";

interface FormData {
  name: string;
  minAge: string;
  maxAge: string;
  users: string;
  image: string | null;
}

export const GroupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [responseError, setResponseError] = useState(false);

  const onSubmit = handleSubmit(async ({ minAge, maxAge, ...formData }) => {
    setResponseError(false);

    try {
      const { data } = await api.post("/groups", {
        minAge: parseInt(minAge),
        maxAge: parseInt(maxAge),
        ...formData,
      });

      console.log(data);
    } catch (error) {
      setResponseError(true);
      console.error(error);
    }
  });

  return (
    <div className="flex items-center justify-center h-[calc(100vh-7rem)]">
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Nombre del grupo</label>
        <input
          type="text"
          className="border-primary border-2 bg-secondary text-foreground bg-opacity-30 rounded-xl w-full p-1 mb-3"
          {...register("name", { required: true })}
        />

        <label htmlFor="minAge">Edad minima</label>
        <input
          type="number"
          className="border-primary border-2 bg-secondary text-foreground bg-opacity-30 rounded-xl w-full p-1 mb-3"
          {...register("minAge", { required: true })}
        />
        <label htmlFor="maxAge">Edad maxima</label>
        <input
          type="number"
          className="border-primary border-2 bg-secondary text-foreground bg-opacity-30 rounded-xl w-full p-1 mb-3"
          {...register("maxAge", { required: true })}
        />

        <label htmlFor="users">Integrantes</label>
        <input
          type="text"
          className="border-primary border-2 bg-secondary text-foreground bg-opacity-30 rounded-xl w-full p-1 mb-3"
          {...register("users", { required: true })}
        />

        <label htmlFor="image">Foto del grupo</label>
        <input
          type="file"
          className="border-primary border-2 bg-secondary text-foreground bg-opacity-30 rounded-xl w-full p-1 mb-3"
          {...register("image", { required: false })}
        />

        <Button value="Crear" />

        {responseError && (
          <span className="text-red-600">
            Hubo un error al intentar crear el grupo
          </span>
        )}
      </form>
    </div>
  );
};
