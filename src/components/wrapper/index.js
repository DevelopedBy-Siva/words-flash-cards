import React from "react";
import styled from "styled-components";

export default function ContainerWrapper({
  isBox = true,
  contentBreak = false,
  center = false,
  children,
}) {
  return (
    <Wrapper isBox={isBox} contentBreak={contentBreak}>
      <Container as={center && CenterContainer} isBox={isBox}>
        {children}
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  width: 100%;
  min-height: ${(props) => (props.isBox ? "auto" : "100vh")};
  border-bottom: ${(props) =>
    props.contentBreak ? `1px solid ${props.theme.border.default}` : "none"};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  flex: ${(props) => (props.isBox ? "none" : 1)};
  min-height: 0;
  max-width: 1440px;
  padding: 1.2rem;
  position: relative;
`;

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
