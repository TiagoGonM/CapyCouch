import React from "react";

import { FieldValues, useForm } from "react-hook-form";
import { Group } from "../interfaces/interfaces";
import { Button } from "./ui";

export const GroupForm = () => {
    const {
        register,
        handleSubmit,
        // formState: { errors },
    } = useForm();

    const onSubmit = handleSubmit(async (data: FieldValues) => {
        console.log("sent");
        const res = await fetch("https://shiny-palm-tree-94j47gq9v4pcxwvx-3000.app.github.dev/api/groups", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
    
        const group = await res.json() as Group;
        console.log(group);
      });

    return (
        <div className="flex items-center justify-center h-[calc(100vh-7rem)]">
            <form onSubmit={onSubmit}>
                <label htmlFor="name">Nombre del grupo</label>
                <input
                    type="text"
                    className="border-primary border-2 bg-secondary text-foreground bg-opacity-30 rounded-xl w-full p-1 mb-3"
                    {...register("name", { required: true })}
                />

                <label htmlFor="minAge">Edad minima</label>
                <input
                    type="number"
                    className="border-primary border-2 bg-secondary text-foreground bg-opacity-30 rounded-xl w-full p-1 mb-3"
                    {...register("minAge", { required: true })}
                />
                <label htmlFor="maxAge">Edad maxima</label>
                <input
                    type="number"
                    className="border-primary border-2 bg-secondary text-foreground bg-opacity-30 rounded-xl w-full p-1 mb-3"
                    {...register("maxAge", { required: true })}
                />

                <label htmlFor="users">Integrantes</label>
                <input
                    type="text"
                    className="border-primary border-2 bg-secondary text-foreground bg-opacity-30 rounded-xl w-full p-1 mb-3"
                    {...register("users", { required: true })}
                />

                <label htmlFor="image">Foto del grupo</label>
                <input
                    type="file"
                    className="border-primary border-2 bg-secondary text-foreground bg-opacity-30 rounded-xl w-full p-1 mb-3"
                    {...register("image", { required: false,  })}
                />
                
                <Button value="Crear"/>
            </form>
        </div>
    )
}