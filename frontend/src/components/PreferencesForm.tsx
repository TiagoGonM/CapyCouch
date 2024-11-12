import React, { useState } from "react";

import Select from "react-select";
import { genres } from "../utils";

import { Option } from "../interfaces/interfaces";
import { style } from "../styles/select.style";
import { catalogue } from "../utils";

type Props = {
  handleSelectedGenres: (selectedGenres: Option[]) => void;
  handleSelectedLikes: (selectedLikes: Option[]) => void;
  handleSelectedDislikes: (selectedDislikes: Option[]) => void;
  defaultGenresValues?: string[];
  defaultLikesValues?: string[];
  defaultDislikesValues?: string[];
};

export const PreferencesForm = ({
  handleSelectedGenres,
  handleSelectedLikes,
  handleSelectedDislikes,

  defaultGenresValues,
  defaultLikesValues,
  defaultDislikesValues,
}: Props) => {
  const [selectedGenres, setSelectedGenres] = useState<Option[]>();
  const [selectedLikes, setSelectedLikes] = useState<Option[]>();
  const [selectedDislikes, setSelectedDislikes] = useState<Option[]>();
  const [errorMessage, setErrorMessage] = useState<string>();

  return (
    <>
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
            handleSelectedGenres(selected as Option[]);
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
            handleSelectedLikes(selected as Option[]);
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
            handleSelectedDislikes(selected as Option[]);
          }}
          styles={style}
        />
      </div>
    </>
  );
};
