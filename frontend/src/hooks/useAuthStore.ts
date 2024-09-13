import { useSelector } from "react-redux";
import { useAppDispatch } from "./hooks";
import { api } from "../api/api";
import { onChecking, onLogin, onLogout, RootState } from "../store";

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
      dispatch(onLogin({ id: data.id, username: data.username }));
      
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
    } catch (error) {
      dispatch(onLogout());
      console.error(error);
    }
  }

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
  
    if (!token) return dispatch(onLogout());
  
    try {
      const { data } = await api.get("/auth/renew");
  
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
  
      dispatch(onLogin({ id: data.id, username: data.username }));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  }

  return {
    errorMessage,
    status,
    user,

    startLogin,
    checkAuthToken
  };
};

