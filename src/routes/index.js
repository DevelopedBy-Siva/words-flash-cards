import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import PageLoader from "../components/loader/PageLoader";
import Protected from "../routes/protected";

const Home = lazy(() => import("../pages/home"));
const Words = lazy(() => import("../pages/words"));
const Quiz = lazy(() => import("../pages/quiz"));
const History = lazy(() => import("../pages/history"));
const Whoru = lazy(() => import("../pages/whoru"));
const Score = lazy(() => import("../pages/score"));

export default function RouteContainer() {
  return (
    <Routes>
      <Route element={<Protected />}>
        <Route path="/" element={<Home />} />
        <Route path="/words" element={<Words />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/score" element={<Score />} />
        <Route path="/history" element={<History />} />
      </Route>
      <Route
        path="/whoru"
        element={
          <Loader>
            <Whoru />
          </Loader>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function Loader({ children }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}
