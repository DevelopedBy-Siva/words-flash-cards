import React from "react";
import styled from "styled-components";

import Wrapper from "../../components/wrapper";

export default function ScoreContainer({ myScore }) {
  const { score, total, wrongWords } = myScore;

  return (
    <Wrapper contain spaceAround grow>
      <Container>
        <Score className={score >= total / 2 ? "" : "failed"}>
          {score} &#47; {total}
        </Score>
        <ScoreBreakupContainer>
          <ScoreBreakup label="correct" value={score} />
          <ScoreBreakup label="wrong" value={wrongWords.length} />
        </ScoreBreakupContainer>
        {wrongWords.length > 0 ? <WrongWordContainer></WrongWordContainer> : ""}
      </Container>
    </Wrapper>
  );
}

function ScoreBreakup({ label, value }) {
  return (
    <Breakup>
      <BreakupLabel>{label}</BreakupLabel>
      <BreakupValue>{value}</BreakupValue>
    </Breakup>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  height: 300px;
  margin: 0 auto;
  margin-top: 20px;
`;

const Score = styled.div`
  padding: 5px;
  width: 210px;
  height: 210px;
  text-align: center;
  border-radius: 50%;
  background-color: ${(props) => props.theme.button.green};
  color: ${(props) => props.theme.text.light};
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  font-size: 1.7rem;
  margin: auto;

  &.failed {
    background-color: ${(props) => props.theme.button.red};
  }
`;

const ScoreBreakupContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 50px auto;
  border-bottom: 1px solid ${(props) => props.theme.border.default};
`;

const Breakup = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 18px;
  color: ${(props) => props.theme.text.light};
`;

const BreakupLabel = styled.span`
  text-transform: capitalize;
  letter-spacing: 1px;
`;

const BreakupValue = styled.span`
  letter-spacing: 1px;
`;

const WrongWordContainer = styled.div``;
