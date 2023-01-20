import React, { lazy } from "react";
import { Navigate } from "react-router-dom";

import { isUserPresent } from "../../utils/User";

const Container = lazy(() => import("./Container"));

export default function Whoru() {
  return isUserPresent() ? <Navigate to="/" replace /> : <Container />;
}
