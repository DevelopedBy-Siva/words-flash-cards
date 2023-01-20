import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { MdArrowDropDown } from "react-icons/md";
import { TiTick } from "react-icons/ti";

import { getSortFilterType, SORT_FILTER_NAV } from "../../utils/Words";

export default function WordFilterSortNav() {
  const dropdownRef = useRef([]);

  const [active, setActive] = useState(null);

  const [searchParams, setSearchParam] = useSearchParams();

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

  const activeNav = () => getSortFilterType(active, searchParams.get(active));

  return (
    <Conatiner>
      {SORT_FILTER_NAV.map((nav, index) => (
        <BtnContainer
          ref={(ele) => (dropdownRef.current[index] = ele)}
          key={index}
        >
          <NavBtns
            className={active === nav.title ? "words-nav-active" : ""}
            onClick={() => toggleDropdown(nav.title)}
          >
            {nav.icons}
            <NavTitle>{nav.title}</NavTitle>
            <MdArrowDropDown />
          </NavBtns>
          {active === nav.title && (
            <DropDown
              active={active}
              items={nav.items}
              activeParam={activeNav()}
              toggleDropdown={toggleDropdown}
              updateParams={setSearchParam}
              searchParams={searchParams}
            />
          )}
        </BtnContainer>
      ))}
    </Conatiner>
  );
}

function DropDown({
  active,
  items = [],
  toggleDropdown,
  activeParam,
  updateParams,
  searchParams,
}) {
  function updateSearchParam(param) {
    if (searchParams.get(active) === param) return;
    searchParams.set(active, param);
    searchParams.set("page", 1);
    updateParams(searchParams);
  }

  return (
    <DropdownContainer
      className={`dropdown-${active}`}
      onClick={() => toggleDropdown(null)}
    >
      {items.map((i, index) => (
        <DropdownItem onClick={() => updateSearchParam(i.param)} key={index}>
          <DropdownItemName>{i.item}</DropdownItemName>
          {i.param === activeParam ? <TiTickCustom /> : ""}
        </DropdownItem>
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

  &.words-nav-active {
    border: 1px solid ${(props) => props.theme.border.grey};
    color: ${(props) => props.theme.text.light};
  }

  &:hover {
    border: 1px solid ${(props) => props.theme.border.grey};
    color: ${(props) => props.theme.text.light};
  }
`;

const NavTitle = styled.span`
  margin: 0 2px 0 6px;
  text-transform: capitalize;
`;

const DropdownContainer = styled.ul`
  position: absolute;
  width: max-content;
  min-width: 135px;
  border: 1px solid ${(props) => props.theme.border.default};
  background: ${(props) => props.theme.button.app};
  outline: none;
  top: 40px;
  right: 0;
  border-radius: 6px;
  z-index: 1;
  overflow: hidden;

  &.dropdown-sort {
    min-width: 198px;
  }
`;

const TiTickCustom = styled(TiTick)`
  flex-shrink: 0;
  margin-left: 15px;
  color: ${(props) => props.theme.button.green};
  font-size: 0.9rem;
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
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    border: none;
  }

  &:hover {
    background-color: ${(props) => props.theme.button.blue};
    color: ${(props) => props.theme.text.light};
  }

  &:hover ${TiTickCustom} {
    color: ${(props) => props.theme.button.default};
  }
`;

const DropdownItemName = styled.span`
  flex: 1;
`;
