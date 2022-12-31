import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import ContainerWrapper from "./Wrapper";

export default function Container() {
  return (
    <Wrapper>
      <ContainerWrapper contentBreak>Header</ContainerWrapper>
      <ContainerWrapper>
        <Outlet />
      </ContainerWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;
