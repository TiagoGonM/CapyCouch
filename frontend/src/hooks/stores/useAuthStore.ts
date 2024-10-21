import { useSelector } from "react-redux";
import Cookies from "js-cookie";

import { api } from "../../api/api";

import { useAppDispatch } from "../hooks";
import { onChecking, onLogin, onLogout, onUser, RootState } from "../../store";

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
      const { data } = await api.post("/auth/login", { email, password });

      console.log(data);

      Cookies.set("token", data.token, { secure: true });
      Cookies.set("token-init-date", new Date().getTime().toString(), {
        secure: true,
      });
      Cookies.set("user", data.username, { secure: true, expires: 1 });
      Cookies.set("user_id", data.id, { secure: true, expires: 1 });

      dispatch(
        onLogin({
          id: data.id,
          username: data.username,
          firstTime: true,
        })
      );
    } catch (error) {
      Cookies.remove("token");
      Cookies.remove("token-init-date");
      Cookies.remove("user");
      Cookies.remove("user_id");

      dispatch(onLogout());
      console.error(error);
    }
  };

  const checkAuthToken = async () => {
    const token = Cookies.get("token");

    if (!token) return dispatch(onLogout());

    try {
      const { data } = await api.get("/auth/renew");

      Cookies.set("token", data.token, { secure: true });
      Cookies.set("token-init-date", new Date().getTime().toString(), {
        secure: true,
      });

      dispatch(onLogin({ id: data.id, username: data.username }));
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
      const { data } = await api.get(`/users/${id}`);

      dispatch(
        onUser({
          email: data.email,
          username: data.username,
          firstTime: true,
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
