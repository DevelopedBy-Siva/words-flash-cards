import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Wrapper from "../../components/wrapper";
import Header from "../../components/header";

export default function History() {
  const navigate = useNavigate();

  useEffect(() => {
    alert("Feature not yet implemented. Planned for next release");
    navigate("/");
  }, [navigate]);

  return (
    <Wrapper stretch>
      <Wrapper contain spaceAround>
        <Header name="History" />
      </Wrapper>
    </Wrapper>
  );
}
