import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { HiComputerDesktop } from "react-icons/hi2";

import WordDetails from "./WordDetails";
import FontSize from "../../assets/styles/FontSizes.json";
import Pagination from "./Pagination";
import { getWords } from "../../redux/selectors/Words";
import { WORDS_PER_PAGE } from "../../assets/constants";
import { searchFilter } from "../../utils/Words";
import Indicators from "./Indicators";

export default function WordsContainer() {
  const [selected, setSelected] = useState(null);

  const toggleModal = (id = null) => {
    setSelected(id);
    document.body.style.overflow = "auto";
  }

  const [searchParams] = useSearchParams();

  const filter = searchParams.get("filter");
  const sort = searchParams.get("sort");
  const search = searchParams.get("search");

  const getPageNumber = () => {
    const value = searchParams.get("page");
    if (!value || value < 1) return 0;
    return value - 1;
  };

  const wordsStore = useSelector((state) => state.words.words);

  const sorted_filtered = useMemo(
    () => getWords(wordsStore, filter, sort),
    [wordsStore, filter, sort]
  );
  const words = useMemo(
    () => searchFilter(sorted_filtered, search),
    [search, sorted_filtered]
  );

  const pageCount = Math.ceil(words.length / WORDS_PER_PAGE);
  const pagesVisited = getPageNumber() * WORDS_PER_PAGE;
  const displayWords = words.slice(pagesVisited, pagesVisited + WORDS_PER_PAGE);

  if (displayWords.length === 0) return <Indicators />;

  return (
    <Container>
      <BoxContainer>
        {displayWords.map((wd, index) => (
          <Box
            whileHover={{ ...boxHoverAnim }}
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
      </BoxContainer>
      <Pagination
        currentPage={getPageNumber() + 1}
        pageCount={pageCount}
        max={3}
      />
    </Container>
  );
}

const boxHoverAnim = {
  scale: 1.05,
  transition: { duration: 0.5 },
};
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BoxContainer = styled.div`
  width: 100%;
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
  font-size: 1.1rem;
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
