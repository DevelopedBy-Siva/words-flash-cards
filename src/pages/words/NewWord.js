import React, { useRef, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../../components/modal";
import LoadingSpinner from "../../components/loader/";
import { searchDictionary } from "../../api/WordsApi";
import { addWordToDb } from "../../db";
import { addWord } from "../../redux/actions/Words_Actions";
import IndexedDbWarning from "./IndexedDbWarning";

export default function NewWord({ addBtnActive, setAddBtnActive, close }) {
  const wordInputRef = useRef(null);
  const addBtnRef = useRef(null);

  const [wordInput, setWordInput] = useState("");
  const [word, setWord] = useState({
    data: null,
    loading: false,
  });

  const closeModal = () => setAddBtnActive(null);

  const { words } = useSelector((state) => state.words);
  const dispatch = useDispatch();

  function handleWordInputChange(e) {
    const value = e.target.value;
    if (value.length > 0) {
      const regex = /^[a-zA-Z]+$/;
      if (!regex.test(value)) return;
    }
    setWordInput(value.toLowerCase());
  }

  async function searchWord(e) {
    e.preventDefault();
    if (wordInput.length === 0) return;

    setWord({ data: null, loading: true });
    await searchDictionary(wordInput)
      .then((data) => setWord({ data, loading: false }))
      .catch(() => setWord({ data: null, loading: false }));
  }

  async function addNewWord() {
    toast.dismiss();
    addBtnRef.current.disabled = true;

    const { data } = word;
    const isFound = words.findIndex(
      (item) => item.name.toLowerCase() === data.name.toLowerCase()
    );
    if (isFound !== -1) {
      addBtnRef.current.disabled = false;
      toast.warn("Word already added. Try another word");
      return;
    }

    addBtnRef.current.disabled = true;
    data["createdAt"] = Date.now();
    data["indexedDB"] = true;
    await addWordToDb(data)
      .then(() => {
        dispatch(addWord(data));
        toast.success("Word successfully saved to Local Database");
        close();
      })
      .catch(() => {
        addBtnRef.current.disabled = false;
        toast.error("Something went wrong. Failed to save the word");
      });
  }

  return (
    <AnimatePresence>
      {addBtnActive ? (
        <Modal layoutAnimation={ContainerAnimation} close={closeModal}>
          <Container>
            <Title>Add New Word</Title>
            <IndexedDbWarning
              sub={false}
              msg="New words will be stored in the browser database. So, clearing the browser data will remove the words permanently."
            />
            <Form onSubmit={searchWord}>
              <WordInput
                ref={wordInputRef}
                value={wordInput}
                onChange={handleWordInputChange}
                type="text"
                spellCheck="false"
                inputMode="search"
                disabled={word.loading}
              />
              <InputSearchBtn type="submit" disabled={word.loading}>
                {word.loading ? <LoadingSpinner size="25" center /> : "Search"}
              </InputSearchBtn>
            </Form>
            {word.data ? (
              <DetailsContainer>
                <Details>
                  <FoundWord>{word.data.name}</FoundWord>
                  <FoundWordMeaning>{word.data.meaning}</FoundWordMeaning>
                </Details>
                <AddBtn ref={addBtnRef} onClick={addNewWord}>
                  Add
                </AddBtn>
              </DetailsContainer>
            ) : (
              ""
            )}
          </Container>
        </Modal>
      ) : (
        ""
      )}
    </AnimatePresence>
  );
}

const Container = styled(motion.div)`
  width: 100%;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 1.4rem;
  letter-spacing: 1px;
  font-weight: 400;
  color: ${(props) => props.theme.text.light};
`;

const Form = styled.form`
  margin-top: 30px;
  width: 100%;
`;

const WordInput = styled.input`
  text-transform: uppercase;
  width: 100%;
  display: block;
  margin: auto;
  height: 40px;
  outline: none;
  border: 1px solid ${(props) => props.theme.border.default};
  border-radius: 5px;
  padding: 5px 10px;
  font-weight: 400;
  letter-spacing: 1px;
  font-size: 1rem;
  background: none;
  color: ${(props) => props.theme.text.dull};
`;

const InputSearchBtn = styled.button`
  display: block;
  border-radius: 5px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  border: none;
  background: ${(props) => props.theme.button.blue};
  color: ${(props) => props.theme.text.light};
  cursor: pointer;
  position: relative;
  width: 80px;
  height: 32px;
`;

const DetailsContainer = styled(motion.div)`
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border: 1px solid ${(props) => props.theme.border.default};
  padding: 25px 15px;
  border-radius: 8px;
  color: ${(props) => props.theme.text.light};
`;

const Details = styled.div`
  flex: 1;
  min-width: 0;
  margin-right: 20px;
`;

const AddBtn = styled.button`
  padding: 5px 12px;
  border-radius: 4px;
  border: none;
  outline: none;
  background: ${(props) => props.theme.button.dull};
  letter-spacing: 1px;
  cursor: pointer;
  font-size: 0.7rem;
  flex-shrink: 0;
  color: ${(props) => props.theme.text.dull};
  border: 1px solid ${(props) => props.theme.border.default};
  transition: color 0.2s ease-in-out, background 0.25s ease-in-out;

  &:disabled {
    cursor: wait;
  }

  &:hover:enabled {
    color: ${(props) => props.theme.text.light};
    background: ${(props) => props.theme.button.dark};
  }
`;

const FoundWord = styled.h3`
  font-weight: 400;
  letter-spacing: 1px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 1.1rem;
  text-transform: capitalize;
`;

const FoundWordMeaning = styled.h4`
  font-weight: 200;
  margin-top: 12px;
  font-size: 0.8rem;
  font-style: italic;
  color: ${(props) => props.theme.text.dull};
`;

const ContainerAnimation = {
  initial: {
    y: "100vh",
  },
  animate: {
    y: 0,
  },
  exit: {
    y: "100vh",
  },
};
