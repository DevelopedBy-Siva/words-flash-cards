import React from "react";
import styled from "styled-components";

import { HiHome } from "react-icons/hi";
import { MdStorage } from "react-icons/md";

const navs = [
  {
    title: "Home",
    icons: <HiHome />,
  },
  {
    title: "Local",
    icons: <MdStorage />,
  },
];

export default function WordStorageNav() {
  return (
    <Conatiner>
      {navs.map((nav, index) => (
        <NavBtns key={index}>
          {nav.icons}
          <NavTitle>{nav.title}</NavTitle>
        </NavBtns>
      ))}
    </Conatiner>
  );
}

const Conatiner = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 45px;
`;

const NavBtns = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  background-color: ${(props) => props.theme.button.dull};
  color: ${(props) => props.theme.text.dull};
  border: 1px solid ${(props) => props.theme.border.default};
  border-radius: 6px;
  cursor: pointer;

  &:first-child {
    margin-right: 10px;
  }
`;

const NavTitle = styled.span`
  margin-left: 5px;
`;
