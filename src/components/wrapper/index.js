import React from "react";
import styled from "styled-components";

export default function WrapperContainer({
  stretch = false,
  border = false,
  center = false,
  right = false,
  contain = false,
  spaceAround = false,
  children,
}) {
  return (
    <Wrapper
      className={`${stretch ? "stretch" : ""} ${
        border ? "content-border" : ""
      }`}
    >
      <SubWrapper
        border={border}
        className={`${spaceAround ? "space-around" : ""} ${
          center ? "center" : ""
        } ${contain ? "contain" : ""} ${right ? "item-right" : ""}`}
      >
        {children}
      </SubWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;

  &.stretch {
    min-height: 100vh;
  }

  &.content-border {
    border-bottom: ${(props) => `1px solid ${props.theme.border.default}`};
  }
`;

const SubWrapper = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;

  &.space-around {
    padding: ${(props) => (props.border ? "0.2rem 1.2rem" : "0.6rem 1.2rem")};
  }

  &.contain {
    max-width: 1440px;
  }

  &.center {
    justify-content: center;
  }

  &.item-right {
    align-items: flex-end;
  }
`;
