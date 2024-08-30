import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui";
import { Media } from '../../../backend/src/interfaces/interfaces';

const SuggestionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch("http://localhost:3000/api/suggestions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const suggestions = await res.json() as Media[];
    // handleMedia(suggestions);
    console.log(suggestions);
  });

  return (
    <div className="flex items-center justify-center h-[calc(100vh-7rem)]">
      <form onSubmit={onSubmit} className="">
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

        <Button type="submit" value="Sugerir"/>
      </form>

    </div>
  );
};

export default SuggestionForm;
