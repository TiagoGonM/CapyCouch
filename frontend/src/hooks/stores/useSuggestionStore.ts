import { useSelector } from "react-redux";
import Cookies from "js-cookie";

import { useAppDispatch } from "../hooks";

import {
  RootState,
  setSuggestions,
  setMeta,
  setSuggestionLoading,
  setErrorMessage,
} from "../../store";

import { api } from "../../api/api";

interface FormData {
  genres: string[];
  likes: string[];
  dislikes: string[];
}

export const useSuggestionStore = () => {
  const { suggestions, id, type, loading, errorMessage } = useSelector(
    (state: RootState) => state.suggestion
  );
  const dispatch = useAppDispatch();

  const createSuggestion = async (formData: FormData) => {
    dispatch(setSuggestionLoading(true));
    if (type === "group") createGroupSuggestion(formData);
    else createUserSuggestion(formData);
    dispatch(setSuggestionLoading(false));
  };

  const createUserSuggestion = async (formData: FormData) => {
    try {
      const { data } = await api.post("/suggestions", formData);
      console.log(data);
      dispatch(setSuggestions(data));
    } catch (error) {
      setErrorMessage("Error al intentar crear la sugerencia");
      console.error("Error: " + error);
    }
  };

  const createGroupSuggestion = async (formData: FormData) => {
    try {
      const { data } = await api.post(`/suggestions/group/${id}`, formData);
      console.log(data);
      dispatch(setSuggestions(data));
    } catch (error) {
      setErrorMessage("Error al intentar crear la sugerencia");
      console.error("Error: " + error);
    }
  };

  const getSuggestions = async () => {
    try {
      dispatch(setSuggestionLoading(true));
      const {
        data: { suggestions },
      } = await api.get("/suggestions");

      console.log(suggestions);
      dispatch(setSuggestions(suggestions));
      dispatch(setMeta({ type: "user", id: Cookies.get("user_id") as string }));
      dispatch(setSuggestionLoading(false));
    } catch (error) {
      setErrorMessage("Error al intentar obtener las sugerencias");
      console.error("Error: " + error);
    }
  };

  const getSuggestionsById = async (id: string) => {
    try {
      dispatch(setSuggestionLoading(true));
      const {
        data: { prompt: _, suggestions },
      } = await api.get(`/suggestions/group/${id}`);

      dispatch(setMeta({ type: "group", id }));

      dispatch(setSuggestions(suggestions));
    } catch (error) {
      setErrorMessage("Error al intentar obtener las sugerencias");
      console.error("Error: " + error);
    } finally {
      dispatch(setSuggestionLoading(false));
    }
  };

  return {
    suggestions,
    id,
    type,
    loading,
    errorMessage,

    createSuggestion,

    getSuggestions,
    getSuggestionsById,
  };
};
