import React, { Suspense } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { isUserPresent } from "../utils/User";

export default function ProtectedRoutes() {
  return isUserPresent() ? (
    <Suspense>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to="/whoru" replace />
  );
}
