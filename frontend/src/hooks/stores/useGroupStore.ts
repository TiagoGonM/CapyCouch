import { useSelector } from "react-redux";
import { useAppDispatch } from "../hooks";
import { RootState } from "../../store/store";
import { addGroups, setGroupLoading as setLoading } from "../../store";

import { api } from "../../api/api";

interface FormData {
  groupName: string;
  minAge: number;
  maxAge: number;
  image: string | null;
  users: string[];
}

export const useGroupStore = () => {
  const { groups, loading } = useSelector((state: RootState) => state.group);

  const dispatch = useAppDispatch();

  const createGroup = async (formData: FormData) => {
    dispatch(setLoading(true));
    console.log({ formData });
    const { data } = await api.post("/groups", formData);
    console.log(data);
    dispatch(addGroups(data));
    dispatch(setLoading(false));
  };
  
  const getGroups = async () => {
    
    dispatch(setLoading(true));
    const {
      data: { groups },
    } = await api.get("/groups");
    
    console.log(groups);
    dispatch(addGroups(groups));
    dispatch(setLoading(false));
  };

  return {
    groups,
    loading,

    createGroup,
    getGroups,
  };
};
