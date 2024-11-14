import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";

import { useAuthStore, useGroupStore, useUserStore } from "../hooks/stores";

import AsyncSelect from "react-select/async";
import { style } from "../styles/select.style";
import { User, GroupOption } from "../interfaces/interfaces";
import { toast } from "react-toastify";

interface FormData {
  groupName: string;
  minAge: string;
  maxAge: string;
  image: string | null;
}

export const GroupForm = ({
  handleAfterCreate,
}: {
  handleAfterCreate: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { createGroup } = useGroupStore();

  const { getUsersByCoincidence, loading, users } = useUserStore();
  const { user: selfUser, getUser } = useAuthStore();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [selectedUsers, setSelectedUsers] = useState<GroupOption[]>();

  const onSubmit = handleSubmit(async ({ minAge, maxAge, ...formData }) => {
    setErrorMessage("");

    try {
      if (!selectedUsers?.length)
        return setErrorMessage("Seleccione por lo menos un usuario");

      console.log({ selectedUsers });

      const { genres, likes, dislikes } = mixPreferences();

      const agesList: number[] = selectedUsers?.map(
        (user) => user.age as number
      );
      agesList.push(selfUser.age as number);

      createGroup({
        minAge: agesList?.reduce((acc, age) => Math.min(acc, age)),
        maxAge: agesList?.reduce((acc, age) => Math.max(acc, age)),
        genres,
        likes,
        dislikes,
        users: selectedUsers?.map((user) => user.value) || [],
        ...formData,
      });
      handleAfterCreate();
    } catch (error) {
      toast.error("Hubo un error al intentar crear el grupo");
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

    genres = genres.concat(selfUser?.genres as string[]);
    likes = likes.concat(selfUser?.likes as string[]);
    dislikes = dislikes.concat(selfUser?.dislikes as string[]);

    selectedUsers?.map((user) => {
      genres = genres.concat(user?.genres as string[]);
      likes = likes.concat(user?.likes as string[]);
      dislikes = dislikes.concat(user?.dislikes as string[]);
      console.log({ genres, likes, dislikes });
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
          className="border-2 border-primary bg-[#2d2d2d] text-foreground rounded-lg w-full p-1 pl-2 mb-3"
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
            console.log({ inputValue });

            getUsersByCoincidence(inputValue);
            callback(
              users
                .filter((user) => selfUser.id != user.id) // Evitar la elección del usuario actual
                .map((user) => ({
                  value: user.id,
                  label: user.username,
                  color: "#FFF",
                  genres: user.genres,
                  age: user.age,
                  likes: user.likes,
                  dislikes: user.dislikes,
                }))
            );
          }}
          isMulti
          isSearchable
          isLoading={loading}
          onChange={(selected) => {
            setSelectedUsers(selected as GroupOption[]);
          }}
          placeholder="Empieza a escribir para buscar usuarios"
          noOptionsMessage={() => "No hay resultados"}
          closeMenuOnSelect={false}
          isClearable={false}
          styles={style}
        />
      </div>

      <Button
        type="submit"
        variant="contained"
        className="w-full"
        disabled={!selectedUsers?.length}
      >
        Crear
      </Button>

      <span className="text-red-600">{errorMessage}</span>
    </form>
  );
};
