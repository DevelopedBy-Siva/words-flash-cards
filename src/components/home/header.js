import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

export default function Header() {
  return (
    <div>
      Header
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  );
}
