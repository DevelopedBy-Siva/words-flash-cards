import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

import FontSize from "../../assets/styles/FontSizes.json";

export default function Header({ name, confirmBack = false }) {
  const navigate = useNavigate();

  function goBack() {
    if (confirmBack) {
      const dontGo = window.confirm("Quiz is in progress. Still wanna leave?");
      if (!dontGo) return;
    }
    return navigate("/");
  }

  return (
    <Container>
      <BackLink onClick={goBack}>
        <BiArrowBack />
      </BackLink>
      <Heading>{name}</Heading>
    </Container>
  );
}

const Container = styled.header`
  height: 50px;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.text.light};
`;
const Heading = styled.h1`
  text-transform: uppercase;
  font-size: ${FontSize.HEADER.TITLE};
  margin-left: 10px;
  letter-spacing: 1px;
  font-weight: 400;
`;

const BackLink = styled.button`
  border: none;
  background: none;
  color: ${(props) => props.theme.text.light};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: ${FontSize.HEADER.BACK_ICON};
`;
