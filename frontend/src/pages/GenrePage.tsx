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
    <form onSubmit={onSubmit}>
      <label htmlFor="genres">Géneros</label>
      {/* <input
        type="text"
        className="border-primary border-2 bg-secondary text-foreground bg-opacity-30 rounded-xl w-full p-1 mb-3"
        {...register("genres", {
          required: "Este campo es obligatorio",
          setValueAs: (genre) =>
            genre.split(", ").map((genre: string) => genre.trim()), // Convert string to array
        })}
      />
      {errors.genres && <p className="text-red-500">{errors.genres.message}</p>} */}
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

      <label htmlFor="likes">Películas/series que le gustan</label>
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

      <label htmlFor="dislikes">Películas/series que no le gustan</label>
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
        <p className="text-red-500">{errors.dislikes.message}</p>
      )}

      <Button type="submit" value="actualizar" />
    </form>
  );
}
