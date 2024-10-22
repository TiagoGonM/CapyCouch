import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "./ui";

import { useGroupStore, useUserStore } from "../hooks/stores";

import AsyncSelect from "react-select/async";
import { User, UserOption } from "../interfaces/interfaces";

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
  const [selectedValues, setSelectedValues] = useState<UserOption[]>();

  const onSubmit = handleSubmit(async ({ minAge, maxAge, ...formData }) => {
    setResponseError(false);

    try {
      if (!selectedValues?.length)
        throw new Error("No hay usuarios seleccionados");

      createGroup({
        minAge: parseInt(minAge),
        maxAge: parseInt(maxAge),
        users: selectedValues?.map((user) => user.value) || [],
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
            callback: (options: UserOption[]) => void
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
            setSelectedValues(selected as UserOption[]);
          }}
          placeholder="Buscar usuarios"
          noOptionsMessage={() => "No hay resultados"}
          closeMenuOnSelect={false}
          isClearable={false}
          styles={{
            control: (styles) => ({
              ...styles,
              backgroundColor: "#2d2d2d",
              color: "#fff",
              border: "2px solid #b5bec5",
              borderRadius: "0.5rem",
            }),
            option: (styles) => ({
              ...styles,
              backgroundColor: "#2d2d2d",
              color: "#fff",
            }),
            placeholder: (styles) => ({
              ...styles,
              color: "#808080",
            }),
            input: (styles) => ({
              ...styles,
              color: "#fff",
            }),
            multiValue: (styles) => ({
              ...styles,
              backgroundColor: "#505050",
              borderRadius: "1rem",
            }),
            multiValueLabel: (styles) => ({
              ...styles,
              color: "#fff",
              alignSelf: "center",
            }),
            multiValueRemove: (styles) => ({
              ...styles,
              borderRadius: "0rem 1rem 1rem 0rem",
            }),
            noOptionsMessage: (styles) => ({
              ...styles,
              backgroundColor: "#2d2d2d",
            }),
          }}
        />
      </div>
      {(!selectedValues?.length && responseError) && (
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
