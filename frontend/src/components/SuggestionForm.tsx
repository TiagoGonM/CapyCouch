import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui";
import { useSuggestionStore } from "../hooks/stores/useSuggestionStore";

interface FormData {
  genres: string;
  likes: string;
  dislikes: string;
}

export const SuggestionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { createSuggestion } = useSuggestionStore();

  const onSubmit = handleSubmit(async (formData) => {
    console.log(formData);
    createSuggestion(formData);
  });

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="genres">Géneros</label>
      <input
        type="text"
        className="border-primary border-2 bg-secondary text-foreground bg-opacity-30 rounded-xl w-full p-1 mb-3"
        {...register("genres", { required: true })}
      />

      <label htmlFor="likes">Peliculas/series que le gustan</label>
      <input
        type="text"
        className="border-primary border-2 bg-secondary text-foreground bg-opacity-30 rounded-xl w-full p-1 mb-3"
        {...register("likes", { required: true })}
      />

      <label htmlFor="dislikes">Peliculas/series que no le gustan</label>
      <input
        type="text"
        className="border-primary border-2 bg-secondary text-foreground bg-opacity-30 rounded-xl w-full p-1 mb-3"
        {...register("dislikes", { required: true })}
      />

      <Button type="submit" value="Sugerir" />
    </form>
  );
};
