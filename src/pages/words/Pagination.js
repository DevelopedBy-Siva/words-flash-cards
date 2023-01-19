import React from "react";
import styled from "styled-components";
import Scroll from "react-scroll";
import { useSearchParams } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";

const scroll = Scroll.animateScroll;
const options = { duration: 500 };

export default function Pagination({ currentPage, pageCount }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const changePage = (page) => {
    searchParams.set("page", page);
    setSearchParams(searchParams);
    scroll.scrollToTop(options);
  };

  const disableNext = currentPage === pageCount;
  const disableBack = currentPage === 1;

  const onNext = () => {
    if (disableNext) return;
    const page = currentPage + 1;
    changePage(page);
  };

  const onBack = () => {
    if (disableBack) return;
    const page = currentPage - 1;
    changePage(page);
  };

  if (pageCount <= 1) return "";
  return (
    <Container>
      <NextBack
        handleClick={onBack}
        disable={disableBack}
        onClick={onBack}
        isBack={true}
      />
      {Array.from(Array(pageCount)).map((_, index) => {
        const pageNo = index + 1;
        return (
          <Page
            active={pageNo === currentPage ? 1 : 0}
            onClick={() => changePage(pageNo)}
            key={pageNo}
          >
            {pageNo}
          </Page>
        );
      })}
      <NextBack handleClick={onNext} disable={disableNext} />
    </Container>
  );
}

function NextBack({ disable, handleClick, isBack = false }) {
  return (
    <NxtBckContainer
      onClick={handleClick}
      className={`next-back ${disable ? "disable-pagination-btn" : ""}`}
      isBack={isBack ? 1 : 0}
    >
      <MdArrowBackIosNew />
    </NxtBckContainer>
  );
}

const Container = styled.ul`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 8px;
  margin: 10px 0 48px 0;
`;

const Page = styled.li`
  list-style: none;
  width: 36px;
  height: 36px;
  padding: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 0.8rem;
  margin: 0 5px;
  color: ${(props) =>
    props.active ? props.theme.text.default : props.theme.text.dull};
  background-color: ${(props) =>
    props.active ? props.theme.button.default : "none"};
  border-radius: 50%;
  cursor: pointer;
  user-select: none;
`;

const NxtBckContainer = styled.li`
  transform: ${(props) => (props.isBack ? "rotate(0deg)" : "rotate(-180deg)")};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.text.dull};
  background: none;
  font-size: 1.2rem;
  list-style: none;
  margin: 0 15px;
  cursor: pointer;

  &.disable-pagination-btn {
    color: ${(props) => props.theme.button.dull};
    cursor: not-allowed;
  }
`;
