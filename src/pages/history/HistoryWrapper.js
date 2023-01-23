import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { toast } from "react-toastify";

import HistoryTable from "./HistoryTable";
import Navigation from "./Navigation";
import { getHistory } from "../../db";
import { HISTORY_PER_PAGE } from "../../assets/constants";

export default function HistoryWrapper() {
  const [history, setHistory] = useState({
    loading: true,
    data: [],
    currentPage: 0,
  });

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    getHistory()
      .then((response) => {
        let data = [...response];
        data.forEach((i) => {
          const datetime = moment(i.timestamp).format("MMMM Do YYYY, h:mm a");
          i.timestamp = datetime;
        });
        setHistory({ loading: false, data });
      })
      .catch(() => {
        toast.error("Failed to retrieve history. Try after sometime");
      });
  }, []);

  const totalPages = Math.ceil(history.data.length / HISTORY_PER_PAGE);
  const pagesVisited = currentPage * HISTORY_PER_PAGE;
  const toDisplay = history.data.slice(
    pagesVisited,
    pagesVisited + HISTORY_PER_PAGE
  );

  return (
    <Wrapper>
      {totalPages > 1 ? (
        <Navigation
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        ""
      )}
      <HistoryTable
        currentPage={currentPage}
        isLoading={history.loading}
        toDisplay={toDisplay}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 20px;
`;
