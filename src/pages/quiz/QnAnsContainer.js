import React, { useEffect } from "react";
import Wrapper from "../../components/wrapper";

import words from "../../assets/data/words.json";

export default function QnAnsContainer({ formInput, question, setQuestion }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const { value, latestWords } = formInput;

    const total_words = words.length();

    const abc = [1, 21];
    const val = randomUnique(20, ...abc);
    console.log(val);
  }, []);

  const randomUnique = (count, min, max) => {
    let nums = new Set();
    while (nums.size < count) {
      nums.add(Math.floor(Math.floor(Math.random() * (max - min) + min)));
    }
    return [...nums];

    // console.log("Min " + min + " Max: " + max);
    // return ;
  };

  return (
    <Wrapper contain spaceAround grow>
      Hello
    </Wrapper>
  );
}
