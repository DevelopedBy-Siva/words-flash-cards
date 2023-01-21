import React from "react";
import styled from "styled-components";

import Wrapper from "../../components/wrapper";
import FontSize from "../../assets/styles/FontSizes.json";

export default function QuizNavContainer({ totalWords, proceed }) {
  return (
    <Wrapper contain spaceAround border right={!proceed}>
      {!proceed ? QuizFormNavContainer(totalWords) : QnAnsNavContainer()}
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

function QnAnsNavContainer() {
  return (
    <QnAnsNav>
      <QnAnsNavQnTrack>2 &#47; 20</QnAnsNavQnTrack>
      <QnAnsNavBtn>Next</QnAnsNavBtn>
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
  font-weight: 500;
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
