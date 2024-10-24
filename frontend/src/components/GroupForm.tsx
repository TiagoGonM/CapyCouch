import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "./ui";

import { useAuthStore, useGroupStore, useUserStore } from "../hooks/stores";

import AsyncSelect from "react-select/async";
import { User } from "../interfaces/interfaces";
import { style } from "../pages/select.style";

interface FormData {
  groupName: string;
  minAge: string;
  maxAge: string;
  image: string | null;
}

interface GroupOption {
  value: string;
  label: string;
  color: string;
  age: number;
}

export const GroupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { createGroup, getGroups } = useGroupStore();

  const { getUsersByCoincidence, loading, users } = useUserStore();
  const { user, getUser } = useAuthStore();

  const [responseError, setResponseError] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<GroupOption[]>();

  const onSubmit = handleSubmit(async ({ minAge, maxAge, ...formData }) => {
    setResponseError(false);

    try {
      if (!selectedUsers?.length)
        throw new Error("No hay usuarios seleccionados");

      const { genres, likes, dislikes } = mixPreferences();

      const agesList: number[] = selectedUsers?.map((user) => user.age as number);
      agesList.push(user.age as number);

      createGroup({
        minAge: agesList?.reduce((acc, age) => Math.min(acc, age)),
        maxAge: agesList?.reduce((acc, age) => Math.max(acc, age)),
        genres,
        likes,
        dislikes,
        users: selectedUsers?.map((user) => user.value) || [],
        ...formData,
      });

      getGroups();
    } catch (error) {
      setResponseError(true);
      console.error(error);
    }
  });

  useEffect(() => {
    getUser();
  }, []);

  const mixPreferences = () => {
    let genres: string[] = [];
    let likes: string[] = [];
    let dislikes: string[] = [];

    selectedUsers?.map(({ value: id }) => {
      const user = users.find((user: User) => user.id === id) as User;
      genres.concat(user?.genres as string[]);
      likes.concat(user?.likes as string[]);
      dislikes.concat(user?.dislikes as string[]);
      console.log({genres, likes, dislikes});
    });

    // Remove duplicates
    genres = Array.from(new Set(genres));
    likes = Array.from(new Set(likes));
    dislikes = Array.from(new Set(dislikes));

    return { genres, likes, dislikes };
  };

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

      <div>
        <label htmlFor="users">Integrantes</label>
        <AsyncSelect
          loadOptions={(
            inputValue: string,
            callback: (options: GroupOption[]) => void
          ) => {
            getUsersByCoincidence(inputValue);
            callback(
              users.map((user: User) => ({
                value: user.id,
                label: user.username,
                color: "#FFF",
                age: user.age,
              }))
            );
          }}
          isMulti
          isSearchable
          isLoading={loading}
          onChange={(selected) => {
            setSelectedUsers(selected as GroupOption[]);
          }}
          placeholder="Buscar usuarios"
          noOptionsMessage={() => "No hay resultados"}
          closeMenuOnSelect={false}
          isClearable={false}
          styles={style}
        />
      </div>
      {!selectedUsers?.length && responseError && (
        <span className="text-red-600 block">
          Seleccione por lo menos un usuario
        </span>
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
