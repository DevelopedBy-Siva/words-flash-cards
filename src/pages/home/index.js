import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import FontSize from "../../assets/styles/FontSizes.json";
import QuizBox from "./QuizBox";

export default function Home() {
  return (
    <Wrapper>
      <Container>
        <User>Hello Sivasanker</User>
        <WelcomeBackMsg>Welcome Back !</WelcomeBackMsg>
        <BoxContainer>
          <BoxLink to="/words">Words</BoxLink>
          <QuizBox />
          <BoxLink to="/history">History</BoxLink>
        </BoxContainer>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  letter-spacing: 2px;
  padding: 1.2rem;
`;

const Container = styled.div`
  padding: 0.8rem;
`;

const User = styled.h2`
  color: ${(props) => props.theme.text.light};
  font-size: ${FontSize.HOME.NAME};
  font-weight: 400;
  margin-bottom: 6px;

  @media screen and (max-width: 864px) {
    font-size: ${FontSize.HOME.NAME_800};
  }
`;

const WelcomeBackMsg = styled.h3`
  color: ${(props) => props.theme.text.dull};
  font-weight: 300;
  font-size: ${FontSize.HOME.WLCM};

  @media screen and (max-width: 864px) {
    font-size: ${FontSize.HOME.WLCM_800};
  }
`;

const BoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
`;

const BoxLink = styled(Link)`
  width: 250px;
  height: 180px;
  font-size: ${FontSize.HOME.BOX};
  border-radius: 10px;
  margin: 0 10px 10px 0;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.text.default};
  transition: transform 0.4s 0.1s ease-in-out;
  transform-origin: center;

  &:hover {
    transform: scale(0.96);
  }

  &:nth-child(1) {
    background: ${(props) => props.theme.boxes.home_box_1};
  }

  &:nth-child(3) {
    background: ${(props) => props.theme.boxes.home_box_3};
  }

  @media screen and (max-width: 864px) {
    width: 210px;
    height: 130px;
  }
`;
