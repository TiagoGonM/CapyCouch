import React, { useEffect } from "react";
import { useGroupStore } from "../hooks/stores/useGroupStore";
import { Group } from ".";

export const GroupList = () => {
  const { getGroups, groups } = useGroupStore();

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <section>
      {groups.map(({ name, image, minAge, maxAge, id }, i) => (
        <Group id={id} key={i.toString()} name={name} image={"https://via.placeholder.com/50"} minAge={minAge} maxAge={maxAge} />
      ))}
    </section>
  );
};
