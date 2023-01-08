import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import Modal from "../../components/modal";

export default function WordDetails({ close, details }) {
  return (
    <Modal id={details.word} close={close}>
      <Container>
        <WordBox>
          <Word>{details.word}</Word>
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
  height: 200px;
`;

const WordBox = styled(motion.div)``;

const Word = styled(motion.h1)`
  text-align: center;
  font-size: 1.2rem;
  letter-spacing: 1px;
  font-weight: 700;
  text-transform: uppercase;
`;

const Details = styled(motion.div)`
  margin-top: 50px;
`;

const WordMeaning = styled(motion.h2)`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const WordExample = styled(motion.h3)`
  font-size: 1rem;
`;
