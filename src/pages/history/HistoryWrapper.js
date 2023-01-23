import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getHistory } from "../../db";
import HistoryTable from "./HistoryTable";
import Navigation from "./Navigation";

export default function HistoryWrapper() {
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

  return (
    <React.Fragment>
      {history.data.length > 0 ? <Navigation /> : ""}
      <HistoryTable history={history} />
    </React.Fragment>
  );
}
