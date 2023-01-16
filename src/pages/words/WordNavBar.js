import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { BiSearch } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineBackup } from "react-icons/md";

import NewWord from "./NewWord";
import Backup from "./Backup";

export default function WordNavBar() {
  const searchInputRef = useRef(null);

  const [addBtnActive, setAddBtnActive] = useState(null);
  const [backupActive, setBackupActive] = useState(null);

  const [searchInput, setSearchInput] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  function handleWordInputChange(e) {
    const value = e.target.value;
    if (value.length > 0) {
      const regex = /^[a-zA-Z]+$/;
      if (!regex.test(value)) return;
    }
    setSearchInput(value);
  }

  useEffect(() => {
    let timeout;
    if (searchInputRef.current)
      timeout = setTimeout(() => searchInputRef.current.focus(), 400);
    return () => clearTimeout(timeout);
  }, [searchActive]);

  return (
    <Container>
      <SearchBox>
        <AnimatePresence>
          {searchActive && (
            <SearchInputBox
              ref={searchInputRef}
              type="text"
              spellCheck="false"
              inputMode="search"
              placeholder="Search word here..."
              value={searchInput}
              onChange={handleWordInputChange}
              animate={{ width: searchActive ? "240px" : 0 }}
              exit={{
                width: 0,
                opacity: 0,
                transition: {
                  duration: 0.3,
                },
              }}
              transition={{ duration: 0.5 }}
            />
          )}
        </AnimatePresence>
        <SearchBtn onClick={() => setSearchActive(!searchActive)}>
          {searchActive ? <IoCloseSharp /> : <BiSearch />}
        </SearchBtn>
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
  outline: none;
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
`;

const SearchBtn = styled.button`
  color: ${(props) => props.theme.text.dull};
  border: none;
  outline: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  float: right;
`;

const SearchInputBox = styled(motion.input)`
  max-width: 90%;
  width: 0;
  border: none;
  outline: none;
  background: none;
  color: ${(props) => props.theme.text.dull};
  font-size: 0.8rem;
  float: left;
`;

const BackupBtn = styled.button`
  color: ${(props) => props.theme.text.dull};
  border: 1px solid ${(props) => props.theme.button.dull};
  padding: 0 7px;
  border-radius: 5px;
  height: 30px;
  outline: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.3rem;
  margin-left: 10px;
`;
