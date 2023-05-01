import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import JSONPretty from "react-json-pretty";
import { IoCopy } from "react-icons/io5";
import { BsCheck } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-json-pretty/themes/monikai.css";

import LoadingSpinner from "../../components/loader";
import Modal from "../../components/modal";
import { loadNewWords } from "../../redux/actions/Words_Actions";
import { decryptAndAddToDb, encryptAndDownload } from "../../utils/Words";
import { getWordsFromDb } from "../../db";

export default function Backup({ setBackupActive }) {
  const chooseFileRef = useRef(null);

  const [uploadProgress, setUploadProgress] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(false);
  const [showJson, setShowJson] = useState({
    show: false,
    loading: false,
    error: false,
    data: [],
  });
  const [copied, setCopied] = useState(false);

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
    document.body.style.overflow = "auto";
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

  async function handleShowJson(show) {
    if (show) setShowJson({ show, loading: true, error: false, data: [] });
    else
      return setShowJson({
        show,
        data: [],
        loading: false,
        error: false,
      });

    await getWordsFromDb()
      .then((data) => {
        if (Array.isArray(data)) {
          const json = data.map((item) => {
            const createdAt = item.createdAt;
            return {
              name: item.name,
              meaning: item.meaning,
              example: item.example,
              createdAt: createdAt ? createdAt.toString() : "",
            };
          });
          setShowJson({ show, data: json, loading: false, error: false });
        } else setShowJson({ show, data: [], loading: false, error: false });
      })
      .catch(() => {
        setShowJson({ show, data: [], loading: false, error: true });
      });
  }

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => {
      setCopied(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  async function copyToClipboard() {
    setCopied(true);
    await navigator.clipboard.writeText(JSON.stringify(showJson.data));
  }

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
        <BackupBox className="column">
          <Wrapper>
            <ViewJsonLabel>
              View the words stored in the browser database in JSON format
            </ViewJsonLabel>
            <BackupBtn onClick={() => handleShowJson(!showJson.show)}>
              {showJson.show ? "Close" : "View"}
            </BackupBtn>
          </Wrapper>
          {showJson.show &&
            (showJson.loading ? (
              <JsonLoading>Please wait...</JsonLoading>
            ) : showJson.error ? (
              <JsonError>Sorry. Failed to generate JSON</JsonError>
            ) : (
              <JSONView>
                {showJson.data.length !== 0 && (
                  <CopyButton disabled={copied}>
                    {!copied ? (
                      <IoCopy onClick={copyToClipboard} className="copy-icon" />
                    ) : (
                      <BsCheck className="copy-icon copied" />
                    )}
                  </CopyButton>
                )}
                <JSONPretty
                  style={{
                    fontSize: "0.8rem",
                  }}
                  theme={{
                    value: "color:#a6e22e;",
                  }}
                  space={2}
                  data={showJson.data}
                  keyStyle="color:#4BB8F1"
                  mainStyle="color:white;padding:1em;background:none;border-radius:5px"
                />
              </JSONView>
            ))}
        </BackupBox>
      </Container>
    </Modal>
  );
}

const Container = styled.div`
  .__json-string__ {
    color: #ce9178 !important;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 1.4rem;
  letter-spacing: 1px;
  font-weight: 400;
  color: ${(props) => props.theme.text.light};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const ViewJsonLabel = styled.p`
  color: ${(props) => props.theme.text.light};
  font-size: 0.9rem;
  font-weight: 300;
`;

const CopyButton = styled.button`
  color: ${(props) => props.theme.text.dull};
  border: none;
  outline: none;
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;

  .copy-icon {
    font-size: 0.9rem;
    cursor: pointer;
  }

  .copied {
    font-size: 1.2rem;
    color: ${(props) => props.theme.text.light};
  }

  :hover:enabled {
    color: ${(props) => props.theme.text.light};
  }
`;

const JSONView = styled.div`
  width: 100%;
  margin-top: 20px;
  background: ${(props) => props.theme.background.light};
  position: relative;
`;

const JsonLoading = styled.p`
  width: 100%;
  color: ${(props) => props.theme.text.dull};
  font-size: 0.7rem;
  text-align: left;
  margin-top: 5px;
`;

const JsonError = styled.p`
  width: 100%;
  color: ${(props) => props.theme.text.dull};
  font-size: 0.7rem;
  text-align: left;
  margin-top: 5px;
`;

const BackupBox = styled.div`
  margin-top: 30px;
  padding-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.border.default};

  &:first-of-type {
    margin-top: 40px;
  }

  &:last-of-type {
    border-bottom: 0;
  }

  &.column {
    flex-direction: column;
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
