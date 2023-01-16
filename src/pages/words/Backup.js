import { AnimatePresence } from "framer-motion";
import React from "react";
import styled from "styled-components";

import Modal from "../../components/modal";

export default function Backup({ backupActive, setBackupActive }) {
  const closeModal = () => setBackupActive(null);
  return (
    <AnimatePresence>
      {backupActive ? (
        <Modal layoutAnimation={ContainerAnimation} close={closeModal}>
          <Container>
            <Title>Add New Word</Title>
          </Container>
        </Modal>
      ) : (
        ""
      )}
    </AnimatePresence>
  );
}

const Container = styled.div``;

const Title = styled.h1``;

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
