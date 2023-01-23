import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { FiPlus } from "react-icons/fi";

import Wrapper from "../../components/wrapper";
import { getHistory } from "../../db";

export default function HistoryContainer() {
  const [history, setHistory] = useState({
    loading: true,
    data: [],
  });

  useEffect(() => {
    getHistory()
      .then((response) => {
        let data = [...response];
        data.forEach((i) => {
          const iso = new Date(i.timestamp).toISOString();
          i.timestamp = iso.substring(0, 10);
        });
        setHistory({ loading: false, data });
      })
      .catch(() => {
        toast.error("Failed to retrieve history. Try after sometime");
      });
  }, []);

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
      <HistoryTable>
        <THead>
          <TR>
            <TH className="collapse-btn" />
            <TH>Date</TH>
            <TH>Score</TH>
          </TR>
        </THead>
        <TBody>
          {history.data.map((data, index) => {
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
          })}
        </TBody>
      </HistoryTable>
    </Wrapper>
  );
}

const HistoryTable = styled.table`
  margin-top: 30px;
  width: 100%;
  border-collapse: collapse;
`;

const THead = styled.thead``;

const TBody = styled.tbody``;

const TR = styled.tr``;

const TH = styled.th`
  letter-spacing: 1px;
  background-color: ${(props) => props.theme.background.white};
  padding: 15px 4px;
  font-weight: 500;
  text-transform: capitalize;
  color: ${(props) => props.theme.text.default};
  font-size: 0.9rem;

  &.collapse-btn {
    width: 38px;
  }
`;

const TD = styled.td`
  padding: 14px 2px;
  color: ${(props) => props.theme.text.light};
  font-size: 0.9rem;
  font-weight: 300;
  text-align: center;
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
