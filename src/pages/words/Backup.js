import { AnimatePresence } from "framer-motion";
import React from "react";
import styled from "styled-components";

import Modal from "../../components/modal";

export default function Backup({ backupActive, setBackupActive }) {
  const closeModal = () => {
    const proceed = window.confirm(
      "Operation is in progress. Do you want to still close it?"
    );
    if (!proceed) return;
    setBackupActive(null);
  };

  return (
    <AnimatePresence>
      {backupActive ? (
        <Modal layoutAnimation={ContainerAnimation} close={closeModal}>
          <Container>
            <Title>Backup</Title>
            <BackupBox>
              <Contain>
                <SubTitle>Import backup file</SubTitle>
                <NoteTxt>
                  # Cannot import a invalid or tampered backup file
                </NoteTxt>
              </Contain>
              <BackupBtn>Import</BackupBtn>
            </BackupBox>
            <BackupBox>
              <Contain>
                <SubTitle>Download the backup file</SubTitle>
                <NoteTxt>
                  # The backup file is encoded and tampering the file will make
                  it unreadable
                </NoteTxt>
              </Contain>
              <BackupBtn>Download</BackupBtn>
            </BackupBox>
          </Container>
        </Modal>
      ) : (
        ""
      )}
    </AnimatePresence>
  );
}

const Container = styled.div``;

const Title = styled.h1`
  text-align: center;
  font-size: 1.4rem;
  letter-spacing: 1px;
  font-weight: 400;
  color: ${(props) => props.theme.text.light};
`;

const BackupBox = styled.div`
  margin-top: 30px;
  padding-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:first-of-type {
    border-bottom: 1px solid ${(props) => props.theme.border.default};
    margin-top: 40px;
  }
`;

const Contain = styled.div`
  width: 80%;
`;

const SubTitle = styled.h3`
  color: ${(props) => props.theme.text.light};
  font-size: 0.9rem;
  font-weight: 300;
  margin-bottom: 6px;
`;

const NoteTxt = styled.span`
  display: block;
  color: ${(props) => props.theme.text.dull};
  font-size: 0.76rem;
  font-style: italic;
`;

const BackupBtn = styled.button`
  flex-shrink: 0;
  padding: 8px;
  border-radius: 5px;
  border: none;
  font-size: 0.7rem;
  cursor: pointer;
  margin-left: 10px;
  width: 70px;
  color: ${(props) => props.theme.text.light};
  background: ${(props) => props.theme.button.blue};
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
