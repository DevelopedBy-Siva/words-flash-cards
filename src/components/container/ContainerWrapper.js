import React from "react";
import styled from "styled-components";

export default function ContainerWrapper({ isBox = true, children }) {
  return <Container isBox={isBox}>{children}</Container>;
}

const Container = styled.section`
  width: 100%;
  max-width: 1440px;
  height: ${(props) => (props.isBox ? "auto" : "100%")};
  margin-left: auto;
  margin-right: auto;
  padding: 1.4rem;
`;
