import React, { useEffect } from "react";
import { useGroupStore } from "../hooks/stores/useGroupStore";
import { Group as IGroup } from "../interfaces/interfaces";
import { Group } from ".";

export const GroupList = ({className}: {className?: string}) => {
  const { getGroups, groups, loading } = useGroupStore();

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <section className={className}>
      {loading ? (
        <h3>Cargando...</h3>
      ) : (
        groups.map(({ name, image, minAge, maxAge, id }: IGroup, i: number) => (
          <Group
            id={id}
            key={i.toString()}
            name={name}
            image={"https://via.placeholder.com/160x160"}
            minAge={minAge}
            maxAge={maxAge}
          />
        ))
      )}
    </section>
  );
};
