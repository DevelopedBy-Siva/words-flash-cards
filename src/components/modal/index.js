import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import FocusTrap from "focus-trap-react";
import { AiFillCloseCircle } from "react-icons/ai";

export default function Modal({ id, close, children }) {
  return (
    <FocusTrap>
      <Container>
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => close()}
        />
        <ContentWrapper layoutId={id}>
          <Content>{children}</Content>
          <CloseBtn onClick={() => close()}>
            <AiFillCloseCircle />
          </CloseBtn>
        </ContentWrapper>
      </Container>
    </FocusTrap>
  );
}

const Container = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;
const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(19, 19, 19, 0.72);
`;

const ContentWrapper = styled(motion.div)`
  width: 95%;
  max-width: 700px;
  position: absolute;
  background: ${(props) => props.theme.boxes.default};
  margin: auto;
  border-radius: 15px;
`;

const Content = styled(motion.div)`
  width: 100%;
  padding: 30px;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 19px;
  height: 19px;
  outline: none;
  border: none;
  font-size: 1.2rem;
  border-radius: 50%;
  cursor: pointer;
  color: red;
`;
