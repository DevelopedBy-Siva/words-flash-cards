import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import Wrapper from "../../components/wrapper";
import Header from "../../components/header";
import ScoreContainer from "./ScoreContainer";

export default function Score() {
  const { state } = useLocation();

  if (!state) return <Navigate to="/" replace />;
  return (
    <Wrapper stretch>
      <Wrapper contain spaceAround>
        <Header name="Score" />
      </Wrapper>
      <ScoreContainer myScore={state} />
    </Wrapper>
  );
}
