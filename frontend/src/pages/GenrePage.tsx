import React, { useState } from "react";

import Cookies from "js-cookie";

import { Option } from "../interfaces/interfaces";

import { api } from "../api/api";

import { PreferencesForm } from "../components/PreferencesForm";


export default function GenrePage() {
  const handleSubmit = async (selectedGenres: Option[], selectedLikes: Option[], selectedDislikes: Option[]) => {
    try {
      await api.put(`/user/${Cookies.get("user_id")}`, {
        genres: selectedGenres?.map((genre) => genre.value) || [],
        likes: selectedLikes?.map((media) => media.value) || [],
        dislikes: selectedDislikes?.map((media) => media.value) || [],
        firstTime: false,
      });
      console.log("Data submitted successfully!");
      location.reload();
    } catch (error) {
      console.error("Failed to submit data:", error);
    }
  };

  return (
    <PreferencesForm handleSubmit={handleSubmit}/>
  );
}
