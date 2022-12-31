import React from "react";
import styled from "styled-components";

export default function ContainerWrapper({
  isBox = true,
  contentBreak = false,
  children,
}) {
  return (
    <Wrapper isBox={isBox} contentBreak={contentBreak}>
      <Container isBox={isBox}>{children}</Container>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  height: ${(props) => (props.isBox ? "auto" : "100%")};
  border-bottom: ${(props) =>
    props.contentBreak ? `1px solid ${props.theme.border.default}` : "none"};
`;

const Container = styled.div`
  width: 100%;
  height: ${(props) => (props.isBox ? "auto" : "100%")};
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
  padding: 1.2rem;
`;
