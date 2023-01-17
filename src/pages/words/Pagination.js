import React from "react";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import { GrFormNext } from "react-icons/gr";

export default function Pagination({ pageCount, pageNumber, setPageNumber }) {
  const onPageChange = ({ selected }) => {
    pageNumber.set("page", selected + 1);
    setPageNumber(pageNumber);
  };

  return (
    <PaginateContainer
      previousLabel={<PaginateBtn isNxt={false} />}
      nextLabel={<PaginateBtn />}
      pageCount={pageCount}
      onPageChange={onPageChange}
      renderOnZeroPageCount={null}
      activeLinkClassName="active-page-btn"
      nextClassName="next-page-btn"
      previousClassName="prev-page-btn"
    />
  );
}

function PaginateBtn({ isNxt = true }) {
  return (
    <NxtBckContainer isNxt={isNxt ? 1 : 0}>
      <GrFormNext style={{ color: "white" }} />
    </NxtBckContainer>
  );
}

const PaginateContainer = styled(ReactPaginate)`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 50px;
  justify-content: center;
  list-style-type: none;
  position: relative;
  width: 95%;

  a {
    box-sizing: border-box;
    margin: 0 8px;
    width: 40px;
    height: 28px;
    display: block;
    text-align: center;
    font-size: 0.75rem;
    font-family: inherit;
    font-weight: 600;
    cursor: pointer;
    border-radius: 6px;
    border: 1px solid ${(props) => props.theme.border.default};
    color: ${(props) => props.theme.text.dull};
    background-color: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    user-select: none;
  }

  .active-page-btn {
    background-color: ${(props) => props.theme.button.default};
    color: ${(props) => props.theme.text.default};
  }

  li {
    color: red !important;
  }

  .next-page-btn {
    color: red !important;
  }

  .prev-page-btn {
  }
`;

const NxtBckContainer = styled.button`
  transform: ${(props) => (props.isNxt ? "rotate(0deg)" : "rotate(-180deg)")};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border: none;
  background: none;
  font-size: 1.4rem;
  pointer-events: none;
`;
