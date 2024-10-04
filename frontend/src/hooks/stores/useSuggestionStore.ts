import { useSelector } from "react-redux";
import { useAppDispatch } from "../hooks";

import { RootState, addSuggestion } from "../../store";

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
    dispatch(addSuggestion(data));
  };

  const getSuggestions = async () => {
    const {
      data: { suggestions },
    } = await api.get("/suggestions");

    console.log(suggestions);
    dispatch(addSuggestion(suggestions));
  };

  return {
    suggestions,

    createSuggestion,
    getSuggestions,
  };
};
