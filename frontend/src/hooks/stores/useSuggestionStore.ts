import { useSelector } from "react-redux";
import Cookies from "js-cookie";

import { useAppDispatch } from "../hooks";

import { RootState, setSuggestions, setMeta } from "../../store";

import { api } from "../../api/api";

interface FormData {
  genres: string[];
  likes: string[];
  dislikes: string[];
}

export const useSuggestionStore = () => {
  const { suggestions, id, type } = useSelector(
    (state: RootState) => state.suggestion
  );
  const dispatch = useAppDispatch();

  const createSuggestion = async (formData: FormData) => {
    if (type === "group") createGroupSuggestion(formData);
    else createUserSuggestion(formData);
  };

  const createUserSuggestion = async (formData: FormData) => {
    const { data } = await api.post("/suggestions", formData);
    console.log(data);
    dispatch(setSuggestions(data));
  };

  const createGroupSuggestion = async (formData: FormData) => {
    const { data } = await api.post(`/suggestions/group/${id}`, formData);
    console.log(data);
    dispatch(setSuggestions(data));
  };

  const getSuggestions = async () => {
    const {
      data: { suggestions },
    } = await api.get("/suggestions");

    console.log(suggestions);
    dispatch(setSuggestions(suggestions));
    dispatch(setMeta({ type: "user", id: Cookies.get("user_id") as string }));
  };

  const getSuggestionsById = async (id: string) => {
    try {
      const {
        data: { prompt: _, suggestions },
      } = await api.get(`/suggestions/group/${id}`);

      dispatch(setMeta({ type: "group", id }));

      dispatch(setSuggestions(suggestions));
    } catch (error) {
      console.error("Error: " + error);
    }
  };

  return {
    suggestions,
    id,
    type,

    createSuggestion,

    getSuggestions,
    getSuggestionsById,
  };
};
