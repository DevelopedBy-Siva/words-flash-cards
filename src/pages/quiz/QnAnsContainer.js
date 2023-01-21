import React, { useEffect } from "react";
import styled from "styled-components";

import Wrapper from "../../components/wrapper";
import { optionNumber } from "../../utils/QuizGenerator";

export default function QnAnsContainer({ quizQn, setQuizQn }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { currentQn, qns } = quizQn;
  const { name, options } = qns[currentQn];

  return (
    <Wrapper contain spaceAround grow>
      <QuestionContainer>
        <WordName>{name}</WordName>
        {options.map((opt, index) => (
          <Options key={index} index={index}>
            <OptionsNumber index={index}>{optionNumber(index)}</OptionsNumber>
            {opt}
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
    props.active === props.index
      ? props.theme.background.quiz.default
      : props.theme.background.application};
  color: ${(props) =>
    props.active === props.index
      ? props.theme.text.default
      : props.theme.text.light};
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  text-transform: uppercase;
  font-weight: 700;
  transition: all 0.2s ease-in;
`;

const Options = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  background: ${(props) =>
    props.active === props.index
      ? props.theme.background.quiz.selected
      : props.theme.background.quiz.default};
  color: ${(props) =>
    props.active === props.index
      ? props.theme.text.light
      : props.theme.text.default};
  width: 100%;
  max-width: 700px;
  height: 55px;
  margin-bottom: 12px;
  border-radius: 5px;
  padding: 4px 8px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  text-transform: capitalize;

  transition: all 0.2s ease-in;

  &:hover {
    transform: scale(0.98);
  }
`;
