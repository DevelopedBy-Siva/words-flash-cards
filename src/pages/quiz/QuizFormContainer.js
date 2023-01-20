import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import Wrapper from "../../components/wrapper";
import FontSize from "../../assets/styles/FontSizes.json";

export default function QuizFormContainer({
  formInput,
  setFormInput,
  proceed,
  setProceed,
  totalWords,
}) {
  const inputRef = useRef(null);
  const checkBoxRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  function validateInput(val) {
    if (val <= 0 || val > totalWords) {
      inputRef.current.style.borderColor = "#E24339";
      inputRef.current.style.color = "#E24339";
      return false;
    }
    inputRef.current.style.borderColor = "#2E2E2E";
    inputRef.current.style.color = "#2E2E2E";
    return true;
  }

  function handleInputChange(e) {
    const val = e.target.value;
    let parsedVal = parseInt(val).toString();
    if (isNaN(parsedVal)) parsedVal = "";
    validateInput(parsedVal);
    setFormInput({ ...formInput, value: parsedVal });
  }

  function startQuiz(e) {
    e.preventDefault();
    if (!validateInput(formInput.value)) {
      return;
    }
    const latestWords = checkBoxRef.current.checked;
    setFormInput({ ...formInput, latestWords });
    setProceed(true);
  }

  return (
    <Wrapper contain spaceAround grow center>
      <QuizForm onSubmit={startQuiz}>
        <InputLabel>Enter the number of words for the test</InputLabel>
        <InputBox
          ref={inputRef}
          value={formInput.value}
          onChange={handleInputChange}
          placeholder="0"
          inputMode="numeric"
          spellCheck="false"
          type="text"
          disabled={proceed}
        />
        <CheckBoxContainer>
          <CheckBox type="checkbox" ref={checkBoxRef} disabled={proceed} />
          <CheckBoxLabel>Includes words that are added lately</CheckBoxLabel>
        </CheckBoxContainer>

        <StartBtn type="submit" disabled={proceed}>
          Start
        </StartBtn>
      </QuizForm>
    </Wrapper>
  );
}

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
  font-weight: 400;
  letter-spacing: 2px;
  background: none;
  border: ${(props) => `1px solid ${props.theme.text.default}`};
  color: ${(props) => props.theme.text.dull};
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
