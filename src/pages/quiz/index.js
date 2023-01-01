import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import QuizContainer from "./Container";

export default function Quiz() {
  const { state } = useLocation();

  return state ? (
    <QuizContainer wordCount={state} />
  ) : (
    <Navigate to="/" replace />
  );
}
