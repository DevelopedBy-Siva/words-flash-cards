import React, { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Protected = lazy(() => import("./protected"));
const Wrapper = lazy(() => import("../components/wrapper"));
const Home = lazy(() => import("../pages/home"));
const Words = lazy(() => import("../pages/words"));
const Quiz = lazy(() => import("../pages/quiz"));
const History = lazy(() => import("../pages/history"));
const Whoru = lazy(() => import("../pages/whoru"));

export default function RouteContainer() {
  return (
    <Routes>
      <Route element={<Protected />}>
        <Route element={<Wrapper />}>
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
