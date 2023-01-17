import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import FontSize from "../../assets/styles/FontSizes.json";
import { getUser } from "../../utils/User";
import Wrapper from "../../components/wrapper";

const { user, isNewUser } = getUser();
export default function Home() {
  return (
    <Wrapper stretch center contain spaceAround>
      <Container>
        <User>Hello {user}</User>
        <WelcomeBackMsg>
          {isNewUser ? "Welcome !" : "Welcome Back !"}
        </WelcomeBackMsg>
        <BoxContainer>
          <BoxLink to="/words?filter=ALL&sort=A_Z&page=1&search=">
            Words
          </BoxLink>
          <BoxLink to="/quiz">Take quiz</BoxLink>
          <BoxLink to="/history">History</BoxLink>
        </BoxContainer>
      </Container>
    </Wrapper>
  );
}

const Container = styled.div`
  padding: 0.8rem;
  width: auto;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const User = styled.h2`
  color: ${(props) => props.theme.text.light};
  font-size: ${FontSize.HOME.NAME};
  font-weight: 400;
  margin-bottom: 6px;
  text-transform: capitalize;

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
  align-items: center;
  justify-content: center;
  width: fit-content;
  margin-top: 32px;
`;

const BoxLink = styled(Link)`
  width: 250px;
  height: 180px;
  font-size: ${FontSize.HOME.BOX};
  font-weight: 500;
  letter-spacing: 1px;
  border-radius: 10px;
  margin: 0 10px 10px 0;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
  border: none;
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

  &:nth-child(2) {
    background: ${(props) => props.theme.boxes.home_box_2};
  }

  &:nth-child(3) {
    background: ${(props) => props.theme.boxes.home_box_3};
  }

  @media screen and (max-width: 864px) {
    width: 210px;
    height: 130px;
  }
`;
