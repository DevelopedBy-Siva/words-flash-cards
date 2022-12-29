import React from "react";
import { Outlet, Navigate } from "react-router-dom";

import contants from "../assets/contants/constants.json";

export default function ProtectedRoutes() {
  const userPresent = () => {
    const item = localStorage.getItem(contants.storage_key);
    if (!item) return true;
  };

  return userPresent() ? <Outlet /> : <Navigate to="/whoru" replace />;
}
