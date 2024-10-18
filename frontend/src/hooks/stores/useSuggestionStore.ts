import { useSelector } from "react-redux";
import { useAppDispatch } from "../hooks";

import { RootState, setSuggestions } from "../../store";

import { api } from "../../api/api";

interface FormData {
  genres: string;
  likes: string;
  dislikes: string;
}

export const useSuggestionStore = () => {
  const { suggestions } = useSelector((state: RootState) => state.suggestion);
  const dispatch = useAppDispatch();

  const createSuggestion = async (formData: FormData) => {
    const { data } = await api.post("/suggestions", formData);
    console.log(data);
    dispatch(setSuggestions(data));
  };

  const getSuggestions = async () => {
    const {
      data: { suggestions },
    } = await api.get("/suggestions");

    console.log(suggestions);
    dispatch(setSuggestions(suggestions));
  };

  const getSuggestionsById = async (id: string) => {
    try {
      const {
        data: { suggestions, ok },
      } = await api.get(`/suggestions/${id}`);
      
      if (!ok) {
        dispatch(setSuggestions([]));
        return;
      }
  
      dispatch(setSuggestions(suggestions));
      return suggestions;
    } catch (error) {
      console.error("Error: " + error);
    }

  }

  return {
    suggestions,

    createSuggestion,
    getSuggestions,
    getSuggestionsById
  };
};
