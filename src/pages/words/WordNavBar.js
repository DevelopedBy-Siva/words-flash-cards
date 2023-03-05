import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { BiSearch } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";
import { MdOutlineBackup } from "react-icons/md";

import NewWord from "./NewWord";
import Backup from "./Backup";

export default function WordNavBar() {
  const searchInputRef = useRef(null);

  const [addBtnActive, setAddBtnActive] = useState(null);
  const [backupActive, setBackupActive] = useState(null);

  const [searchParam, setSearchParams] = useSearchParams();
  const search = searchParam.get("search");

  const [searchInput, setSearchInput] = useState(search ? search : "");

  function handleWordInputChange(e) {
    const value = e.target.value;
    if (value.length > 0) {
      const regex = /^[a-zA-Z]+$/;
      if (!regex.test(value)) return;
    }
    setSearchInput(value);
    searchParam.set("search", value);
    searchParam.set("page", 1);
    setSearchParams(searchParam);
  }

  return (
    <Container>
      <SearchBox onClick={() => searchInputRef.current.focus()}>
        <BiSearch />
        <SearchInputBox
          ref={searchInputRef}
          type="text"
          spellCheck="false"
          inputMode="search"
          placeholder="Search word here..."
          value={searchInput}
          onChange={handleWordInputChange}
        />
      </SearchBox>
      <BackupBtn onClick={() => setBackupActive(true)}>
        <MdOutlineBackup />
      </BackupBtn>
      <NewBtn onClick={() => setAddBtnActive(true)}>
        <BsPlusLg />
        <NewBtnLabel>New</NewBtnLabel>
      </NewBtn>
      <Backup backupActive={backupActive} setBackupActive={setBackupActive} />
      <NewWord addBtnActive={addBtnActive} setAddBtnActive={setAddBtnActive} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

const NewBtn = styled.button`
  background: ${(props) => props.theme.button.green};
  border: 1px solid ${(props) => props.theme.button.green};
  color: ${(props) => props.theme.text.light};
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-left: 10px;
  font-size: 0.7rem;
  height: 30px;
  padding: 0 18px;
  border-radius: 5px;
  cursor: pointer;
`;

const NewBtnLabel = styled.span`
  font-size: 0.8rem;
  letter-spacing: 1px;
  margin-left: 4px;
`;

const SearchBox = styled(motion.div)`
  position: relative;
  padding: 0 7px;
  border-radius: 5px;
  height: 30px;
  border: 1px solid ${(props) => props.theme.button.dull};
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  width: 260px;
  color: ${(props) => props.theme.text.dull};
  font-size: 1.2rem;
  cursor: text;
`;

const SearchInputBox = styled(motion.input)`
  border: none;
  outline: none;
  background: none;
  color: ${(props) => props.theme.text.dull};
  font-size: 0.8rem;
  float: left;
  width: 100%;
  margin-left: 10px;
`;

const BackupBtn = styled.button`
  color: ${(props) => props.theme.text.dull};
  border: 1px solid ${(props) => props.theme.button.dull};
  padding: 0 7px;
  border-radius: 5px;
  height: 30px;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.3rem;
  margin-left: 10px;
`;
