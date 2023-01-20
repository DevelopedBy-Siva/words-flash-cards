import React from "react";
import styled from "styled-components";
import FocusLock from "react-focus-lock";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";

export default function Modal({ id, close, layoutAnimation = {}, children }) {
  return (
    <FocusLock>
      <Container>
        <Overlay {...OverlayAnimation} onClick={() => close()} />
        <ContentWrapper layoutId={id} {...layoutAnimation}>
          <Content {...ContentAnimation}>{children}</Content>
          <CloseBtn onClick={() => close()}>
            <IoMdCloseCustom />
          </CloseBtn>
        </ContentWrapper>
      </Container>
    </FocusLock>
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
  overflow: hidden;
`;
const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => props.theme.background.overlay};
`;

const ContentWrapper = styled(motion.div)`
  width: 95%;
  max-width: 700px;
  max-height: 98%;
  position: absolute;
  background: ${(props) => props.theme.button.dull};
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
  width: 17px;
  height: 17px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  background: ${(props) => props.theme.button.red};
`;

const IoMdCloseCustom = styled(IoMdClose)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white !important;
`;

const OverlayAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: {
    duration: 0.2,
  },
};

const ContentAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.1 },
};
