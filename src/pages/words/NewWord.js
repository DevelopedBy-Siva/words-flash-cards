import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import Modal from "../../components/modal";
import axios from "../../api";
import LoadingSpinner from "../../components/loader/";

export default function NewWord({ close }) {
  const wordInputRef = useRef(null);

  const [wordInput, setWordInput] = useState("");
  const [word, setWord] = useState({
    data: null,
    loading: false,
  });

  useEffect(() => {
    wordInputRef.current.focus();
  }, []);

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
    toast.dismiss();
    setWord({ data: null, loading: true });
    await axios
      .get(wordInput)
      .then(({ data }) => {
        const meaning = data[0].meanings[0].definitions[0].definition;
        const name = data[0].word;
        const example = data[0].meanings[0].definitions[0].example;
        setWord({ data: { name, meaning, example }, loading: false });
      })
      .catch((err) => {
        const { response } = err;
        if (response && response.status === 404)
          toast.info("Sorry, word not found");
        else toast.error("Sorry, something went wrong. Please try again later");

        setWord({ data: null, loading: false });
      });
  }

  return (
    <Modal close={close}>
      <Container>
        <Title>Add New Word</Title>
        <Form onSubmit={searchWord}>
          <WordInput
            ref={wordInputRef}
            value={wordInput}
            onChange={handleWordInputChange}
            type="text"
            spellCheck="false"
            inputMode="search"
          />
          <InputSearchBtn type="submit">
            {word.loading ? <LoadingSpinner size="25" center /> : "Search"}
          </InputSearchBtn>
        </Form>
        {word.data ? (
          <DetailsContainer>
            <Details>
              <FoundWord>{word.data.name}</FoundWord>
              <FoundWordMeaning>{word.data.meaning}</FoundWordMeaning>
            </Details>
            <AddBtn>Add</AddBtn>
          </DetailsContainer>
        ) : (
          ""
        )}
      </Container>
    </Modal>
  );
}

const Container = styled(motion.div)``;

const Title = styled.h1`
  text-align: center;
  font-size: 1.4rem;
  letter-spacing: 1px;
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
  font-weight: 500;
  letter-spacing: 1px;
  font-size: 1rem;
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
  width: 65px;
  height: 35px;
`;

const DetailsContainer = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: ${(props) => props.theme.background.grey};
  padding: 25px 15px;
  border-radius: 8px;
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
  background: ${(props) => props.theme.button.default};
  letter-spacing: 1px;
  cursor: pointer;
  font-size: 0.7rem;
  flex-shrink: 0;
  transition: color 0.2s ease-in-out, background 0.25s ease-in-out;

  &:hover {
    color: ${(props) => props.theme.text.light};
    background: ${(props) => props.theme.button.dark};
  }
`;

const FoundWord = styled.h3`
  font-weight: 500;
  letter-spacing: 1px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 1.1rem;
  text-transform: capitalize;
`;

const FoundWordMeaning = styled.h4`
  font-weight: 300;
  margin-top: 12px;
  font-size: 0.9rem;
  font-style: italic;
`;
