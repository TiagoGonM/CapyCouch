// TODO: implementacion del hook para los usuarios

import { useSelector } from "react-redux";
import { useAppDispatch } from '../hooks';

import { RootState, setUsers } from "../../store";

import { api } from "../../api/api";

export const useUserStore = () => {
  const { users } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const getUsers = async () => {
    const { data: { users } } = await api.get("/users");
    dispatch(setUsers(users));
  };

  return {
    users,

    getUsers
  }
};
