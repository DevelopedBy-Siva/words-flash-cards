import React, { useRef, useState } from "react";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import { useDispatch } from "react-redux";
import { HiSpeakerWave } from "react-icons/hi2";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import FontSize from "../../assets/styles/FontSizes.json";
import Modal from "../../components/modal";
import { addWordToDb } from "../../db";
import { updateWord } from "../../redux/actions/Words_Actions";

const msg = new SpeechSynthesisUtterance();
export default function WordDetails({ close, details }) {
  const saveBtn = useRef(null);

  const [edit, setEdit] = useState(0);
  const [data, setData] = useState({
    meaning: details.meaning,
    example: details.example,
  });

  const dispatch = useDispatch();

  function toSpeech(text) {
    window.speechSynthesis.cancel();
    msg.text = text;
    window.speechSynthesis.speak(msg);
  }

  const handleInputChange = (event, type) => {
    const value = event.target.value;
    const newVal = value.replace(/  +/g, " ");
    if (newVal === " ") return;
    if (type === "meaning") setData({ ...data, meaning: newVal });
    else setData({ ...data, example: newVal });
  };

  const disableEnter = (e) => {
    if (e.key == "Enter") e.preventDefault();
  };

  const saveWord = async () => {
    saveBtn.current.disabled = true;
    const word = {
      ...details,
      meaning: data.meaning,
      example: data.example,
    };

    await addWordToDb(word)
      .then(() => {
        dispatch(updateWord(word));
        toast.success("Word successfully updated");
        close();
      })
      .catch(() => {
        toast.error("Something went wrong. Failed to update the word");
        saveBtn.current.disabled = false;
      });
  };

  return (
    <Modal id={details.id} close={close}>
      <Container>
        <WordBox>
          <SpeaketBtn onClick={() => toSpeech(details.name)}>
            <HiSpeakerWave />
          </SpeaketBtn>
          <Word>{details.name}</Word>
        </WordBox>
        <Details>
          <WordMeaning
            active={edit}
            disabled={!edit}
            onChange={(e) => handleInputChange(e, "meaning")}
            value={data.meaning}
            placeholder="# Sorry! No meaning found. Please add it."
            onKeyDown={disableEnter}
            maxLength={200}
          />
          <WordExample
            active={edit}
            disabled={!edit}
            onChange={(e) => handleInputChange(e, "example")}
            value={data.example}
            placeholder="## Sorry! No meaning found. Please add it."
            onKeyDown={disableEnter}
            maxLength={200}
          />
        </Details>
        {details.indexedDB ? (
          edit ? (
            <SaveBtn ref={saveBtn} onClick={saveWord}>
              Save
            </SaveBtn>
          ) : (
            <EditBtn
              onClick={() => {
                setEdit(1);
              }}
            >
              Edit
            </EditBtn>
          )
        ) : (
          ""
        )}
      </Container>
    </Modal>
  );
}

const Container = styled(motion.div)`
  width: 100%;
  min-height: 138px;
  color: white;
`;

const WordBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SpeaketBtn = styled.button`
  height: 36px;
  width: 36px;
  flex-shrink: 0;
  font-size: ${FontSize.WORD.DETAILS_SPEAK};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  background: none;
  color: ${(props) => props.theme.button.blue};
  border: 1px solid ${(props) => props.theme.border.default};
  cursor: pointer;
`;

const Word = styled(motion.h1)`
  text-align: center;
  font-size: ${FontSize.WORD.DETAILS_WD};
  letter-spacing: 1px;
  font-weight: 500;
  text-transform: uppercase;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Details = styled(motion.div)`
  margin-top: 40px;
`;

const TextArea = styled(TextareaAutosize)`
  width: 100%;
  background: none;
  padding-bottom: 2px;
  outline: none;
  user-select: none;
  resize: none;
  border: none;
  border-bottom: ${(props) =>
    props.active && `1px solid ${props.theme.border.default}`};
  overflow: hidden;
  line-height: 1.4rem;
`;

const WordMeaning = styled(TextArea)`
  font-size: ${FontSize.WORD.DETAILS_MEAN};
  margin-bottom: 10px;
  font-weight: 400;
  color: ${(props) => props.theme.text.light};

  &::placeholder {
    color: ${(props) => props.theme.text.light};
  }

  &:-ms-input-placeholder {
    color: ${(props) => props.theme.text.light};
  }

  &::-ms-input-placeholder {
    color: ${(props) => props.theme.text.light};
  }
`;

const WordExample = styled(TextArea)`
  font-size: ${FontSize.WORD.DETAILS_EX};
  font-weight: 300;
  font-style: italic;
  color: ${(props) => props.theme.text.dull};

  &::placeholder {
    color: ${(props) => props.theme.text.dull};
  }

  &:-ms-input-placeholder {
    color: ${(props) => props.theme.text.dull};
  }

  &::-ms-input-placeholder {
    color: ${(props) => props.theme.text.dull};
  }
`;

const LocalBtn = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 0.7rem;
  border-radius: 3px;
  padding: 3px 6px;
  cursor: pointer;
`;

const EditBtn = styled(LocalBtn)`
  border: 1px solid ${(props) => props.theme.border.default};
  background: none;
  color: ${(props) => props.theme.text.dull};
`;

const SaveBtn = styled(LocalBtn)`
  border: 1px solid ${(props) => props.theme.button.green};
  background: ${(props) => props.theme.button.green};
  color: ${(props) => props.theme.text.light};

  &:disabled {
    cursor: wait;
  }
`;
