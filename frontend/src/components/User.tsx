import React from "react";

export const User = ({ name, image }: { name: string; image: string | null }) => {
  return (
    <article className="flex w-[15rem]">
      <aside className="">
        <img
          className="rounded-full"
          width={40}
          height={40}
          src={image || "https://via.placeholder.com/40"}
          alt="group"
        />
      </aside>
      <section className="pl-3 flex flex-col justify-center items-center">
        <h3>{name}</h3>
      </section>
    </article>
  );
};
