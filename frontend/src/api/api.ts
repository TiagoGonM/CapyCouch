import axios from "axios";

const baseURL =
  import.meta.env.VITE_ENV === "local"
    ? "http://localhost:3000/api"
    : "https://https://shiny-palm-tree-94j47gq9v4pcxwvx-3000.app.github.dev/api";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
});
