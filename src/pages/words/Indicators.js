import { useLottie } from "lottie-react";
import React from "react";
import styled from "styled-components";

import searching from "../../assets/data/loading.json";
import empty from "../../assets/data/empty.json";

export default function Indicators({ loading }) {
  const options = {
    animationData: loading ? searching : empty,
    loop: loading ? true : false,
  };
  const { View } = useLottie(options);
  return (
    <AnimationContainer>
      <ViewContainer>{View}</ViewContainer>
      <IndicatorText>
        {loading ? "Loading..." : "No words found..."}
      </IndicatorText>
    </AnimationContainer>
  );
}

const AnimationContainer = styled.div`
  margin: 15px auto;
`;

const ViewContainer = styled.div`
  margin: auto;
  width: 90px;
`;

const IndicatorText = styled.span`
  text-align: center;
  display: block;
  color: ${(props) => props.theme.text.dull};
  letter-spacing: 2px;
  font-size: 0.8rem;
  margin-left: 6px;
  margin-top: 4px;
`;
