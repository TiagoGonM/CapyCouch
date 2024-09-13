import React, { useEffect, useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage, LandingPage, LoginForm, RegisterForm, ProfilePage } from "./pages";
import { useAuthStore } from "./hooks/useAuthStore";

// Rutas  

export default function AppRouter() {
  const { status, checkAuthToken } = useAuthStore();
  const isAuthenticated = useMemo(() => status === "authenticated", [status]);

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") {
    return <h3>Cargando...</h3>;
  }

  return (
    <Routes>
      {!isAuthenticated ? (
        <>
          <Route path="/auth/login" element={<LoginForm />} />
          <Route path="/auth/register" element={<RegisterForm />} />
          <Route path="/" element={<LandingPage />} />
          
          // FIXME: for some reason this affects routes like /profile, not being able to navigate to it
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/*" element={<Navigate to="/home" />} />
        </>
      )}
    </Routes>
  );
}
