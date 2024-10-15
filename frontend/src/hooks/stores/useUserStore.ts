// TODO: implementacion del hook para los usuarios

import { useSelector } from "react-redux";
import { useAppDispatch } from '../hooks';

import { RootState, setLoading, setUsers } from "../../store";

import { api } from "../../api/api";

export const useUserStore = () => {
  const initState = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const getUsers = async () => {
    dispatch(setLoading(true));
    const { data: { users } } = await api.get("/users");
    dispatch(setUsers(users));
    dispatch(setLoading(false));
  };
  
  const getUsersByCoincidence = async (coincidence: string) => {
    dispatch(setLoading(true));
    const { data: { users } } = await api.get(`/users?coincidence=${coincidence}`);
    dispatch(setUsers(users));
    dispatch(setLoading(false));
  }

  return {
    ...initState,

    getUsers,
    getUsersByCoincidence,
  }
};
