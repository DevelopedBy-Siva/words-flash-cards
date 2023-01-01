import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import Wrapper from "../../components/wrapper";
import Header from "../../components/header";

export default function Quiz() {
  const { state } = useLocation();

  return state ? (
    <Wrapper>
      <Header name="Quiz" />
    </Wrapper>
  ) : (
    <Navigate to="/" replace />
  );
}
