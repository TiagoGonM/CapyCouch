import React, { useEffect } from "react";
import { useGroupStore } from "../hooks/useGroupStore";
import { Group } from ".";

export const GroupList = () => {
  const { getGroups, groups } = useGroupStore();

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <li>
      {groups.map(({ name, image, minAge, maxAge, id }) => (
        <div className="border p-2">
          <Group key={id} name={name} image={"https://via.placeholder.com/50"} minAge={minAge} maxAge={maxAge} />
        </div>
      ))}
    </li>
  );
};
