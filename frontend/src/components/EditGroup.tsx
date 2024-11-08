import React, { useState } from "react";
import AsyncSelect from "react-select/async";

import { PreferencesForm } from "./PreferencesForm";
import { Group, GroupOption, User } from "../interfaces/interfaces";
import { useAuthStore, useUserStore } from "../hooks/stores";
import { style } from "../styles/select.style";

export const EditGroup = ({group}: {group: Group}) => {
  const { getUsersByCoincidence, loading, users } = useUserStore();
  const { user: selfUser, getUser } = useAuthStore();

  const [selectedUsers, setSelectedUsers] = useState<GroupOption[]>();
  
  const handleSubmit = () => {};

  return (
    <form>
      <input type="text" value={group.name} />
      
      <PreferencesForm
        handleSubmit={handleSubmit}
        defaultGenresValues={group.genres}
        defaultLikesValues={group.likes}
        defaultDislikesValues={group.dislikes}
      />

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

    </form>

  );
};
