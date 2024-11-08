import React from "react";
import { PreferencesForm } from "./PreferencesForm";
import { Group } from "../interfaces/interfaces";

export const EditGroup = ({group}: {group: Group}) => {
  const handleSubmit = () => {};

  return (
    <PreferencesForm
      handleSubmit={handleSubmit}
      defaultGenresValues={group.genres}
      defaultLikesValues={group.likes}
      defaultDislikesValues={group.dislikes}
    />
  );
};
