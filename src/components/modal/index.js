import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { AiFillCloseCircle } from "react-icons/ai";

export default function Modal({ id, close, children }) {
  return (
    <>
      <Overlay onClick={() => close()} />
      <ContentWrapper layoutId={id}>
        <Content>{children}</Content>
        <CloseBtn onClick={() => close()}>
          <AiFillCloseCircle />
        </CloseBtn>
      </ContentWrapper>
    </>
  );
}

const Overlay = styled(motion.div)`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background-color: rgba(19, 19, 19, 0.72);
`;

const ContentWrapper = styled(motion.div)`
  width: 95%;
  max-width: 700px;
  height: 400px;
  position: fixed;
  background: white;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30px;
  border-radius: 15px;
`;

const Content = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

const CloseBtn = styled.button``;
