import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useTable } from "react-table";

import { TABLE_COLUMN } from "../../utils/History";
import { getHistory } from "../../db";
import { toast } from "react-toastify";

export default function HistoryContainer() {
  const [history, setHistory] = useState({
    loading: true,
    data: [],
  });

  useEffect(() => {
    getHistory()
      .then((data) => {
        setHistory({ loading: false, data });
      })
      .catch(() => {
        toast.error("Failed to retrieve history. Try after sometime");
      });
  }, []);

  const columns = useMemo(() => TABLE_COLUMN, []);
  const data = useMemo(() => history.data, [history.data]);

  const table = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    table;

  return (
    <Container>
      <HistoryTable {...getTableProps()}>
        <THead>
          {headerGroups.map((headerGroup) => (
            <TR {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((col) => (
                <TH {...col.getHeaderProps()}>{col.render("Header")}</TH>
              ))}
            </TR>
          ))}
        </THead>
        <TBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <TR {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <TD {...cell.getCellProps()}>{cell.render("Cell")}</TD>
                ))}
              </TR>
            );
          })}
        </TBody>
      </HistoryTable>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const HistoryTable = styled.table`
  border-collapse: collapse;
  margin-top: 30px;
  width: 100%;
`;

const THead = styled.thead``;

const TBody = styled.tbody``;

const TR = styled.tr``;

const TH = styled.th`
  letter-spacing: 1px;
  background-color: ${(props) => props.theme.background.white};
  padding: 12px 4px;
  font-weight: 500;
  text-transform: capitalize;
  color: ${(props) => props.theme.text.default};
  font-size: 0.9rem;
  border: 1px solid ${(props) => props.theme.border.default};
`;

const TD = styled.td`
  border: 1px solid ${(props) => props.theme.border.default};
`;
