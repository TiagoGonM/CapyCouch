import React from "react";
import { User } from ".";
import { User as IUser } from "../interfaces/interfaces";

export const UserList = ({ members, className }: { members: IUser[], className?: string }) => {
  return (
    <div className={className}>
      {members.map((user) => (
        <User key={user.id} image={user.image} name={user.username} />
      ))}
    </div>
  );
};
