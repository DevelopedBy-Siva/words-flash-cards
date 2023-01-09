import React, { useState } from "react";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import { BiSearch } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";

import NewWord from "./NewWord";

export default function WordNavBar() {
  const [addBtnActive, setAddBtnActive] = useState(null);

  const toggleAddWord = (opt = null) => setAddBtnActive(opt);

  return (
    <Container>
      <SearchBtn>
        <BiSearch />
      </SearchBtn>
      <NewBtn onClick={() => toggleAddWord(true)}>
        <BsPlusLg />
        <NewBtnLabel>New</NewBtnLabel>
      </NewBtn>
      <AnimatePresence>
        {addBtnActive && <NewWord close={toggleAddWord} />}
      </AnimatePresence>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const SearchBtn = styled.button`
  color: ${(props) => props.theme.text.dull};
  border: none;
  outline: none;
  background: none;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  padding: 0px;
  border-radius: 4px;
  cursor: pointer;
`;

const NewBtn = styled.button`
  background: ${(props) => props.theme.button.green};
  color: ${(props) => props.theme.text.light};
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: none;
  outline: none;
  margin-left: 10px;
  font-size: 0.7rem;
  padding: 7px 18px;
  border-radius: 5px;
  cursor: pointer;
`;

const NewBtnLabel = styled.span`
  font-size: 0.8rem;
  letter-spacing: 1px;
  margin-left: 4px;
`;
