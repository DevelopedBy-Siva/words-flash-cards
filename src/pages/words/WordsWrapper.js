import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { initialiseWords } from "../../redux/reducer/Words";
import Indicators from "./Indicators";

const WordsContainer = lazy(() => import("./WordsContainer"));

export default function WordsWrapper() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialiseWords());
  }, [dispatch]);

  const initializing = useSelector((state) => state.words.loading);

  return initializing ? (
    <Indicators loading />
  ) : (
    <Suspense>
      <WordsContainer />
    </Suspense>
  );
}
