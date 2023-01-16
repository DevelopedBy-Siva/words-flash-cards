import React from "react";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import { GrFormNext } from "react-icons/gr";

import { WORDS_PER_PAGE } from "../../assets/constants";

export default function Pagination({ totalWords, pageNumber, setPageNumber }) {
  const onPageChange = ({ selected }) => {
    pageNumber.set("page", selected + 1);
    setPageNumber(pageNumber);
  };

  const pageCount = Math.ceil(totalWords / WORDS_PER_PAGE);
  return (
    <PaginateContainer
      previousLabel={<PaginateBtn isNxt={false} />}
      nextLabel={<PaginateBtn />}
      pageCount={pageCount}
      onPageChange={onPageChange}
    />
  );
}

function PaginateBtn({ isNxt = true }) {
  return (
    <NxtBckContainer isNxt={isNxt ? 1 : 0}>
      <GrFormNext style={{ color: "red" }} />
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
`;

const NxtBckContainer = styled.button`
  transform: ${(props) => (props.isNxt ? "rotate(0deg)" : "rotate(-180deg)")};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  color: white;
  border-radius: 50%;
  background: ${(props) => props.theme.button.dull};
  border: none;
`;
