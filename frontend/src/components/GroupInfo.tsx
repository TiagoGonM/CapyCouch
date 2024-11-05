import React, { useState } from "react";

import { Group } from "../interfaces/interfaces";
import { UserList } from ".";
import { useAuthStore, useSuggestionStore } from "../hooks/stores";
import { ConfirmModal } from "./confirmModal";

export const GroupInfo = ({ group }: { group: Group }) => {
  const [confirmState, setConfirmState] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { suggestions } = useSuggestionStore();

  const { user: selfUser } = useAuthStore();

  const isOwner = selfUser.id === group.ownerId;

  return (
    <div className="grid grid-cols-2">
      <div className="space-y-2">
        <section className="flex flex-row">
          <aside>
            <img
              src={group.image || "https://via.placeholder.com/160x160"}
              alt={group.name}
              className="w-40 h-40 rounded-full mx-auto"
            />
          </aside>
          <div className="ml-3">
            <h1 className="text-xl text-accent">{group.name}</h1>
            <p className="text-green-400">{isOwner && "Propietario"}</p>
            <h2 className="font-bold inline-block">Total de sugerencias:</h2>
            <span> {suggestions.length}</span>
            <section>
              <h1 className="font-bold">Rango de edad</h1>
              <p>
                {group.minAge} - {group.maxAge}
              </p>
            </section>
          </div>
        </section>

        <section>
          <h1 className="font-bold pb-1">Miembros - {group.users.length}</h1>
          <UserList members={group.users} className="ml-1 space-y-2" />
        </section>

        <section>
          <h1 className="font-bold">Géneros</h1>
          <ul className="list-disc ml-5">
            {group.genres.map((genre, i) => (
              <li key={i.toString()}>{genre}</li>
            ))}
          </ul>
        </section>

        {isOwner && (
          <button 
            className="p-3 bg-red-500 rounded-xl border-2 border-red-500 hover:bg-red-800 hover:bg-opacity-70"
            onClick={
              () => setShowConfirmModal(true)
            }
            >
            Eliminar grupo
          </button>
        )}
      </div>

      <ConfirmModal confirm={(v: boolean) => {setConfirmState(v)}}/>

      <div className="space-y-2">
        <section>
          <h1 className="font-bold">Likes</h1>
          <ul className="list-disc ml-5">
            {group.likes.map((like, i) => (
              <li key={i.toString()}>{like}</li>
            ))}
          </ul>
        </section>

        <section>
          <h1 className="font-bold">Dislikes</h1>
          <ul className="list-disc ml-5">
            {group.dislikes.map((dislike, i) => (
              <li key={i.toString()}>{dislike}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};
