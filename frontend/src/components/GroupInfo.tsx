import React from "react";
import { Group } from "../interfaces/interfaces";
import { UserList } from ".";
import { useSuggestionStore } from "../hooks/stores";

export const GroupInfo = ({ group }: { group: Group }) => {
  const { suggestions } = useSuggestionStore();

  return (
    <div className="grid grid-cols-2">
      <div className="space-y-2">
        <section className="flex flex-row">
          <aside>
            <img
              src={group.image || "https://via.placeholder.com/40x40"}
              alt={group.name}
              className="w-40 h-40 object-cover rounded-full mx-auto"
            />
          </aside>
          <div className="ml-3">
            <h1 className="text-xl text-accent">{group.name}</h1>
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
      </div>

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
