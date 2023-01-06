import words from "../assets/data/words.json";

/**
 * Generate random unique numbers within a range
 */
export const randomUnique = (count, min, max, ignoredIndex = null) => {
  let nums = new Set();
  while (nums.size < count) {
    const index = Math.floor(Math.random() * (max - min) + min);
    if (ignoredIndex === index) continue;
    nums.add(index);
  }
  return [...nums];
};

export const questionOptions = (ignoredIndex, answer) => {
  /*
     Get 3 Random indexes within a range for the option field
    */
  const option_indexes = randomUnique(3, ...[0, words.length], ignoredIndex);
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
  options.splice(answer_index, 0, answer);

  return {
    answer_index,
    options,
  };
};

export const questionObject = (index) => {
  const { word, meaning } = words[index];
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
  const { answer_index, options } = questionOptions(index, meaning);
  question.options = [...options];
  question.answer = answer_index;
  return question;
};
