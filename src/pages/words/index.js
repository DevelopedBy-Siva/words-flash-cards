import React from "react";

import Wrapper from "../../components/wrapper";
import Header from "../../components/header";
import WordsContainer from "./WordsContainer";

export default function Words() {
  return (
    <Wrapper stretch>
      <Wrapper contain spaceAround>
        <Header name="Words" sub="599" />
      </Wrapper>
      <Wrapper contain spaceAround border></Wrapper>
      <Wrapper contain spaceAround grow>
        <WordsContainer />
      </Wrapper>
    </Wrapper>
  );
}
