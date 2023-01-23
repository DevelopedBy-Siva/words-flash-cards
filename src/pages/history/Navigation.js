import React from "react";
import styled from "styled-components";
import { MdOutlineArrowBackIos } from "react-icons/md";

import Wrapper from "../../components/wrapper";

export default function Navigation() {
  return (
    <Wrapper contain spaceAround right>
      <ButtonContainer>
        <NavBtn>
          <MdOutlineArrowBackIos />
        </NavBtn>
        <NavBtn className="next-btn">
          <MdOutlineArrowBackIos />
        </NavBtn>
      </ButtonContainer>
    </Wrapper>
  );
}

const ButtonContainer = styled.div`
  display: flex;
`;

const NavBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 0.85rem;
  color: ${(props) => props.theme.text.default};
  background: ${(props) => props.theme.background.white};
  border: none;
  border-radius: 4px;

  &.next-btn {
    transform: rotate(180deg);
    margin-left: 5px;
  }
`;
