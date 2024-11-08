import React, { useState } from "react";

import Select from "react-select";

import Cookies from "js-cookie";

import { Button } from "../components/ui";
import { genres } from "../utils";

import { api } from "../api/api";
import { Option } from "../interfaces/interfaces";
import { style } from "../styles/select.style";
import { catalogue } from "../utils";

type Props = {
  handleSubmit: (
    selectedGenres: Option[],
    selectedLikes: Option[] | undefined,
    selectedDislikes: Option[] | undefined
  ) => void;
  defaultGenresValues?: string[];
  defaultLikesValues?: string[];
  defaultDislikesValues?: string[];
};

export const PreferencesForm = ({
  handleSubmit,
  defaultGenresValues,
  defaultLikesValues,
  defaultDislikesValues,
}: Props) => {
  const [selectedGenres, setSelectedGenres] = useState<Option[]>();
  const [selectedLikes, setSelectedLikes] = useState<Option[]>();
  const [selectedDislikes, setSelectedDislikes] = useState<Option[]>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const onSubmit = () => {
    if (!selectedGenres?.length) {
      setErrorMessage("empty-genres");
    }

    handleSubmit(selectedGenres as Option[], selectedLikes, selectedDislikes);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="genres"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Géneros
        </label>
        <Select
          options={genres.map((genre) => ({
            value: genre,
            label: genre,
            color: "#000",
          }))}
          defaultValue={defaultGenresValues?.map((genre) => ({
            value: genre,
            label: genre,
            color: "#333",
          }))}
          isMulti
          isSearchable
          closeMenuOnSelect={false}
          name="genres"
          onChange={(selected) => {
            setSelectedGenres(selected as Option[]);
          }}
          styles={style}
        />
      </div>

      <div>
        <label
          htmlFor="likes"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Películas/series que le gustan
        </label>
        <Select
          options={catalogue.map((media) => ({
            value: media,
            label: media,
            color: "#000",
          }))}
          defaultValue={defaultLikesValues?.map((media) => ({
            value: media,
            label: media,
            color: "#333",
          }))}
          isMulti
          isSearchable
          closeMenuOnSelect={false}
          name="likes"
          onChange={(selected) => {
            setSelectedLikes(selected as Option[]);
          }}
          styles={style}
        />
      </div>

      <div>
        <label
          htmlFor="dislikes"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Películas/series que no le gustan
        </label>
        <Select
          options={catalogue
            .filter((media) => !selectedLikes?.find((el) => media === el.value))
            .map((media) => ({
              value: media,
              label: media,
              color: "#000",
            }))}
          defaultValue={defaultDislikesValues?.map((media) => ({
            value: media,
            label: media,
            color: "#333",
          }))}
          isMulti
          isSearchable
          closeMenuOnSelect={false}
          name="dislikes"
          onChange={(selected) => {
            setSelectedDislikes(selected as Option[]);
          }}
          styles={style}
        />
      </div>

      <Button type="submit" value="Guardar" />
    </form>
  );
};
