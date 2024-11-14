import { useSelector } from "react-redux";
import Cookies from "js-cookie";

import { api } from "../../api/api";

import { useAppDispatch } from "../hooks";
import {
  onChecking,
  onError,
  onLogin,
  onLogout,
  onUser,
  RootState,
} from "../../store";
import { AxiosError } from "axios";

interface LoginData {
  email: string;
  password: string;
}

export const useAuthStore = () => {
  const { errorMessage, status, user } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useAppDispatch();

  const startLogin = async ({ email, password }: LoginData) => {
    dispatch(onChecking());
    try {
      const {
        data: { id, username, firstTime, genres, likes, dislikes, token, age },
      } = await api.post("/auth/login", { email, password });

      Cookies.set("token", token, { secure: true });
      Cookies.set("token-init-date", new Date().getTime().toString(), {
        secure: true,
      });
      Cookies.set("user", username, { secure: true, expires: 1 });
      Cookies.set("user_id", id, { secure: true, expires: 1 });

      dispatch(
        onLogin({
          id,
          username,
          firstTime,
          age,
          likes,
          dislikes,
          genres,
        })
      );
    } catch (error) {
      const err = error as AxiosError
      
      Cookies.remove("token");
      Cookies.remove("token-init-date");
      Cookies.remove("user");
      Cookies.remove("user_id");
      
      if (err.status == 400) {
        dispatch(onError("Credenciales inválidas"));
      } if (err.status == 500) {
        dispatch(onError("Ocurrió un error inesperado"));
      } else {
        dispatch(onError("Ocurrió un error inesperado"));
      }
      
      dispatch(onLogout());
      console.error(error);
    }
  };

  const checkAuthToken = async () => {
    const token = Cookies.get("token");

    if (!token) return dispatch(onLogout());

    try {
      const {
        data: { id, username, token },
      } = await api.get("/auth/renew");

      Cookies.set("token", token, { secure: true });
      Cookies.set("token-init-date", new Date().getTime().toString(), {
        secure: true,
      });

      dispatch(onLogin({ id, username }));
    } catch (error) {
      Cookies.remove("token");
      Cookies.remove("token-init-date");
      Cookies.remove("user");
      Cookies.remove("user_id");

      dispatch(onLogout());
      console.error(error);
    }
  };

  const getUser = async () => {
    try {
      const id = Cookies.get("user_id");
      const {
        data: { email, username, firstTime, age, likes, dislikes, genres },
      } = await api.get(`/users/${id}`);

      dispatch(
        onUser({
          id,
          email,
          username,
          firstTime,
          age,
          likes,
          dislikes,
          genres,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return {
    errorMessage,
    status,
    user,

    startLogin,
    checkAuthToken,
    getUser,
  };
};
