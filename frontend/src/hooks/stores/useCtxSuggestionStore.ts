import { useSelector } from "react-redux";
import { useAppDispatch } from "../hooks";

import { RootState } from "../../store";

export const useCtxSuggestionStore = () => {
  const { type, id } = useSelector((state: RootState) => state.ctxSuggestion);
  const dispatch = useAppDispatch();


  return {
    type,
    id


  };
}