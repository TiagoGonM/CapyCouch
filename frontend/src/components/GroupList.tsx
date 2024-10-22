import React, { useEffect } from "react";
import { useGroupStore } from "../hooks/stores/useGroupStore";
import { Group as IGroup } from "../interfaces/interfaces";
import { Group } from ".";

export const GroupList = () => {
  const { getGroups, groups, loading } = useGroupStore();

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <section>
      {loading ? (
        <h3>Cargando...</h3>
      ) : (
        groups.map(({ name, image, minAge, maxAge, id }: IGroup, i: number) => (
          <Group
            id={id}
            key={i.toString()}
            name={name}
            image={"https://via.placeholder.com/50"}
            minAge={minAge}
            maxAge={maxAge}
          />
        ))
      )}
    </section>
  );
};
