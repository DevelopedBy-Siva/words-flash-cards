import _ from "lodash";

import { getWordsFromDb } from "../../db";
import {
  ADD_NEW_WORD,
  FETCH_LOADING,
  FETCH_WORDS,
} from "../actions/Words_ActionTypes";
import { fetchLoading, fetchWords } from "../actions/Words_Actions";

const initialState = {
  loading: true,
  words: [],
  error: false,
};

const reducer = (state = initialState, action) => {
  const { payload, type, error } = action;
  switch (type) {
    case FETCH_LOADING:
      return { ...state, error: false, loading: true };
    case FETCH_WORDS:
      return { ...state, error, loading: false, words: payload };
    case ADD_NEW_WORD:
      const newWords = [...state.words];
      newWords.push(payload);
      return { ...state, words: newWords };
    default:
      return state;
  }
};

export function getWords() {
  return async (dispatch) => {
    dispatch(fetchLoading());
    const data = await import("../../assets/data/words.json").then(
      ({ default: myData }) => myData
    );
    let error = false;
    const fromDB = await getWordsFromDb().catch(() => {
      error = true;
      return [];
    });
    const output = _.sortBy(data.concat(fromDB), [
      function (item) {
        return item.word;
      },
    ]);
    dispatch(fetchWords(output, error));
  };
}

export default reducer;
