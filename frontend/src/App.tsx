import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage, LandingPage, LoginForm, RegisterForm } from "./pages";
import { useAuthStore } from "./hooks/useAuthStore";

// Rutas  

export default function AppRouter() {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") {
    return <h3>Cargando...</h3>;
  }

  return (
    <Routes>
      {status === "not-authenticated" ? (
        <>
          <Route path="/auth/login" element={<LoginForm />} />
          <Route path="/auth/register" element={<RegisterForm />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
          <Route path="/" element={<LandingPage />} />
        </>
      ) : (
        <>
          <Route path="/home" element={<HomePage />} />
          <Route path="/*" element={<Navigate to="/home" />} />
        </>
      )}
    </Routes>
  );
}
