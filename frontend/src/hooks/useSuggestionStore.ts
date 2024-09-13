import { useSelector } from "react-redux";
import { useAppDispatch } from "./hooks";
import { RootState } from "../store";


export const useSuggestionStore = () => {
    const { suggestions } = useSelector((state: RootState) => state.suggestion);
    
    const dispatch = useAppDispatch();

    return {
        suggestions
    };
}