import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Indicators from "./Indicators";
import { initialiseWords } from "../../redux/reducer/Words";

const WordsContainer = lazy(() => import("./WordsContainer"));

export default function WordsWrapper() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialiseWords());
  }, [dispatch]);

  const initializing = useSelector((state) => state.words.loading);

  if (initializing) return <Indicators loading />;
  return (
    <Suspense fallback={<Indicators loading />}>
      <WordsContainer />
    </Suspense>
  );
}
