import React, { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const ProtectedRoutes = lazy(() => import("./protected"));
const Header = lazy(() => import("../components/home/header"));
const Home = lazy(() => import("../components/home"));
const Words = lazy(() => import("../components/words"));
const Quiz = lazy(() => import("../components/quiz"));
const History = lazy(() => import("../components/history"));
const Whoru = lazy(() => import("../components/whoru"));

export default function RouteContainer() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/" element={<Header />}>
          <Route path="/" element={<Home />} />
          <Route path="/words" element={<Words />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/history" element={<History />} />
        </Route>
      </Route>
      <Route path="/whoru" element={<Whoru />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
