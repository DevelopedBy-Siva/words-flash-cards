import React from "react";
import styled from "styled-components";

import Wrapper from "../../components/wrapper";

export default function Navigation({
  totalPages,
  currentPage,
  setCurrentPage,
}) {
  const isBackDisabled = currentPage === 0;
  const isNextDisabled = currentPage === totalPages - 1;

  function onBack() {
    if (isBackDisabled) return;
    setCurrentPage(currentPage - 1);
  }

  function onNext() {
    if (isNextDisabled) return;
    setCurrentPage(currentPage + 1);
  }

  return (
    <Wrapper contain spaceAround>
      <Container>
        <NavBtn onClick={onBack} disabled={isBackDisabled}>
          Previous
        </NavBtn>
        <PageTrack>
          Page {currentPage + 1} of {totalPages}
        </PageTrack>
        <NavBtn onClick={onNext} disabled={isNextDisabled}>
          Next
        </NavBtn>
      </Container>
    </Wrapper>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PageTrack = styled.span`
  display: block;
  text-align: center;
  color: ${(props) => props.theme.text.dull};
  font-size: 0.75rem;
`;

const NavBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  width: 70px;
  cursor: pointer;
  font-size: 0.7rem;
  color: ${(props) => props.theme.text.light};
  background: ${(props) => props.theme.button.blue};
  border: 1px solid ${(props) => props.theme.border.default};
  border-radius: 4px;

  &.next-btn {
    transform: rotate(180deg);
    margin-left: 5px;
  }

  &:disabled {
    cursor: not-allowed;
    background: none;
    color: ${(props) => props.theme.text.default};
  }
`;
