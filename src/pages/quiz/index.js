import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function Quiz() {
  const { state } = useLocation();

  return state ? <div>Quiz: {state}</div> : <Navigate to="/" replace />;
}
