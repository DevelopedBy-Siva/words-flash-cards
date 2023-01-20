import React from "react";
import styled from "styled-components";

import spinner from "../../assets/svgs/spinner.svg";

export default function Spinner({ top, left, right, bottom, size = 1 }) {
  return (
    <Svg
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      src={spinner}
      transformSize={size}
    />
  );
}

const Svg = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  transform: ${(props) => `scale(${props.transformSize})`};
`;
