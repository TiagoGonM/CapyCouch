import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import Cookies from "js-cookie";

import { Button } from "../components/ui";

import { api } from "../api/api";

interface FormData {
  genres: string[];
  likes: string[];
  dislikes: string[];
}

const GenrePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (formData) => {
    try {
      await api.put(`/user/${Cookies.get("user_id")}`, {
        genres: formData.genres,
        likes: formData.likes,
        dislikes: formData.dislikes,
        firstTime: false,
      });
      console.log("Data submitted successfully:", formData);
    } catch (error) {
      console.error("Failed to submit data:", error);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="genres">Géneros</label>
      <input
        type="text"
        className="border-primary border-2 bg-secondary text-foreground bg-opacity-30 rounded-xl w-full p-1 mb-3"
        {...register("genres", {
          required: "Este campo es obligatorio",
          setValueAs: (genre) =>
            genre.split(", ").map((genre: string) => genre.trim()), // Convert string to array
        })}
      />
      {errors.genres && <p className="text-red-500">{errors.genres.message}</p>}

      <label htmlFor="likes">Películas/series que le gustan</label>
      <input
        type="text"
        className="border-primary border-2 bg-secondary text-foreground bg-opacity-30 rounded-xl w-full p-1 mb-3"
        {...register("likes", {
          required: "Este campo es obligatorio",
          setValueAs: (likes) =>
            likes.split(", ").map((like: string) => like.trim()), // Convert string to array
        })}
      />
      {errors.likes && <p className="text-red-500">{errors.likes.message}</p>}

      <label htmlFor="dislikes">Películas/series que no le gustan</label>
      <input
        type="text"
        className="border-primary border-2 bg-secondary text-foreground bg-opacity-30 rounded-xl w-full p-1 mb-3"
        {...register("dislikes", {
          required: "Este campo es obligatorio",
          setValueAs: (dislikes) =>
            dislikes.split(", ").map((dislike: string) => dislike.trim()), // Convert string to array
        })}
      />
      {errors.dislikes && (
        <p className="text-red-500">{errors.dislikes.message}</p>
      )}

      <Button type="submit" value="actualizar" />
    </form>
  );
};

export default GenrePage;
