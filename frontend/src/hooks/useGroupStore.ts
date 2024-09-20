import { useSelector } from "react-redux";
import { useAppDispatch } from "./hooks";
import { RootState } from "../store";

import { api } from "../api/api";

import { addGroups } from "../store";

interface FormData {
  groupName: string;
  minAge: number;
  maxAge: number;
  image: string | null;
  users: string;
}

export const useGroupStore = () => {
  const { groups } = useSelector((state: RootState) => state.group);

  const dispatch = useAppDispatch();

  const createGroup = async (formData: FormData) => {
    console.log({ formData });
    const { data } = await api.post("/groups", formData);
    console.log(data);
    dispatch(addGroups(data));
  };

  const getGroups = async () => {
    const {
      data: { groups },
    } = await api.get("/groups");

    console.log(groups);
    dispatch(addGroups(groups));
  };

  return {
    groups,

    createGroup,
    getGroups,
  };
};
