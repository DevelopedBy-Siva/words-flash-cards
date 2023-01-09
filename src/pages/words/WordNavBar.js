import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";
import styled from "styled-components";
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
      {addBtnActive && <NewWord close={toggleAddWord} />}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const SearchBtn = styled.button`
  color: ${(props) => props.theme.text.light};
  border: none;
  outline: none;
  background: none;
  font-size: 1.3rem;
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
  padding: 5px 16px;
  border-radius: 4px;
  cursor: pointer;
`;

const NewBtnLabel = styled.span`
  font-size: 0.8rem;
  letter-spacing: 1px;
  margin-left: 4px;
`;
