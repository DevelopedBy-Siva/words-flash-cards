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

export const questionOptions = (ignoredIndex, answer, words) => {
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

export const questionObject = (words, index) => {
  const { name, meaning } = words[index];
  const question = {
    name,
    answer: null,
    options: [],
    myChoice: null,
    status: null,
  };

  /*
     Get 3 Random indexes within a range for the option field
    */
  const { answer_index, options } = questionOptions(index, meaning, words);
  question.options = [...options];
  question.answer = answer_index;
  return question;
};

export const optionNumber = (index) => {
  switch (index) {
    case 0:
      return "A";
    case 1:
      return "B";
    case 2:
      return "C";
    case 3:
      return "D";
    default:
      return "";
  }
};

export function quizGenerator(count, latestWords, words) {
  const total_words = words.length;
  if (total_words < 4) return (window.location = "/");

  let range = [0, total_words];
  if (latestWords) range = [total_words - count, total_words];

  if (range[1] - range[0] < count) return (window.location = "/quiz");

  const indexes = randomUnique(count, ...range);
  let questions = [];
  indexes.forEach((index) => {
    const obj = questionObject(words, index);
    questions.push(obj);
  });

  return questions;
}
