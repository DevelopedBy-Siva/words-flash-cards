import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

import words from "../../assets/data/words.json";
import { getWords } from "../../redux/reducer/Words";
import WordDetails from "./WordDetails";

export default function WordsContainer() {
  const [selected, setSelected] = useState(null);
  const toggleModal = (id = null) => setSelected(id);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWords("procrastination"));
  }, [dispatch]);
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
  height: 150px;
  background-color: white;
  margin: 20px;
  cursor: pointer;
  user-select: none;
  border-radius: 5px;
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
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 1px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
