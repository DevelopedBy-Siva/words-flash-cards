import React from "react";
import styled from "styled-components";

import Wrapper from "../../components/wrapper";
import FontSize from "../../assets/styles/FontSizes.json";
import { useDispatch, useSelector } from "react-redux";
import { generateNextQuestion } from "../../redux/actions";

export default function QuizNavContainer({ totalWords, proceed }) {
  const dispatch = useDispatch();

  const { question } = useSelector((state) => state.questions);

  function isBtnDisabled() {
    if (question[question.length].myChoice === null) return true;
    return false;
  }

  function nextQuestion() {
    dispatch(generateNextQuestion());
  }

  return (
    <Wrapper contain spaceAround border right={!proceed}>
      {!proceed
        ? QuizFormNavContainer(totalWords)
        : QnAnsNavContainer(nextQuestion, isBtnDisabled)}
    </Wrapper>
  );
}

function QuizFormNavContainer(totalWords) {
  return (
    <QuizFormNav>
      <AvailableWordsHead>Available Words:</AvailableWordsHead>
      <AvailableWords>{totalWords}</AvailableWords>
    </QuizFormNav>
  );
}

function QnAnsNavContainer(nextQuestion, isBtnDisabled) {
  return (
    <QnAnsNav>
      <QnAnsNavQnTrack>2 &#47; 20</QnAnsNavQnTrack>
      <QnAnsNavBtn disabled={isBtnDisabled()} onClick={nextQuestion}>
        Next
      </QnAnsNavBtn>
    </QnAnsNav>
  );
}

const QuizFormNav = styled.div`
  color: ${(props) => props.theme.text.light};
`;

const AvailableWordsHead = styled.span`
  font-size: ${FontSize.QUIZ.QZ_HEAD_SM};
  letter-spacing: 1px;
  text-transform: capitalize;
`;

const AvailableWords = styled.span`
  font-size: ${FontSize.QUIZ.QZ_HEAD_LG};
  letter-spacing: 2px;
  margin-left: 8px;
  font-weight: 700;
`;

const QnAnsNav = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  position: relative;
`;

const QnAnsNavBtn = styled.button`
  background: none;
  outline: none;
  border: none;
  background: ${(props) => props.theme.button.green};
  color: ${(props) => props.theme.text.light};
  padding: 6px 10px;
  border-radius: 4px;
  letter-spacing: 1px;
  font-size: ${FontSize.QUIZ.QN_NAV_BTN};
  cursor: pointer;
  margin-left: auto;
`;

const QnAnsNavQnTrack = styled.span`
  display: inline-block;
  font-size: ${FontSize.QUIZ.QN_NAV_COUNT};
  color: ${(props) => props.theme.text.light};
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  user-select: none;
`;
