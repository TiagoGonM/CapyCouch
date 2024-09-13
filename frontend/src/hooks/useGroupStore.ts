import { useSelector } from "react-redux";
import { useAppDispatch } from "./hooks";
import { RootState } from "../store";


export const useGroupStore = () => {
    const { groups } = useSelector((state: RootState) => state.group)
    
    const dispatch = useAppDispatch();

    return {
        groups
    };
};