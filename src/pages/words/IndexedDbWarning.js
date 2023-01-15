import React, { useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { HiComputerDesktop } from "react-icons/hi2";
import { AiOutlineClose } from "react-icons/ai";

import Wrapper from "../../components/wrapper";
import { WORDS_WARNING } from "../../assets/constants";

export default function IndexedDbWarning({ msg, sub = true }) {
  const [close, setClose] = useState(false);

  const show = sessionStorage.getItem(WORDS_WARNING);

  const closeWarning = () => {
    setClose(true);
    try {
      sessionStorage.setItem(WORDS_WARNING, "isActive");
    } catch (ex) {}
  };

  return show ? (
    ""
  ) : (
    <AnimatePresence>
      {!close ? (
        <Wrapper contain spaceAround={sub}>
          <Container
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            cover={sub ? 1 : 0}
          >
            <NoteTxt>Note:</NoteTxt>
            {msg ? <WarningTxt>{msg}</WarningTxt> : <DefaultWarningMsg />}
            <CloseBtn onClick={closeWarning}>
              <AiOutlineClose />
            </CloseBtn>
          </Container>
        </Wrapper>
      ) : (
        ""
      )}
    </AnimatePresence>
  );
}

function DefaultWarningMsg() {
  return (
    <WarningTxt>
      The words marked with &#39;
      <HiComputerDesktop />
      &#39; are stored in the browser database and clearing the browser data
      will permanently remove these words. So, please make sure to get the
      backup file before clearing the browser data.
    </WarningTxt>
  );
}

const Container = styled(motion.div)`
  width: ${(props) => (props.cover ? "90%" : "100%")};
  margin: auto;
  padding: 10px;
  border: 1px solid rgba(56, 139, 253, 0.4);
  border-radius: 6px;
  position: relative;
  color: ${(props) => props.theme.text.dull};
  background-image: linear-gradient(
    rgba(56, 139, 253, 0.15),
    rgba(56, 139, 253, 0.15)
  );
  margin-top: ${(props) => (props.cover ? "0" : "30px")};
  margin-bottom: ${(props) => (props.cover ? "0" : "5px")};
`;

const NoteTxt = styled.span`
  display: inline;
  width: auto;
  line-height: 2rem;
  border-bottom: 1px solid ${(props) => props.theme.text.dull};
`;

const WarningTxt = styled.span`
  margin-top: 10px;
  display: block;
  font-weight: 300;
  font-size: 0.9rem;
  line-height: 1.2rem;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: none;
  cursor: pointer;
  width: auto;
  font-size: 1rem;
  color: ${(props) => props.theme.text.dull};
`;
