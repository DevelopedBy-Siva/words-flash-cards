import React from "react";
import styled, { keyframes } from "styled-components";

export default function PageLoader() {
  return <Container />;
}

const Pulse = keyframes`
    to {
      transform: scale(0.8);
      opacity: 0.5;
    }
`;

const Container = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-family: Consolas, Menlo, Monaco, monospace;
  font-weight: bold;
  font-size: 4.6rem;
  opacity: 0.8;

  &:before {
    content: "{";
    display: inline-block;
    animation: ${Pulse} 0.4s alternate infinite ease-in-out;
  }
  &:after {
    content: "}";
    display: inline-block;
    animation: ${Pulse} 0.4s 0.3s alternate infinite ease-in-out;
  }
`;
