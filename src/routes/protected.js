import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { isUserPresent } from "../auth";

export default function ProtectedRoutes() {
  return isUserPresent() ? <Outlet /> : <Navigate to="/whoru" replace />;
}
