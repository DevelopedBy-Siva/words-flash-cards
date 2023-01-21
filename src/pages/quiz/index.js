import React, { lazy, Suspense, useEffect, useState } from "react";

import Wrapper from "../../components/wrapper";
import Header from "../../components/header";
import QuizFormContainer from "./QuizFormContainer";
import QuizNavContainer from "./QuizNavContainer";
import { useDispatch, useSelector } from "react-redux";
import { initialiseWords } from "../../redux/reducer/Words";

const QnAnsContainer = lazy(() => import("./QnAnsContainer"));

export default function Quiz() {
  const [proceed, setProceed] = useState(false);
  const [formInput, setFormInput] = useState({
    value: "",
    latestWords: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialiseWords());
  }, [dispatch]);

  const words = useSelector((state) => state.words.words);

  return (
    <Wrapper stretch>
      <Wrapper contain spaceAround>
        <Header name="Quiz" />
      </Wrapper>
      <QuizNavContainer totalWords={words.length} proceed={proceed} />
      {!proceed ? (
        <QuizFormContainer
          formInput={formInput}
          setFormInput={setFormInput}
          proceed={proceed}
          setProceed={setProceed}
          totalWords={words.length}
        />
      ) : (
        <Suspense>
          <QnAnsContainer formInput={formInput} />
        </Suspense>
      )}
    </Wrapper>
  );
}
