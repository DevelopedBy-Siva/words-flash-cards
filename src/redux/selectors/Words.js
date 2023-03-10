import { filterWords, getSortFilterType, sortWord } from "../../utils/Words";

export const getWords = (words, filterType, sortType) => {
  const filteredWords = filterWords(getSortFilterType("filter", filterType), [
    ...words,
  ]);
  const sortedWords = sortWord(
    getSortFilterType("sort", sortType),
    filteredWords
  );
  return sortedWords;
};
