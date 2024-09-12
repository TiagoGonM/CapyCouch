import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "./hooks";
import { api } from "../api/api";
import { onChecking, RootState } from "../store";

interface LoginData {
  email: string;
  password: string;
}

export const useAuthStore = () => {
  const { errorMessage, status, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  
  const startLogin = async ({ email, password }: LoginData) => {
    dispatch(onChecking());
    try {
      const { data } = await api.post("/auth/login", { email, password });
      
      console.log(data);

    } catch (error) {
      console.error(error);
    }
  }

  return {
    errorMessage,
    status,
    user,

    startLogin
  };
};
