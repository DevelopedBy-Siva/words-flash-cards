import React, { Suspense } from "react";
import { Outlet, Navigate } from "react-router-dom";

import PageLoader from "../components/loader/PageLoader";
import { isUserPresent } from "../utils/User";

export default function ProtectedRoutes() {
  return isUserPresent() ? (
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to="/whoru" replace />
  );
}
