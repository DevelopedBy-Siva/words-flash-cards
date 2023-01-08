import React from "react";

import Wrapper from "../../components/wrapper";
import Header from "../../components/header";
import WordsContainer from "./WordsContainer";
import WordNavBar from "./WordNavBar";

export default function Words() {
  return (
    <Wrapper stretch>
      <Wrapper contain spaceAround>
        <Header name="Words" sub="599" />
      </Wrapper>
      <Wrapper contain spaceAround border right>
        <WordNavBar />
      </Wrapper>
      <Wrapper contain spaceAround grow>
        <WordsContainer />
      </Wrapper>
    </Wrapper>
  );
}
