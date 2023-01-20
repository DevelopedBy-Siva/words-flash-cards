import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

import FontSize from "../../assets/styles/FontSizes.json";

export default function Header({ name, sub }) {
  return (
    <Container>
      <BackLink to="/" replace>
        <BiArrowBack />
      </BackLink>
      <Heading>
        {name} {sub && <SubHeading>&#40;{sub}&#41;</SubHeading>}
      </Heading>
    </Container>
  );
}

const Container = styled.header`
  height: 50px;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.text.light};
`;
const Heading = styled.h1`
  text-transform: uppercase;
  font-size: ${FontSize.HEADER.TITLE};
  margin-left: 10px;
  letter-spacing: 1px;
  font-weight: 400;
`;

const SubHeading = styled.span`
  font-size: ${FontSize.HEADER.SUB_HEAD};
  letter-spacing: 1px;
  font-weight: 300;
`;

const BackLink = styled(Link)`
  border: none;
  background: none;
  color: ${(props) => props.theme.text.light};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: ${FontSize.HEADER.BACK_ICON};
`;
