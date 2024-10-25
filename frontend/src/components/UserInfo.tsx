import React from "react";
import { User } from "../interfaces/interfaces";

export const UserInfo = ({ user }: { user: User }) => {
  return (
    <section className="grid grid-cols-2">
      <div className="space-y-2">
        <h1 className="text-xl text-accent">{user.username}</h1>
        <div>
          <h2 className="font-bold">E-mail</h2>
          <p>{user.email}</p>
        </div>
        <h2 className="font-bold inline-block">Edad: </h2>
        <span> {user.age}</span>
        <section>
          <h1 className="font-bold">Géneros</h1>
          <ul className="list-disc ml-5">
            {user.genres.map((genre, i) => (
              <li key={i.toString()}>{genre}</li>
            ))}
          </ul>
        </section>
      </div>
      <img
        src={user.image || "https://via.placeholder.com/40x40"}
        alt={user.username}
        className="w-40 h-40 justify-end rounded-full mx-auto"
      />
    </section>
  );
};
