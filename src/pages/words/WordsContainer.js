import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { HiComputerDesktop } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";

import WordDetails from "./WordDetails";
import FontSize from "../../assets/styles/FontSizes.json";
import { initialiseWords } from "../../redux/reducer/Words";
import { getWords } from "../../redux/selectors/Words";

export default function WordsContainer() {
  const [selected, setSelected] = useState(null);
  const toggleModal = (id = null) => setSelected(id);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initialiseWords());
  }, [dispatch]);

  const [searchParams] = useSearchParams();

  const filterParam = searchParams.get("filter");
  const sortParam = searchParams.get("sort");

  const words = useSelector((state) => getWords(state, filterParam, sortParam));

  return (
    <Container>
      {words.map((wd, index) => (
        <Box
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.5 },
          }}
          onClick={() => toggleModal({ ...wd, id: `box_${index}` })}
          layoutId={`box_${index}`}
          key={index}
        >
          <Content>
            {wd.indexedDB ? <LocalIconCustom /> : ""}
            <Word>{wd.name}</Word>
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
  position: relative;
`;

const LocalIconCustom = styled(HiComputerDesktop)`
  position: absolute;
  color: ${(props) => props.theme.text.light};
  top: 0;
  right: 0;
  font-size: 0.9rem;
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
