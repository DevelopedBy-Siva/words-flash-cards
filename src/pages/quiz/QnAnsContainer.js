import React, { useEffect } from "react";
import styled from "styled-components";

import Wrapper from "../../components/wrapper";
import { optionNumber } from "../../utils/QuizGenerator";

export default function QnAnsContainer({ quizQn, setQuizQn }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { currentQn, qns } = quizQn;
  const { name, options, myChoice, status, answer } = qns[currentQn];

  function handleMyChoice(ansIndex) {
    if (status !== null) return;
    const newQuizQn = [...qns];
    newQuizQn[currentQn].myChoice = ansIndex;
    setQuizQn({ ...quizQn, qns: [...newQuizQn] });
  }

  const myChoiceStatusClassName =
    status === true ? "choice-correct" : status === false ? "choice-wrong" : "";
  const correctChoiceStatusClassName = status === false ? answer : null;

  return (
    <Wrapper contain spaceAround grow>
      <QuestionContainer>
        <WordName>{name}</WordName>
        {options.map((opt, index) => (
          <Options
            onClick={() => handleMyChoice(index)}
            key={index}
            index={index}
            active={myChoice === index}
            disabled={status !== null ? true : false}
            className={`${myChoice !== index ? "option-not-active" : ""} ${
              myChoice === index ? myChoiceStatusClassName : ""
            } ${
              index === correctChoiceStatusClassName ? "choice-correct" : ""
            }`}
          >
            <OptionsNumber active={myChoice === index} index={index}>
              {optionNumber(index)}
            </OptionsNumber>
            <OptionValue>{opt}</OptionValue>
          </Options>
        ))}
      </QuestionContainer>
    </Wrapper>
  );
}

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const WordName = styled.h1`
  color: ${(props) => props.theme.text.light};
  margin: 42px 0;
  letter-spacing: 2px;
  font-size: 2.2rem;
  text-transform: capitalize;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (max-width: 800px) {
    font-size: 1.6rem;
  }
`;

const OptionsNumber = styled.span`
  margin-right: 15px;
  background-color: ${(props) =>
    props.active
      ? props.theme.background.quiz.default
      : props.theme.background.application};
  color: ${(props) =>
    props.active ? props.theme.text.default : props.theme.text.light};
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  text-transform: uppercase;
  font-weight: 700;
  flex-shrink: 0;
`;

const Options = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  background: ${(props) =>
    props.active
      ? props.theme.background.quiz.selected
      : props.theme.background.quiz.default};
  color: ${(props) =>
    props.active ? props.theme.text.light : props.theme.text.default};
  width: 100%;
  max-width: 700px;
  margin-bottom: 15px;
  border-radius: 5px;
  padding: 12px 18px;
  font-size: 0.9rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;

  &:disabled {
    cursor: not-allowed;
  }

  &.option-not-active:hover:enabled {
    background: #d2e5f7;
  }

  &.choice-correct {
    background: ${(props) => props.theme.button.green};
    color: ${(props) => props.theme.text.light};
  }

  &.choice-wrong {
    background: ${(props) => props.theme.button.red};
    color: ${(props) => props.theme.text.light};
  }
`;

const OptionValue = styled.p`
  text-align: justify;
`;
