import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "./ui";

import { useGroupStore, useUserStore } from "../hooks/stores";

import Select from "react-select";

interface FormData {
  groupName: string;
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

  const { createGroup } = useGroupStore();

  const { getUsers, getUsersByCoincidence, loading, users } = useUserStore();

  const [responseError, setResponseError] = useState(false);

  const onSubmit = handleSubmit(async ({ minAge, maxAge, ...formData }) => {
    setResponseError(false);

    try {
      createGroup({
        minAge: parseInt(minAge),
        maxAge: parseInt(maxAge),
        ...formData,
      });
    } catch (error) {
      setResponseError(true);
      console.error(error);
    }
  });

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="groupName">Nombre del grupo</label>
      <input
        type="text"
        className="border-primary border-2 bg-secondary text-foreground bg-opacity-30 rounded-xl w-full p-1 mb-3"
        {...register("groupName", { required: true })}
      />

      <div className="grid grid-cols-2">
        <div>
          <label htmlFor="minAge" className="pr-3">
            Edad minima
          </label>
          <input
            type="number"
            className="border-primary border-2 bg-secondary text-foreground bg-opacity-30 rounded-xl w-[4rem] p-1 mb-3"
            {...register("minAge", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="maxAge" className="pr-3">
            Edad maxima
          </label>
          <input
            type="number"
            className="border-primary border-2 bg-secondary text-foreground bg-opacity-30 rounded-xl w-[4rem] p-1 mb-3"
            {...register("maxAge", { required: true })}
          />
        </div>
      </div>

      <label htmlFor="users">Integrantes</label>
      <input
        type="text"
        className="border-primary border-2 bg-secondary text-foreground bg-opacity-30 rounded-xl w-full p-1 mb-3"
        {...register("users", { required: true })}
      />

      {/* TODO: select */}
      <Select
        options={users.map((user) => ({
          value: user.id,
          label: user.username,
          color: "#00000",
        }))}
        isMulti
        isSearchable
        isLoading={loading}
        closeMenuOnSelect={false}
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
  );
};
