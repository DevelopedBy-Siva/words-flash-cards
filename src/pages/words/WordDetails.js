import React from "react";
import styled from "styled-components";
import { HiSpeakerWave } from "react-icons/hi2";
import { motion } from "framer-motion";

import FontSize from "../../assets/styles/FontSizes.json";
import Modal from "../../components/modal";

const msg = new SpeechSynthesisUtterance();
export default function WordDetails({ close, details }) {
  function toSpeech(text) {
    window.speechSynthesis.cancel();
    msg.text = text;
    window.speechSynthesis.speak(msg);
  }

  return (
    <Modal id={details.name} close={close}>
      <Container>
        <WordBox>
          <SpeaketBtn onClick={() => toSpeech(details.name)}>
            <HiSpeakerWave />
          </SpeaketBtn>
          <Word>{details.name}</Word>
        </WordBox>
        <Details>
          <WordMeaning>{details.meaning}</WordMeaning>
          <WordExample>&#34;{details.example}&#34;</WordExample>
        </Details>
      </Container>
    </Modal>
  );
}

const Container = styled(motion.div)`
  width: 100%;
  min-height: 134px;
  color: white;
`;

const WordBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SpeaketBtn = styled.button`
  height: 36px;
  width: 36px;
  flex-shrink: 0;
  font-size: ${FontSize.WORD.DETAILS_SPEAK};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  background: none;
  outline: none;
  color: ${(props) => props.theme.button.blue};
  border: 1px solid ${(props) => props.theme.border.default};
  cursor: pointer;
`;

const Word = styled(motion.h1)`
  text-align: center;
  font-size: ${FontSize.WORD.DETAILS_WD};
  letter-spacing: 1px;
  font-weight: 500;
  text-transform: uppercase;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Details = styled(motion.div)`
  margin-top: 40px;
`;

const WordMeaning = styled(motion.h2)`
  font-size: ${FontSize.WORD.DETAILS_MEAN};
  margin-bottom: 12px;
  font-weight: 400;
`;

const WordExample = styled(motion.h3)`
  font-size: ${FontSize.WORD.DETAILS_EX};
  font-weight: 300;
  font-style: italic;
  color: ${(props) => props.theme.text.dull};
`;
