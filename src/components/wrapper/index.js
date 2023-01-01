import React from "react";
import styled from "styled-components";

export default function ContainerWrapper({
  isBox = true,
  contentBreak = false,
  pos = null,
  children,
  cover = false,
}) {
  function fluidPosition() {
    const positions = ["center", "left", "right"];
    if (!positions.includes(pos)) return "";
    return `fluid-pos ${pos}`;
  }

  return (
    <Wrapper isBox={isBox} contentBreak={contentBreak}>
      <Container
        contentBreak={contentBreak}
        className={fluidPosition()}
        cover={cover}
        isBox={isBox}
      >
        {children}
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
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
  max-width: ${(props) => (props.cover ? "100%" : "1440px")};
  padding: ${(props) =>
    props.cover ? "0" : `${props.contentBreak ? "0.4rem 1.2rem" : "1.2rem"}`};
  position: relative;

  &.fluid-pos {
    display: flex;
    align-items: center;

    &.center {
      justify-content: center;
    }

    &.right {
      justify-content: flex-end;
    }

    &.left {
      justify-content: flex-start;
    }
  }
`;
