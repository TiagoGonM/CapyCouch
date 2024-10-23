import React, { useEffect, useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// IDFK why this is broken now tbh
// import {
//   HomePage,
//   LandingPage,
//   LoginPage,
//   RegisterPage,
//   ProfilePage,
//   GroupsPage,
//   GenrePage,
// } from "./pages";

import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import GroupsPage from "./pages/GroupsPage";
import GenrePage from "./pages/GenrePage";

import { useAuthStore } from "./hooks/stores";

// Rutas

export default function AppRouter() {
  const { status, checkAuthToken, user: {firstTime} } = useAuthStore();
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
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/genre" element={<GenrePage />} />
          {firstTime && (<Route path="/*" element={<Navigate to="/genre" />} />)}
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/groups" element={<GroupsPage />} />
          <Route path="/*" element={<Navigate to="/home" />} />
        </>
      )}
    </Routes>
  );
}
