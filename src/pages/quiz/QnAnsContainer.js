import React, { useEffect, useState } from "react";
import Wrapper from "../../components/wrapper";

import words from "../../assets/data/words.json";

export default function QnAnsContainer({ formInput }) {
  const [questions, setQuestions] = useState({
    indexes: [],
    question: [],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const { value, latestWords } = formInput;

    const total_words = words.length;
    if (total_words < 4) window.location = "/";
    let range = [0, total_words];
    if (latestWords) {
      range = [total_words - value, total_words];
    }
    if (range[1] - range[0] < value) return (window.location = "/quiz");

    /*
     Get Random indexes within a range
    */
    const indexes = randomUnique(value, ...range);
    const { word, meaning } = words[indexes[0]];
    const question = {
      word,
      answer: null,
      options: [],
      myChoice: null,
      status: true,
    };

    /*
     Get 3 Random indexes within a range for the option field
    */
    const option_indexes = randomUnique(3, ...range, indexes[0]);
    const options = [];
    option_indexes.forEach((index) => {
      options.push(words[index].meaning);
    });

    /*
     Get a Random index for the answer for the options list
    */
    const answer_index = randomUnique(1, ...[0, 4])[0];
    /*
     Insert answer in the random position generated
    */
    options.splice(answer_index, 0, meaning);
    /*
     Update the state object
    */
    question.options = [...options];
    question.answer = answer_index;

    setQuestions({ indexes, question: [{ ...question }] });
  }, [formInput]);

  const randomUnique = (count, min, max, ignoredIndex = null) => {
    let nums = new Set();
    while (nums.size < count) {
      const index = Math.floor(
        Math.floor(Math.random() * (max - min + 1) + min)
      );
      if (ignoredIndex === index) continue;
      nums.add(index);
    }
    return [...nums];
  };

  console.log(questions);

  return (
    <Wrapper contain spaceAround grow>
      Hello
    </Wrapper>
  );
}
