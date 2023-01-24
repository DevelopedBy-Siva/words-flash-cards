import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";

import Indicators from "./Indicators";

const WordsContainer = lazy(() => import("./WordsContainer"));

export default function WordsWrapper() {
  const initializing = useSelector((state) => state.words.loading);

  if (initializing) return <Indicators loading />;
  return (
    <Suspense fallback={<Indicators loading />}>
      <WordsContainer />
    </Suspense>
  );
}
