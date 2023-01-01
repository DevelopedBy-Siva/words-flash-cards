import React from "react";
import styled from "styled-components";
import { BiArrowBack } from "react-icons/bi";

import FontSize from "../../assets/styles/FontSizes.json";

export default function Header({ name }) {
  return (
    <Container>
      <BackBtn>
        <BiArrowBack />
      </BackBtn>
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
`;

const BackBtn = styled.button`
  border: none;
  outline: none;
  background: none;
  color: ${(props) => props.theme.text.light};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: ${FontSize.HEADER.BACK_ICON};
`;
