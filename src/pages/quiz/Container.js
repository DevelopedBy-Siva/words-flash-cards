import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Wrapper from "../../components/wrapper";
import Header from "../../components/header";
import FontSizes from "../../assets/styles/FontSizes.json";
import words from "../../assets/data/words.json";

export default function QuizContainer({ wordCount }) {
  const [question, setQuestion] = useState({
    words: [],
    count: 1,
  });

  useEffect(() => {
    function getWords() {
      const indexes = randomUnique(words.length, parseInt(wordCount));
      const questions = [];
      indexes.forEach((index) => {
        questions.push(words[index]);
      });
      return [...questions];
    }
    setQuestion({ ...question, words: getWords() });
  }, [wordCount]);

  const randomUnique = (range, count) => {
    let nums = new Set();
    while (nums.size < count) {
      nums.add(Math.floor(Math.random() * range));
    }
    return [...nums];
  };

  function nextQuestion() {
    const qn = { ...question };
    qn.count += 1;
    setQuestion({ ...qn });
  }

  console.log(question);

  return (
    <Wrapper cover isBox={false}>
      <Wrapper>
        <Header name="Quiz" />
      </Wrapper>
      <Wrapper contentBreak>
        <QnDetails>
          <QnButton onClick={nextQuestion}>Next</QnButton>
          <QnCount>
            {question.count} &#47; {wordCount}
          </QnCount>
        </QnDetails>
      </Wrapper>
    </Wrapper>
  );
}

const QnButton = styled.button`
  border: none;
  outline: none;
  background: ${(props) => props.theme.button.green};
  color: ${(props) => props.theme.text.light};
  padding: 6px 8px;
  border-radius: 5px;
  font-size: ${FontSizes.QUIZ.QN_BTN};
  letter-spacing: 1px;
  cursor: pointer;
`;

const QnCount = styled.span`
  display: block;
  color: white;
  font-size: ${FontSizes.QUIZ.QN_COUNT};
`;

const QnDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
