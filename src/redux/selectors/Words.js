import { filterWords, getSortFilterType, sortWord } from "../../utils/Words";

export const getWords = (state, filterType, sortType) => {
  const filteredWords = filterWords(getSortFilterType("filter", filterType), [
    ...state.words.words,
  ]);
  const sortedWords = sortWord(
    getSortFilterType("sort", sortType),
    filteredWords
  );
  return sortedWords;
};
