import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { IoFilterSharp } from "react-icons/io5";
import { BiSort } from "react-icons/bi";
import { MdArrowDropDown } from "react-icons/md";

const navs = [
  {
    title: "filter",
    icons: <IoFilterSharp />,
  },
  {
    title: "sort",
    icons: <BiSort />,
  },
];

export default function WordStorageNav() {
  const [active, setActive] = useState(null);

  const dropdownRef = useRef([]);

  useEffect(() => {
    if (!active) return document.removeEventListener("click", handleClick);

    function handleClick(e) {
      console.log(active);
      if (active && !dropdownRef.current[active.index].contains(e.target))
        toggleDropdown();
    }
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [active]);

  function toggleDropdown(obj = null) {
    setActive(obj);
  }

  return (
    <Conatiner>
      {navs.map((nav, index) => (
        <BtnContainer
          ref={(ele) => (dropdownRef.current[index] = ele)}
          key={index}
        >
          <NavBtns onClick={() => toggleDropdown({ title: nav.title, index })}>
            {nav.icons}
            <NavTitle>{nav.title}</NavTitle>
            <MdArrowDropDown />
          </NavBtns>
          {active && active.title === nav.title && (
            <DropDown toggleDropdown={toggleDropdown} />
          )}
        </BtnContainer>
      ))}
    </Conatiner>
  );
}

function DropDown({ toggleDropdown }) {
  return (
    <DropdownContainer onClick={() => toggleDropdown(null)}>
      <DropdownList>All</DropdownList>
      <DropdownList>Local Database</DropdownList>
    </DropdownContainer>
  );
}

const Conatiner = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 45px;
`;

const BtnContainer = styled.div`
  position: relative;

  &:first-child {
    margin-right: 10px;
  }
`;

const NavBtns = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  background: none;
  color: ${(props) => props.theme.text.dull};
  border: 1px solid ${(props) => props.theme.border.default};
  border-radius: 6px;
  cursor: pointer;
  user-select: none;
`;

const NavTitle = styled.span`
  margin: 0 2px 0 6px;
  text-transform: capitalize;
`;

const DropdownContainer = styled.ul`
  position: absolute;
  width: 140px;
  border: 1px solid ${(props) => props.theme.border.default};
  background: ${(props) => props.theme.button.app};
  outline: none;
  top: 40px;
  right: 0;
  border-radius: 6px;
  z-index: 1;
`;

const DropdownList = styled.li`
  list-style: none;
  text-align: left;
  padding: 15px;
  border-bottom: 1px solid ${(props) => props.theme.border.default};
  color: ${(props) => props.theme.text.dull};
  font-size: 0.8rem;

  &:last-child {
    border: none;
  }
`;
