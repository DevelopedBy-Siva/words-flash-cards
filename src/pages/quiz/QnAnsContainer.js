import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { IoMdVolumeHigh, IoMdVolumeOff } from "react-icons/io";

import Wrapper from "../../components/wrapper";
import { optionNumber } from "../../utils/QuizGenerator";

const speechSynthesis = new SpeechSynthesisUtterance();
export default function QnAnsContainer({ quizQn, setQuizQn }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [mute, setMute] = useState(false);

  const { currentQn, qns } = quizQn;
  const { name, options, myChoice, status, answer, answerExample } =
    qns[currentQn];

  useEffect(() => {
    if (mute) return;
    speechSynthesis.text = name;
    const timeout = setTimeout(
      () => window.speechSynthesis.speak(speechSynthesis),
      1000
    );
    return () => {
      window.speechSynthesis.cancel();
      clearTimeout(timeout);
    };
  }, [name, mute]);

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
    <React.Fragment>
      <Wrapper contain spaceAround grow>
        <QuestionContainer
          key={currentQn}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <WordName
            initial={{ y: -60 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {name}
          </WordName>
          {options.map((opt, index) => (
            <Options
              onClick={() => handleMyChoice(index)}
              key={index}
              index={index}
              active={myChoice === index ? 1 : 0}
              disabled={status !== null ? true : false}
              className={`${myChoice !== index ? "option-not-active" : ""} ${
                myChoice === index ? myChoiceStatusClassName : ""
              } ${
                index === correctChoiceStatusClassName ? "choice-correct" : ""
              }`}
              initial={{ y: 60 }}
              animate={{ y: 0 }}
            >
              <OptionsNumber active={myChoice === index ? 1 : 0} index={index}>
                {optionNumber(index)}
              </OptionsNumber>
              <OptionValue>
                <OptionChoice>{opt}</OptionChoice>
                {status != null && answer === index ? (
                  <OptionExample
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                  >
                    "{answerExample}"
                  </OptionExample>
                ) : (
                  ""
                )}
              </OptionValue>
            </Options>
          ))}
        </QuestionContainer>
      </Wrapper>
      <MuteContainer>
        <MuteBtn onClick={() => setMute(!mute)}>
          {!mute ? (
            <IoMdVolumeHigh className="icon" />
          ) : (
            <IoMdVolumeOff className="icon" />
          )}
        </MuteBtn>
      </MuteContainer>
    </React.Fragment>
  );
}

const MuteContainer = styled.div`
  width: 100%;
  height: 70px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: right;
  padding: 0 2rem;
`;

const MuteBtn = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  font-size: 1.3rem;
  padding: 5px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  cursor: pointer;
  border: 1px solid #fff;
  background: none;
  color: #fff;

  .icon {
    transition: all 200ms ease-in-out;
  }

  :hover .icon {
    transform: scale(1.1);
  }
`;

const QuestionContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-height: 0;
`;

const WordName = styled(motion.h1)`
  color: ${(props) => props.theme.text.light};
  margin: 42px 0;
  letter-spacing: 2px;
  font-size: 2.2rem;
  text-transform: capitalize;
  word-wrap: break-word;
  width: 100%;
  text-align: center;

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

const Options = styled(motion.button)`
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

const OptionValue = styled.div``;

const OptionChoice = styled.p`
  text-align: left;
  line-height: 1.2rem;
`;

const OptionExample = styled(motion.p)`
  text-align: left;
  font-size: 0.8rem;
  font-style: italic;
  margin-top: 6px;
`;
