import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import Wrapper from "../../components/wrapper";
import Header from "../../components/header";
import FontSize from "../../assets/styles/FontSizes.json";
import words from "../../assets/data/words.json";

const TOTAL_WORDS = words.length;
export default function Quiz() {
  const inputRef = useRef(null);

  const [proceed, setProceed] = useState(false);
  const [count, setCount] = useState("");

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  function validateCount(val) {
    if (val <= 0 || val > TOTAL_WORDS) {
      inputRef.current.style.borderColor = "#E24339";
      inputRef.current.style.color = "#E24339";
      return false;
    }
    inputRef.current.style.borderColor = "#2E2E2E";
    inputRef.current.style.color = "#2E2E2E";
    return true;
  }

  function handleWordCount(e) {
    const val = e.target.value;
    let parsedVal = parseInt(val).toString();
    if (isNaN(parsedVal)) parsedVal = "";
    validateCount(parsedVal);
    setCount(parsedVal);
  }

  function startQuiz(e) {
    e.preventDefault();
    if (!validateCount(count)) {
      return;
    }
    setProceed(true);
  }

  return (
    <Wrapper stretch>
      <Wrapper contain spaceAround>
        <Header name="Quiz" />
      </Wrapper>
      <Wrapper contain spaceAround border right>
        <AvailableWordsContainer>
          <AvailableWordsHead>Available Words:</AvailableWordsHead>
          <AvailableWords>{TOTAL_WORDS}</AvailableWords>
        </AvailableWordsContainer>
      </Wrapper>
      {!proceed ? (
        <Wrapper contain spaceAround grow center>
          <QuizForm onSubmit={startQuiz}>
            <InputLabel>Enter the number of words for the test</InputLabel>
            <InputBox
              ref={inputRef}
              value={count}
              onChange={handleWordCount}
              placeholder="0"
              inputMode="numeric"
              spellCheck="false"
              type="text"
              disabled={proceed}
            />
            <CheckBoxContainer>
              <CheckBox type="checkbox" disabled={proceed} />
              <CheckBoxLabel>
                Includes words that are added lately
              </CheckBoxLabel>
            </CheckBoxContainer>

            <StartBtn type="submit" disabled={proceed}>
              Start
            </StartBtn>
          </QuizForm>
        </Wrapper>
      ) : (
        <Wrapper contain spaceAround grow>
          Hello
        </Wrapper>
      )}
    </Wrapper>
  );
}

const AvailableWordsContainer = styled.div`
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

const QuizForm = styled.form`
  text-align: center;
  color: ${(props) => props.theme.text.light};
  width: 100%;
  max-width: 600px;
  margin: auto;
`;

const InputLabel = styled.label`
  margin-bottom: 25px;
  display: block;
  font-size: ${FontSize.QUIZ.QZ_FORM_LB_INP};
`;

const InputBox = styled.input`
  display: block;
  margin: auto;
  border: none;
  outline: none;
  border-radius: 5px;
  height: 50px;
  padding: 8px;
  font-size: ${FontSize.QUIZ.QZ_FORM_INP};
  width: 100%;
  max-width: 260px;
  font-weight: 600;
  letter-spacing: 2px;
  border: ${(props) => `2px solid ${props.theme.text.default}`};
  color: ${(props) => props.theme.text.dark};
`;

const CheckBoxContainer = styled.div`
  margin-top: 25px;
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CheckBox = styled.input`
  cursor: pointer;
  margin-right: 3px;
  outline: none;
  display: block;
`;

const CheckBoxLabel = styled.label`
  display: inline-block;
  margin-left: 3px;
  font-size: ${FontSize.QUIZ.QZ_FORM_LB_CB};
  color: ${(props) => props.theme.text.dull};
`;

const StartBtn = styled.button`
  margin-top: 25px;
  outline: none;
  border: none;
  padding: 8px 4px;
  border-radius: 5px;
  width: 80px;
  cursor: pointer;
  color: ${(props) => props.theme.text.light};
  background: ${(props) => props.theme.button.green};
  letter-spacing: 1px;
  font-size: ${FontSize.QUIZ.QZ_FORM_BTN};
`;
