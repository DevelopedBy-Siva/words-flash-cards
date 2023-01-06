import React, { useEffect, useState } from "react";
import Wrapper from "../../components/wrapper";

import words from "../../assets/data/words.json";
import { randomUnique, questionObject } from "../../utils/QuizGenerator";

export default function QnAnsContainer({ formInput }) {
  const [questions, setQuestions] = useState({
    indexes: [],
    question: [],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const { value, latestWords } = formInput;

    const total_words = words.length;
    if (total_words < 4) window.location = "/";
    let range = [0, total_words];
    if (latestWords) {
      range = [total_words - value, total_words];
    }
    if (range[1] - range[0] < value) return (window.location = "/quiz");

    /*
     Get Random indexes within a range
    */
    const indexes = randomUnique(value, ...range);
    const question = questionObject(indexes[0]);

    indexes.shift();

    setQuestions({ indexes, question: [{ ...question }] });
  }, [formInput]);

  function nextQuestion() {
    const new_questions = { ...questions };
    if (new_questions.indexes.length === 0) return alert("DONE");

    /*
     * Generate Question object
     */
    const question = questionObject(new_questions.indexes[0]);

    new_questions.question.push(question);
    new_questions.indexes.shift();
    setQuestions({ ...new_questions });
  }

  console.log(questions);

  return (
    <Wrapper contain spaceAround grow>
      <button onClick={nextQuestion}>Click</button>
    </Wrapper>
  );
}
