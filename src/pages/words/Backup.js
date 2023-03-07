import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import LoadingSpinner from "../../components/loader";
import Modal from "../../components/modal";
import { loadNewWords } from "../../redux/actions/Words_Actions";
import { decryptAndAddToDb, encryptAndDownload } from "../../utils/Words";

export default function Backup({ setBackupActive }) {
  const chooseFileRef = useRef(null);

  const [uploadProgress, setUploadProgress] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeModal = () => {
    if (downloadProgress || uploadProgress) {
      const proceed = window.confirm(
        "Operation is in progress. Do you want to still close it?"
      );
      if (!proceed) return;
    }
    setBackupActive(null);
  };

  const downloadBackup = async () => {
    setDownloadProgress(true);
    await encryptAndDownload();
    setDownloadProgress(false);
  };

  const openFile = () => chooseFileRef.current.click();

  const uploadFile = async (e) => {
    setUploadProgress(true);
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = async (e) => {
      const content = e.target.result;
      const data = await decryptAndAddToDb(content);
      if (data) {
        dispatch(loadNewWords(data));
        toast.success("Words imported successfully");
        navigate("/words?filter=local");
        closeModal();
      }
      setUploadProgress(false);
    };
    fileReader.readAsText(file, "UTF-8");
  };

  return (
    <Modal layoutAnimation={ContainerAnimation} close={closeModal}>
      <Container>
        <Title>Backup</Title>
        <BackupBox>
          <Contain>
            <SubTitle>Import backup file</SubTitle>
            <NoteTxt># Cannot import a invalid or tampered backup file</NoteTxt>
          </Contain>
          <BackupBtn
            onClick={openFile}
            onChange={uploadFile}
            disabled={uploadProgress}
          >
            <ChooseFile ref={chooseFileRef} type="file" accept=".bytes" />
            {uploadProgress ? <LoadingSpinner center size="22" /> : "Import"}
          </BackupBtn>
        </BackupBox>
        <BackupBox>
          <Contain>
            <SubTitle>Download the backup file</SubTitle>
            <NoteTxt>
              # The backup file is encoded and tampering the file will make it
              unreadable
            </NoteTxt>
          </Contain>
          <BackupBtn disabled={downloadProgress} onClick={downloadBackup}>
            {downloadProgress ? (
              <LoadingSpinner center size="22" />
            ) : (
              "Download"
            )}
          </BackupBtn>
        </BackupBox>
      </Container>
    </Modal>
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
  padding: 0 8px;
  border-radius: 5px;
  border: none;
  font-size: 0.7rem;
  cursor: pointer;
  margin-left: 10px;
  width: 70px;
  height: 30px;
  color: ${(props) => props.theme.text.light};
  background: ${(props) => props.theme.button.blue};
  position: relative;
  overflow: hidden;
`;

const ChooseFile = styled.input`
  display: none;
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
