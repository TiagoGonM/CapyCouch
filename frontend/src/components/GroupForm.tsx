import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "./ui";

import { useGroupStore, useUserStore } from "../hooks/stores";

import AsyncSelect from "react-select/async";
import { User, Option } from "../interfaces/interfaces";
import { style } from "../pages/select.style";

interface FormData {
  groupName: string;
  minAge: string;
  maxAge: string;
  image: string | null;
}

export const GroupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { createGroup, getGroups } = useGroupStore();

  const { getUsersByCoincidence, loading, users } = useUserStore();

  const [responseError, setResponseError] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<Option[]>();

  const onSubmit = handleSubmit(async ({ minAge, maxAge, ...formData }) => {
    setResponseError(false);

    try {
      if (!selectedUsers?.length)
        throw new Error("No hay usuarios seleccionados");

      createGroup({
        minAge: parseInt(minAge),
        maxAge: parseInt(maxAge),
        users: selectedUsers?.map((user) => user.value) || [],
        ...formData,
      });

      getGroups();
    } catch (error) {
      setResponseError(true);
      console.error(error);
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <div>
        <label htmlFor="groupName">Nombre del grupo</label>
        <input
          type="text"
          className="border-2 border-primary bg-[#2d2d2d] text-foreground rounded-xl w-full p-1 mb-3"
          {...register("groupName", { required: true })}
        />
      </div>

      <div className="grid grid-cols-2">
        <div>
          <label htmlFor="minAge" className="pr-3">
            Edad minima
          </label>
          <input
            type="number"
            className="border-primary border-2 bg-[#2d2d2d] text-foreground rounded-xl w-[4rem] p-1 mb-3"
            {...register("minAge", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="maxAge" className="pr-3">
            Edad maxima
          </label>
          <input
            type="number"
            className="border-primary border-2 bg-[#2d2d2d] text-foreground rounded-xl w-[4rem] p-1 mb-3"
            {...register("maxAge", { required: true })}
          />
        </div>
      </div>

      <div>
        <label htmlFor="users">Integrantes</label>
        <AsyncSelect
          loadOptions={(
            inputValue: string,
            callback: (options: Option[]) => void
          ) => {
            getUsersByCoincidence(inputValue);
            callback(
              users.map((user: User) => ({
                value: user.id,
                label: user.username,
                color: "#FFF",
              }))
            );
          }}
          isMulti
          isSearchable
          isLoading={loading}
          onChange={(selected) => {
            setSelectedUsers(selected as Option[]);
          }}
          placeholder="Buscar usuarios"
          noOptionsMessage={() => "No hay resultados"}
          closeMenuOnSelect={false}
          isClearable={false}
          styles={style}
        />
      </div>
      {(!selectedUsers?.length && responseError) && (
        <span className="text-red-600 block">Seleccione por lo menos un usuario</span>
      )}

      {/* <label htmlFor="image">Foto del grupo</label>
      <input
        type="file"
        className="border-primary border-2 bg-secondary text-foreground bg-opacity-30 rounded-xl w-full p-1 mb-3"
        {...register("image", { required: false })}
      /> */}

      <Button value="Crear" />


      {responseError && (
        <span className="text-red-600">
          Hubo un error al intentar crear el grupo
        </span>
      )}
    </form>
  );
};
