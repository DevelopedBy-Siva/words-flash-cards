import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { IoFilterSharp } from "react-icons/io5";
import { BiSort } from "react-icons/bi";
import { MdArrowDropDown } from "react-icons/md";

const navs = [
  {
    title: "filter",
    icons: <IoFilterSharp />,
    items: [
      {
        item: "all",
        link: "/",
      },
      {
        item: "local storage",
        link: "/",
      },
    ],
  },
  {
    title: "sort",
    icons: <BiSort />,
    items: [
      {
        item: "By Word (A-Z)",
        link: "/",
      },
      {
        item: "By Word (Z-A)",
        link: "/",
      },
      {
        item: "By Date (Oldest - Newest)",
        link: "/",
      },
      {
        item: "By Date (Newest - Oldest)",
        link: "/",
      },
    ],
  },
];

export default function WordStorageNav() {
  const dropdownRef = useRef([]);

  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!active) return document.removeEventListener("click", handleClick);

    function handleClick(e) {
      let isInside = false;
      dropdownRef.current.forEach((ref) => {
        if (ref.contains(e.target)) {
          isInside = true;
          return;
        }
      });

      if (!isInside) setActive(null);
    }
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [active]);

  function toggleDropdown(title = null) {
    if (active === title) title = null;
    setActive(title);
  }

  return (
    <Conatiner>
      {navs.map((nav, index) => (
        <BtnContainer
          ref={(ele) => (dropdownRef.current[index] = ele)}
          key={index}
        >
          <NavBtns onClick={() => toggleDropdown(nav.title)}>
            {nav.icons}
            <NavTitle>{nav.title}</NavTitle>
            <MdArrowDropDown />
          </NavBtns>
          {active && active === nav.title && (
            <DropDown items={nav.items} toggleDropdown={toggleDropdown} />
          )}
        </BtnContainer>
      ))}
    </Conatiner>
  );
}

function DropDown({ items = [], toggleDropdown }) {
  return (
    <DropdownContainer onClick={() => toggleDropdown(null)}>
      {items.map((i, index) => (
        <DropdownItem key={index}>{i.item}</DropdownItem>
      ))}
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

  &:hover {
    border: 1px solid ${(props) => props.theme.border.grey};
    color: ${(props) => props.theme.text.light};
  }
  &:active {
    color: ${(props) => props.theme.text.light};
  }
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
  overflow: hidden;
`;

const DropdownItem = styled.li`
  list-style: none;
  text-align: left;
  padding: 10px 15px;
  border-bottom: 1px solid ${(props) => props.theme.border.default};
  color: ${(props) => props.theme.text.dull};
  font-size: 0.75rem;
  cursor: pointer;
  text-transform: capitalize;

  &:last-child {
    border: none;
  }

  &:hover {
    background-color: ${(props) => props.theme.button.blue};
    color: ${(props) => props.theme.text.light};
  }
`;
