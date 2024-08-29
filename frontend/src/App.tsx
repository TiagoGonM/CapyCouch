import React from "react";
import { Route, Routes } from "react-router-dom";
import { LandingPage, LoginForm, RegisterForm } from "./pages";

// Rutas

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth/login" element={<LoginForm />} />
      <Route path="/auth/register" element={<RegisterForm />} />
    </Routes>
  );
}
