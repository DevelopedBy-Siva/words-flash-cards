import React from "react";
import styled from "styled-components";
import { FiPlus } from "react-icons/fi";

import Wrapper from "../../components/wrapper";
import Loader from "../../components/loader";

export default function HistoryTable({ history }) {
  const getScore = (score) => {
    score = score ? score : "";
    const split = score.split(":");
    return {
      myScore: split[0],
      total: split[1],
    };
  };

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
          {history.loading ? (
            <TR>
              <TD className="history-ui-msgs" colSpan={3}>
                <Loader center />
              </TD>
            </TR>
          ) : history.data.length === 0 ? (
            <TR>
              <TD className="history-ui-msgs" colSpan={3}>
                <NoDataFound>No previous quiz records found.</NoDataFound>
              </TD>
            </TR>
          ) : (
            history.data.map((data, index) => {
              const { myScore, total } = getScore(data.score);
              return (
                <TR key={index}>
                  <TD>
                    <CollapseBtn>
                      <FiPlus />
                    </CollapseBtn>
                  </TD>
                  <TD>{data.timestamp}</TD>
                  <TD>
                    {myScore} &#47; {total}
                  </TD>
                </TR>
              );
            })
          )}
        </TBody>
      </Table>
    </Wrapper>
  );
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
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

  &.collapse-btn {
    width: 38px;
  }
`;

const TD = styled.td`
  padding: 14px 2px;
  color: ${(props) => props.theme.text.dull};
  font-size: 0.9rem;
  font-weight: 400;
  text-align: center;
  letter-spacing: 1px;
  position: relative;

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
