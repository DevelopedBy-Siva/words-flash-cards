import React, { lazy, Suspense, useState } from "react";

import Wrapper from "../../components/wrapper";
import Header from "../../components/header";
import words from "../../assets/data/words.json";
import QuizFormContainer from "./QuizFormContainer";
import QuizNavContainer from "./QuizNavContainer";

const QnAnsContainer = lazy(() => import("./QnAnsContainer"));

const TOTAL_WORDS = words.length;

export default function Quiz() {
  const [proceed, setProceed] = useState(false);
  const [formInput, setFormInput] = useState({
    value: "",
    latestWords: false,
  });

  const [question, setQuestion] = useState({
    currentQuestion: 1,
    questions: [
      {
        options: [],
        correctAnswer: "",
        myAnswer: "",
      },
    ],
  });

  return (
    <Wrapper stretch>
      <Wrapper contain spaceAround>
        <Header name="Quiz" />
      </Wrapper>
      <QuizNavContainer totalWords={TOTAL_WORDS} proceed={proceed} />
      {!proceed ? (
        <QuizFormContainer
          formInput={formInput}
          setFormInput={setFormInput}
          proceed={proceed}
          setProceed={setProceed}
          totalWords={TOTAL_WORDS}
        />
      ) : (
        <Suspense>
          <QnAnsContainer
            formInput={formInput}
            question={question}
            setQuestion={setQuestion}
          />
        </Suspense>
      )}
    </Wrapper>
  );
}
