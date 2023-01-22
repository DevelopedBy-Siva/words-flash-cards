import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";

import Wrapper from "../../components/wrapper";

export default function ScoreContainer({ myScore }) {
  const { score, total, wrongWords } = myScore;

  function sliceIntoChunks() {
    const chunkSize = Math.ceil(wrongWords.length / 2);
    const res = [];
    for (let i = 0; i < wrongWords.length; i += chunkSize) {
      const chunk = wrongWords.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  }

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
        {sliceIntoChunks().length > 0 ? (
          <React.Fragment>
            <WrongWordsTitle>&#60; Wrong Words &#62;</WrongWordsTitle>
            <WrongWordContainer>
              {sliceIntoChunks().map((chunk, chunkIndex) => (
                <WrongWordsSubContainer key={chunkIndex}>
                  {chunk.map((wd, wdIndex) => (
                    <WrongWord key={wdIndex}>
                      <WdLink to={`/words?search=${wd}`} target="_blank">
                        <IoCloseCustom />
                        {wd}
                      </WdLink>
                    </WrongWord>
                  ))}
                </WrongWordsSubContainer>
              ))}
            </WrongWordContainer>
          </React.Fragment>
        ) : (
          ""
        )}
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

const WrongWordsTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 400;
  text-align: center;
  color: ${(props) => props.theme.text.dull};
  margin: 15px auto 30px auto;
  user-select: none;
`;

const WrongWordContainer = styled.div`
  max-width: 500px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const WrongWordsSubContainer = styled.ul`
  overflow: hidden;
  flex-shrink: 0;
`;

const WrongWord = styled.li`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 10px;
  margin-right: 10px;
  font-weight: 300;
  font-size: 0.8rem;
  text-transform: capitalize;
  cursor: pointer;
  color: ${(props) => props.theme.text.dull};
  text-decoration: line-through;
  font-style: italic;

  &:hover {
    text-decoration: none;
  }
`;

const WdLink = styled(Link)`
  color: ${(props) => props.theme.text.dull};
  text-decoration: none;
  display: flex;
  align-items: center;

  &:hover {
    color: ${(props) => props.theme.text.light};
  }
`;

const IoCloseCustom = styled(IoClose)`
  margin-right: 5px;
  color: red;
`;
