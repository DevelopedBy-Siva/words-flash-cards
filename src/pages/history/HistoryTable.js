import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FiPlus, FiMinus } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

import Wrapper from "../../components/wrapper";
import Loader from "../../components/loader";

export default function HistoryTable({ isLoading, toDisplay }) {
  return (
    <Wrapper contain spaceAround grow>
      <Table>
        <THead>
          <TR>
            <TH className="collapse-btn" />
            <TH>Date</TH>
            <TH>Score</TH>
          </TR>
        </THead>
        <TBody>
          {isLoading ? (
            <HistoryLoader />
          ) : toDisplay.length === 0 ? (
            <EmptyHistory />
          ) : (
            toDisplay.map((data, index) => {
              return <HistoryContent data={data} key={index} />;
            })
          )}
        </TBody>
      </Table>
    </Wrapper>
  );
}

function HistoryLoader() {
  return (
    <TR>
      <TD className="history-ui-msgs" colSpan={3}>
        <Loader center />
      </TD>
    </TR>
  );
}

function EmptyHistory() {
  return (
    <TR>
      <TD className="history-ui-msgs" colSpan={3}>
        <NoDataFound>No previous quiz records found.</NoDataFound>
      </TD>
    </TR>
  );
}

function HistoryContent({ data }) {
  const [open, setOpen] = useState(false);

  const getScore = (score) => {
    score = score ? score : "";
    const split = score.split(":");
    return {
      myScore: split[0],
      total: split[1],
    };
  };

  const { myScore, total } = getScore(data.score);

  function sliceIntoChunks() {
    const chunkSize = 5;
    const res = [];
    for (let i = 0; i < data.wrongWords.length; i += chunkSize) {
      const chunk = data.wrongWords.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  }

  return (
    <React.Fragment>
      <TR>
        <TD>
          <CollapseBtn onClick={() => setOpen(!open)}>
            {!open ? <FiPlus /> : <FiMinus />}
          </CollapseBtn>
        </TD>
        <TD>{data.timestamp}</TD>
        <TD>
          {myScore} &#47; {total}
        </TD>
      </TR>
      {open ? (
        <TR>
          <TD colSpan={3}>
            <WrongWordsWrapper>
              {sliceIntoChunks().map((chunk, index) => (
                <WrongWordsContainer key={index}>
                  {chunk.map((wd, index) => (
                    <WrongWordContainer key={index}>
                      <IoCloseCustom />
                      <WrongWord>
                        <WrongWordLink
                          target="_blank"
                          to={`/words?search=${wd}`}
                        >
                          {wd}
                        </WrongWordLink>
                      </WrongWord>
                    </WrongWordContainer>
                  ))}
                </WrongWordsContainer>
              ))}
            </WrongWordsWrapper>
          </TD>
        </TR>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;
`;

const THead = styled.thead``;

const TBody = styled.tbody``;

const TR = styled.tr``;

const TH = styled.th`
  letter-spacing: 1px;
  padding: 10px 4px;
  font-weight: 300;
  text-transform: capitalize;
  color: ${(props) => props.theme.text.dull};
  font-size: 0.8rem;
  border-bottom: 1px solid ${(props) => props.theme.border.default};
  text-align: left;

  &.collapse-btn {
    width: 38px;
  }
`;

const TD = styled.td`
  padding: 2px;
  color: ${(props) => props.theme.text.dull};
  font-size: 0.8rem;
  font-weight: 400;
  letter-spacing: 1px;
  height: 70px;
  position: relative;

  :first-child {
    width: 80px;
  }

  :nth-child(2) {
    width: 80%;
  }

  &.history-ui-msgs {
    height: 100px;
  }
`;

const CollapseBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  background: none;
  border: none;
  border: none;
  height: 20px;
  border-radius: 4px;
  margin: auto;
  display: block;
  color: ${(props) => props.theme.text.light};
  cursor: pointer;
`;

const NoDataFound = styled.h2`
  display: block;
  font-size: 0.8rem;
  text-align: center;
  color: ${(props) => props.theme.text.dull};
  font-weight: 300;
  letter-spacing: 1px;
`;

const WrongWordsWrapper = styled.div`
  width: 100%;
  display: flex;
  overflow-x: auto;
  padding: 5px;
  justify-content: center;
`;

const WrongWordsContainer = styled.ul`
  margin-left: 35px;
  padding: 12px 0;
`;

const WrongWordContainer = styled.div`
  margin: 6px 0;
  display: flex;
  align-items: center;
  font-style: italic;
`;

const IoCloseCustom = styled(IoClose)`
  color: ${(props) => props.theme.text.error};
`;

const WrongWord = styled.li`
  list-style: none;
  font-size: 0.75rem;
  margin-left: 4px;
`;

const WrongWordLink = styled(Link)`
  color: ${(props) => props.theme.text.dull};
  text-decoration: none;
  text-decoration: line-through;

  &:hover {
    text-decoration: none;
  }
`;
