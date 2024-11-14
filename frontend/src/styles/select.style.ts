import { GroupBase, StylesConfig } from "react-select";

import { Option } from "../interfaces/interfaces";

export const style: StylesConfig<Option, true, GroupBase<Option>> = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#2d2d2d",
    color: "#fff",
    border: "2px solid #b5bec5",
    borderRadius: "0.5rem",
  }),
  option: (styles) => ({
    ...styles,
    backgroundColor: "#2d2d2d",
    color: "#fff",
    ":hover": {
        backgroundColor: "#505050",
    }
  }),
  placeholder: (styles) => ({
    ...styles,
    color: "#808080",
  }),
  input: (styles) => ({
    ...styles,
    color: "#fff",
  }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: "#505050",
    borderRadius: "1rem",
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: "#fff",
    alignSelf: "center",
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    borderRadius: "0rem 1rem 1rem 0rem",
  }),
  noOptionsMessage: (styles) => ({
    ...styles,
    backgroundColor: "#2d2d2d",
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: "#2d2d2d",
  }),
};
