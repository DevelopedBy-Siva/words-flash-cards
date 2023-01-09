import React, { useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

import words from "../../assets/data/words.json";
import WordDetails from "./WordDetails";
import FontSize from "../../assets/styles/FontSizes.json";

export default function WordsContainer() {
  const [selected, setSelected] = useState(null);
  const toggleModal = (id = null) => setSelected(id);

  return (
    <Container>
      {words.map((wd, index) => (
        <Box
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.5 },
          }}
          onClick={() => toggleModal(wd)}
          layoutId={wd.word}
          key={index}
        >
          <Content>
            <Word>{wd.word}</Word>
          </Content>
        </Box>
      ))}
      <AnimatePresence>
        {selected && <WordDetails details={selected} close={toggleModal} />}
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
  height: 160px;
  background-color: ${(props) => props.theme.button.dull};
  border: 1px solid ${(props) => props.theme.border.default};
  margin: 20px;
  cursor: pointer;
  user-select: none;
  border-radius: 8px;
  padding: 10px;
`;

const Content = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
`;

const Word = styled.h2`
  font-size: ${FontSize.WORD.HOME_MAIN};
  font-weight: 400;
  letter-spacing: 1px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${(props) => props.theme.text.light};
`;
