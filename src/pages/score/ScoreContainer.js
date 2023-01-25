import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { FaGreaterThan } from "react-icons/fa";

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
        <Score
          initial={{ scale: 1.4 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          className={score >= total / 2 ? "" : "failed"}
        >
          {score} &#47; {total}
        </Score>
        <ScoreBreakupContainer>
          <ScoreBreakup label="correct" value={score}>
            <TiTickCustom />
          </ScoreBreakup>
          <ScoreBreakup label="wrong" value={wrongWords.length}>
            <IoCloseCustom className="breakup-wrong-ico" />
          </ScoreBreakup>
        </ScoreBreakupContainer>
        {sliceIntoChunks().length > 0 ? (
          <React.Fragment>
            <WrongWordsTitle
              initial={{ opacity: 0, y: "30" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <FaGreaterThanCustom className="less-than" />
              Wrong Words
              <FaGreaterThanCustom />
            </WrongWordsTitle>
            <WrongWordContainer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}
            >
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

function ScoreBreakup({ label, value, children }) {
  return (
    <Breakup>
      <LabelContainer
        initial={{ opacity: 0, x: "-50" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {children}
        <BreakupLabel>{label}</BreakupLabel>
      </LabelContainer>
      <BreakupValue
        initial={{ opacity: 0, x: "50" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {value}
      </BreakupValue>
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

const Score = styled(motion.div)`
  padding: 4px;
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
  font-size: 2rem;
  font-weight: 700;
  margin: auto;

  &.failed {
    background-color: ${(props) => props.theme.button.red};
  }
`;

const ScoreBreakupContainer = styled(motion.div)`
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
  font-size: 0.9rem;
  font-weight: 300;
  user-select: none;
`;

const BreakupLabel = styled(motion.span)`
  text-transform: capitalize;
  letter-spacing: 1px;
`;

const BreakupValue = styled(motion.span)`
  letter-spacing: 1px;
`;

const WrongWordsTitle = styled(motion.h4)`
  font-size: 0.9rem;
  font-weight: 400;
  text-align: center;
  color: ${(props) => props.theme.text.dull};
  margin: 10px auto 20px auto;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WrongWordContainer = styled(motion.div)`
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
  margin-right: 4px;
  color: ${(props) => props.theme.button.red};

  &.breakup-wrong-ico {
    font-size: 1.2rem;
    margin-right: 8px;
  }
`;

const TiTickCustom = styled(TiTick)`
  margin-right: 8px;
  color: ${(props) => props.theme.button.green};
  font-size: 1.2rem;
`;

const LabelContainer = styled(motion.div)`
  display: flex;
  align-items: center;
`;

const FaGreaterThanCustom = styled(FaGreaterThan)`
  font-size: 1.1rem;
  margin-left: 6px;
  &.less-than {
    transform: rotate(180deg);
    margin-right: 6px;
    margin-left: 0;
  }
`;
