import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";

import Cookies from "js-cookie";

import { Button } from "../components/ui";
import { genres } from "../utils";

import { api } from "../api/api";
import { Option } from "../interfaces/interfaces";
import { style } from "./select.style";
import { catalogue } from "../utils";

interface FormData {
  genres: string[];
  likes: string[];
  dislikes: string[];
}

export default function GenrePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (formData) => {
    try {
      await api.put(`/user/${Cookies.get("user_id")}`, {
        genres: selectedGenres?.map((genre) => genre.value) || [],
        likes: selectedLikes?.map((media) => media.value) || [],
        dislikes: selectedDislikes?.map((media) => media.value) || [],
        firstTime: false,
      });
      console.log("Data submitted successfully:", formData);
    } catch (error) {
      console.error("Failed to submit data:", error);
    }
  });

  const [selectedGenres, setSelectedGenres] = useState<Option[]>();
  const [selectedLikes, setSelectedLikes] = useState<Option[]>();
  const [selectedDislikes, setSelectedDislikes] = useState<Option[]>();

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="w-[400px] p-6 bg-background rounded-lg shadow-lg">
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="genres" className="block text-sm font-medium text-foreground mb-1">
            Géneros
          </label>
          <Select
            options={genres.map((genre) => ({
              value: genre,
              label: genre,
              color: "#000",
            }))}
            isMulti
            isSearchable
            closeMenuOnSelect={false}
            name="Generos"
            onChange={(selected) => {
              setSelectedGenres(selected as Option[]);
            }}
            styles={style}
          />
        </div>

        <div>
          <label htmlFor="likes" className="block text-sm font-medium text-foreground mb-1">
            Películas/series que le gustan
          </label>
          <Select
            options={catalogue.map((media) => ({
              value: media,
              label: media,
              color: "#000",
            }))}
            isMulti
            isSearchable
            closeMenuOnSelect={false}
            name="Películas o series que le gustan"
            onChange={(selected) => {
              setSelectedLikes(selected as Option[]);
            }}
            styles={style}
          />
        </div>

        <div>
          <label htmlFor="dislikes" className="block text-sm font-medium text-foreground mb-1">
            Películas/series que no le gustan
          </label>
          <Select
            options={catalogue
              .filter((media) => !selectedLikes?.find((el) => media === el.value))
              .map((media) => ({
                value: media,
                label: media,
                color: "#000",
              }))}
            isMulti
            isSearchable
            closeMenuOnSelect={false}
            name="Películas o series que no le gustan"
            onChange={(selected) => {
              setSelectedDislikes(selected as Option[]);
            }}
            styles={style}
          />
          {errors.dislikes && (
            <p className="text-red-500 text-sm mt-1">{errors.dislikes.message}</p>
          )}
        </div>

        <Button type="submit" value="actualizar" />
      </form>
    </div>
  </div>
  );
}
