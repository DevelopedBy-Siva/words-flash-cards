import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import { RxSlash } from "react-icons/rx";

import FontSize from "../../assets/styles/FontSizes.json";
import words from "../../assets/data/words.json";

const AVAILABLE_WORDS = words.length;
export default function QuizBox() {
  const boxRef = useRef(null);
  const inputRef = useRef(null);

  const navigate = useNavigate();

  const [flip, setFilp] = useState(false);
  const [count, setCount] = useState("");

  function clickEvent(e) {
    console.log("EEE");
    if (!boxRef.current.contains(e.target)) return setFilp(false);
    setFilp(true);
  }

  useEffect(() => {
    if (flip) inputRef.current.focus();
    if (!flip) document.removeEventListener("click", clickEvent);
    return () => {
      document.removeEventListener("click", clickEvent);
    };
  }, [flip]);

  function flipBox() {
    document.addEventListener("click", clickEvent);
  }

  function handleWordCount(e) {
    inputRef.current.style.borderColor = "#2E2E2E";
    inputRef.current.style.color = "#2E2E2E";

    const val = e.target.value;
    let parsedVal = parseInt(val).toString();
    if (isNaN(parsedVal)) parsedVal = "";
    setCount(parsedVal);
  }

  function handleNavigation(e) {
    e.preventDefault();
    const quizCount = parseInt(count);
    if (quizCount > 0 && quizCount <= AVAILABLE_WORDS)
      return navigate("/quiz", { state: quizCount });
    inputRef.current.style.borderColor = "#E24339";
    inputRef.current.style.color = "#E24339";
  }

  return (
    <Container ref={boxRef}>
      <Box flip={flip}>
        <BoxFront onClick={flipBox}>Take Quiz</BoxFront>
        <BoxBack onSubmit={handleNavigation}>
          <BoxBackLabel>Enter number of words for the quiz</BoxBackLabel>
          <BoxFieldSet>
            <CloseBtn type="button" onClick={() => setFilp(false)}>
              <AiFillCloseCircle />
            </CloseBtn>
            <InputContainer>
              <InputBox
                value={count}
                onChange={handleWordCount}
                placeholder="0"
                inputMode="numeric"
                type="text"
                spellCheck="false"
                ref={inputRef}
              />
              <CustomSlash />
              <TotalWords>{AVAILABLE_WORDS}</TotalWords>
            </InputContainer>
            <NavBtn type="submit">Start</NavBtn>
          </BoxFieldSet>
        </BoxBack>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 250px;
  height: 180px;
  font-size: ${FontSize.HOME.BOX};
  text-transform: uppercase;
  color: ${(props) => props.theme.text.default};
  background: none;
  border: none;
  outline: none;
  border-radius: 10px;
  margin: 0 10px 10px 0;
  transition: transform 0.4s 0.1s ease-in-out;
  transform-origin: center;
  letter-spacing: 2px;

  &:hover {
    transform: scale(0.96);
  }

  @media screen and (max-width: 864px) {
    width: 210px;
    height: 130px;
  }
`;

const Box = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  transform-style: preserve-3d;
  transition: all 0.5s ease-in-out;
  transform: ${(props) => props.flip && "rotateY(180deg)"};
`;

const BoxFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  backface-visibility: hidden;
  background: ${(props) => props.theme.boxes.home_box_2};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const BoxFieldSet = styled.fieldset`
  background: none;
  border: none;
  outline: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BoxBack = styled.form`
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotateY(180deg);
  border-radius: 10px;
  backface-visibility: hidden;
  background-color: ${(props) => props.theme.boxes.default};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

const BoxBackLabel = styled.label`
  text-transform: none;
  letter-spacing: 1px;
  text-align: center;
  font-size: ${FontSize.HOME.BOX_SUB};
`;

const InputContainer = styled.div`
  width: 70%;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const CustomSlash = styled(RxSlash)`
  margin: 0 5px;
  font-size: ${FontSize.HOME.BOX_ICON};
`;

const TotalWords = styled.span`
  border: 1px solid ${(props) => props.theme.border.dark};
  border-radius: 5px;
  padding: 6px;
  display: block;
  height: 100%;
  width: 50%;
  text-align: center;
  user-select: none;
  font-size: ${FontSize.HOME.BOX_INPUT};
`;

const InputBox = styled.input`
  border: 1px solid ${(props) => props.theme.border.dark};
  color: ${(props) => props.theme.text.default};
  outline: none;
  border-radius: 5px;
  padding: 6px;
  font-size: ${FontSize.HOME.BOX_INPUT};
  letter-spacing: 2px;
  font-weight: 500;
  height: 100%;
  width: 50%;
`;

const NavBtn = styled.button`
  background-color: ${(props) => props.theme.button.dark};
  color: ${(props) => props.theme.text.light};
  text-decoration: none;
  padding: 6px 8px;
  border-radius: 5px;
  margin-top: 10px;
  outline: none;
  border: none;
  font-size: ${FontSize.HOME.BOX_SUB};
  letter-spacing: 2px;
  border: 2px solid ${(props) => props.theme.border.dark};
  cursor: pointer;
  :focus {
    border: 2px solid ${(props) => props.theme.border.blue};
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  color: ${(props) => props.theme.text.default};
  background-color: none;
  border: none;
  outline: none;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  cursor: pointer;
  font-size: ${FontSize.HOME.BOX_ICON};
`;
