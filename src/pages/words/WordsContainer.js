import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";
import words from "../../assets/data/words.json";
import Modal from "../../components/modal";

export default function WordsContainer() {
  const [selected, setSelected] = useState(null);

  const toggleModal = (id = null) => setSelected(id);

  console.log(selected);

  return (
    <Container>
      {words.map((wd, index) => (
        <Box onClick={() => toggleModal(wd)} layoutId={wd.word} key={index}>
          <Content>{wd.word}</Content>
        </Box>
      ))}
      <AnimatePresence>
        {selected && (
          <Modal id={selected.word} close={toggleModal}>
            <h1>hello</h1>
          </Modal>
        )}
      </AnimatePresence>
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Box = styled(motion.div)`
  width: 100%;
  max-width: 350px;
  height: 150px;
  background-color: white;
  margin: 20px;
  cursor: pointer;
  user-select: none;
  border-radius: 10px;
  padding: 10px;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const Content = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
