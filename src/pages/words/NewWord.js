import React, { useRef, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../../components/modal";
import LoadingSpinner from "../../components/loader/";
import { searchDictionary } from "../../api/WordsApi";
import { addWordToDb } from "../../db";
import { addWord } from "../../redux/actions/Words_Actions";
import IndexedDbWarning from "./IndexedDbWarning";

export default function NewWord({ setAddBtnActive }) {
  const wordInputRef = useRef(null);
  const addBtnRef = useRef(null);
  const stillContinueRef = useRef(null);
  const wordSearchBtnRef = useRef(null);

  const [wordInput, setWordInput] = useState("");
  const [word, setWord] = useState({
    data: null,
    loading: false,
    error: null,
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
    setWord({ ...word, error: null });
  }

  async function searchWord(e) {
    e.preventDefault();
    if (wordInput.length === 0) return;
    setWord({ data: null, error: null, loading: true });
    await searchDictionary(wordInput)
      .then((data) => setWord({ data, loading: false }))
      .catch((err) => {
        let status = 500;
        if (err && err.code === 404) status = 404;
        setWord({
          data: null,
          loading: false,
          error: {
            word: wordInput.trim().toLocaleLowerCase(),
            status,
          },
        });
      });
  }

  function enable_disable_formBtns(val = false) {
    if (stillContinueRef && stillContinueRef.current)
      stillContinueRef.current.disabled = val;

    if (addBtnRef && addBtnRef.current) addBtnRef.current.disabled = val;

    if (wordSearchBtnRef && wordSearchBtnRef.current)
      wordSearchBtnRef.current.disabled = val;

    if (wordInputRef && wordInputRef.current)
      wordInputRef.current.disabled = val;
  }

  async function stillAddWord() {
    toast.dismiss();
    const { error } = word;
    if (!error.word) return;

    enable_disable_formBtns(true);

    const isFound = words.findIndex(
      (item) => item.name.toLowerCase() === error.word
    );
    if (isFound !== -1) {
      enable_disable_formBtns(false);
      toast.warn("Word already added. Try another word");
      return;
    }
    let data = {
      name: error.word,
      meaning: undefined,
      example: undefined,
      createdAt: Date.now(),
      indexedDB: true,
    };

    await addWordToDb(data)
      .then(() => {
        dispatch(addWord(data));
        toast.success(
          "Word successfully saved to Local Database. Open the word & do add the meaning and example"
        );
        closeModal();
      })
      .catch(() => {
        enable_disable_formBtns(false);
        toast.error("Something went wrong. Failed to save the word");
      });
  }

  async function addNewWord() {
    toast.dismiss();
    enable_disable_formBtns(true);

    const { data } = word;
    console.log(data);
    const isFound = words.findIndex(
      (item) => item.name.toLowerCase() === data.name.toLowerCase()
    );
    if (isFound !== -1) {
      enable_disable_formBtns(false);
      toast.warn("Word already added. Try another word");
      return;
    }

    data["createdAt"] = Date.now();
    data["indexedDB"] = true;
    await addWordToDb(data)
      .then(() => {
        dispatch(addWord(data));
        toast.success("Word successfully saved to Local Database");
        closeModal();
      })
      .catch(() => {
        enable_disable_formBtns(false);
        toast.error("Something went wrong. Failed to save the word");
      });
  }

  return (
    <Modal layoutAnimation={ContainerAnimation} close={closeModal}>
      <Container>
        <Title>Add New Word</Title>
        <IndexedDbWarning
          sub={false}
          msg={[
            "New words will be stored in the browser database. So, clearing the browser data will remove the words permanently.",
            "Words stored in the browser database can be edited from the words page.",
          ]}
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
            placeholder="Enter the word here..."
          />
          {word.error && (
            <ApiError>
              {word.error.status === 404
                ? "Failed to find the word from the Dictionary. "
                : "Something went wrong with the Dictionary. "}
              <ApiErrorContinue
                ref={stillContinueRef}
                type="button"
                onClick={stillAddWord}
              >
                Still wish to add?
              </ApiErrorContinue>
            </ApiError>
          )}
          <InputSearchBtn
            ref={wordSearchBtnRef}
            type="submit"
            disabled={word.loading}
          >
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

  &::placeholder {
    font-size: 0.9rem;
    text-transform: none;
  }
`;

const ApiError = styled.span`
  display: block;
  color: ${(props) => props.theme.text.dull};
  font-size: 0.7rem;
  margin-top: 12px;
  margin: 15px 0 15px 4px;
  letter-spacing: 1px;
  font-weight: 300;
`;

const ApiErrorContinue = styled.button`
  display: inline-block;
  border: none;
  background: none;
  outline: none;
  color: ${(props) => props.theme.text.light};
  letter-spacing: 1px;
  font-size: 0.7rem;
  border-bottom: 1px solid ${(props) => props.theme.text.light};
  cursor: pointer;
  font-weight: 300;

  &:disabled {
    cursor: wait;
  }
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
