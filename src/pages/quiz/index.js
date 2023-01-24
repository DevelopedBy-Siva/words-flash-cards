import React, { lazy, Suspense, useState } from "react";
import { useSelector } from "react-redux";

import Wrapper from "../../components/wrapper";
import Header from "../../components/header";
import QuizFormContainer from "./QuizFormContainer";
import QuizNavContainer from "./QuizNavContainer";

const QnAnsContainer = lazy(() => import("./QnAnsContainer"));

export default function Quiz() {
  const [quizQn, setQuizQn] = useState(null);
  const words = useSelector((state) => state.words.words);

  return (
    <Wrapper stretch>
      <Wrapper contain spaceAround>
        <Header name="Quiz" confirmBack={!quizQn ? false : true} />
      </Wrapper>
      <QuizNavContainer
        totalWords={words.length}
        quizQn={quizQn}
        setQuizQns={setQuizQn}
      />
      {!quizQn ? (
        <QuizFormContainer words={words} setQuizQn={setQuizQn} />
      ) : (
        <Suspense>
          <QnAnsContainer quizQn={quizQn} setQuizQn={setQuizQn} />
        </Suspense>
      )}
    </Wrapper>
  );
}
