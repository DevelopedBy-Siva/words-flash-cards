import React from "react";
import styled, { keyframes } from "styled-components";

export default function LoadingSpinner({
  size = "25",
  thick = "2px",
  center = false,
  top = false,
}) {
  const ringSize = size - 5;
  return (
    <Container
      size={size}
      className={`${center ? "spinner-center" : ""} ${
        top ? "spinner-top-center" : ""
      }`}
    >
      <Ring size={ringSize} thick={thick} />
      <Ring size={ringSize} thick={thick} />
      <Ring size={ringSize} thick={thick} />
      <Ring size={ringSize} thick={thick} />
    </Container>
  );
}

const Container = styled.div`
  display: inline-block;
  position: absolute;
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};

  &.spinner-center {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &.spinner-top-center {
    top: 10%;
    transform: translate(-50%, 0%);
  }
`;

const SpinnerAnim = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Ring = styled.div`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  margin: ${(props) => props.thick};
  border: ${(props) => `${props.thick} solid ${props.theme.text.light}`};
  border-radius: 50%;
  animation: ${SpinnerAnim} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;

  &:nth-child(1) {
    animation-delay: -0.45s;
  }
  &:nth-child(2) {
    animation-delay: -0.3s;
  }
  &:nth-child(3) {
    animation-delay: -0.15s;
  }
`;
