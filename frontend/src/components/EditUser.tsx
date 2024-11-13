import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { PreferencesForm } from "./PreferencesForm";
import { Option } from "../interfaces/interfaces";

import { useAuthStore } from "../hooks/stores";

import MButton from "@mui/material/Button";
import { api } from "../api/api";

export const EditUser = () => {
  const { user } = useAuthStore();

  const [selectedGenres, setSelectedGenres] = useState<Option[]>();
  const [selectedLikes, setSelectedLikes] = useState<Option[]>();
  const [selectedDislikes, setSelectedDislikes] = useState<Option[]>();
  const [userAge, setUserAge] = useState<number>();

  const handleSubmit = async () => {
    await api.put(`/users/${user.id}`, {
      genres: selectedGenres?.map((genre) => genre.value),
      likes: selectedLikes?.map((like) => like.value),
      dislikes: selectedDislikes?.map((dislike) => dislike.value),
      age: userAge || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Edad
        </label>
        <input
          type="number"
          className="bg-[#2d2d2d] p-1 pl-2 border-2 border-solid border-[#b5bec5] rounded-lg max-w-14"
          defaultValue={user.age}
          onChange={(v) => setUserAge(v.currentTarget.valueAsNumber)}
        />
      </div>

      <PreferencesForm
        handleSelectedGenres={(options) => setSelectedGenres(options)}
        handleSelectedLikes={(options) => setSelectedLikes(options)}
        handleSelectedDislikes={(options) => setSelectedDislikes(options)}
        defaultGenresValues={user.genres}
        defaultLikesValues={user.likes}
        defaultDislikesValues={user.dislikes}
      />

      {/* <Button type="submit" value="Actualizar" /> */}
      <MButton type="submit" variant="contained" className="w-full">
        Actualizar
      </MButton>
    </form>
  );
};
