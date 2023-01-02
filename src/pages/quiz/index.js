import React from "react";
import styled from "styled-components";

import Wrapper from "../../components/wrapper";
import Header from "../../components/header";
import FontSize from "../../assets/styles/FontSizes.json";

export default function Quiz() {
  return (
    <Wrapper stretch>
      <Wrapper contain spaceAround>
        <Header name="Quiz" />
      </Wrapper>
      <Wrapper contain spaceAround border right>
        <AvailableWordsContainer>
          <AvailableWordsHead>Available Words:</AvailableWordsHead>
          <AvailableWords>500</AvailableWords>
        </AvailableWordsContainer>
      </Wrapper>
    </Wrapper>
  );
}

const AvailableWordsContainer = styled.div`
  color: ${(props) => props.theme.text.light};
`;

const AvailableWordsHead = styled.span`
  font-size: ${FontSize.QUIZ.HM_HEAD_SM};
  letter-spacing: 1px;
  text-transform: capitalize;
`;

const AvailableWords = styled.span`
  font-size: ${FontSize.QUIZ.HM_HEAD_LG};
  letter-spacing: 2px;
  margin-left: 8px;
  font-weight: 700;
`;
