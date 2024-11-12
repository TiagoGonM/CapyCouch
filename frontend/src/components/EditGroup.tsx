import React, { useState } from "react";
import AsyncSelect from "react-select/async";

import { PreferencesForm } from "./PreferencesForm";
import {
  Group,
  GroupOption,
  Option as IOption,
  User,
} from "../interfaces/interfaces";
import {
  useAuthStore,
  useSuggestionStore,
  useUserStore,
} from "../hooks/stores";
import { style } from "../styles/select.style";
import MButton from "@mui/material/Button";
import { api } from "../api/api";

export const EditGroup = ({ group }: { group: Group }) => {
  const { getUsersByCoincidence, loading, users } = useUserStore();
  const { id } = useSuggestionStore();

  const [selectedGenres, setSelectedGenres] = useState<IOption[]>();
  const [selectedLikes, setSelectedLikes] = useState<IOption[]>();
  const [selectedDislikes, setSelectedDislikes] = useState<IOption[]>();
  const [groupName, setGroupName] = useState<string>();

  const [selectedUsers, setSelectedUsers] = useState<GroupOption[]>();

  const handleSubmit = async () => {
    await api.put(`/groups/${id}`, {
      name: groupName,
      genres: selectedGenres?.map((genre) => genre.value),
      likes: selectedLikes?.map((like) => like.value),
      dislikes: selectedDislikes?.map((dislike) => dislike.value),
      users: selectedUsers?.map((user) => user.value),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Nombre
        </label>
        <input
          type="text"
          onChange={(v) => setGroupName(v.currentTarget.value)}
          className="bg-[#2d2d2d] pl-2 border-2 border-solid border-[#b5bec5] rounded-lg"
          defaultValue={group.name}
        />
      </div>

      <PreferencesForm
        handleSelectedGenres={(options) => setSelectedGenres(options)}
        handleSelectedLikes={(options) => setSelectedLikes(options)}
        handleSelectedDislikes={(options) => setSelectedDislikes(options)}
        defaultGenresValues={group.genres}
        defaultLikesValues={group.likes}
        defaultDislikesValues={group.dislikes}
      />

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Miembros
        </label>
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
                genres: user.genres,
                age: user.age,
                likes: user.likes,
                dislikes: user.dislikes,
              }))
            );
          }}
          defaultValue={group.users.map((user: User) => ({
            value: user.id,
            label: user.username,
            color: "#FFF",
            genres: user.genres,
            age: user.age,
            likes: user.likes,
            dislikes: user.dislikes,
          }))}
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

      {/* <Button type="submit" value="Actualizar" /> */}
      <MButton type="submit" variant="contained" className="w-full">
        Actualizar
      </MButton>
    </form>
  );
};
