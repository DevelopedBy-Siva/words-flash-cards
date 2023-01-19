import React from "react";

import Wrapper from "../../components/wrapper";
import Header from "../../components/header";
import WordNavBar from "./WordNavBar";
import WordFilterSortNav from "./WordFilterSortNav";
import IndexedDbWarning from "./IndexedDbWarning";
import WordsWrapper from "./WordsWrapper";

export default function Words() {
  return (
    <Wrapper stretch>
      <Wrapper contain spaceAround>
        <Header name="Words" />
      </Wrapper>
      <Wrapper contain spaceAround border right>
        <WordNavBar />
      </Wrapper>
      <Wrapper contain spaceAround>
        <WordFilterSortNav />
      </Wrapper>
      <IndexedDbWarning />
      <Wrapper contain spaceAround grow>
        <WordsWrapper />
      </Wrapper>
    </Wrapper>
  );
}
