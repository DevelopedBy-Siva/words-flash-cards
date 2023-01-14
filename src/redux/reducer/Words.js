import _ from "lodash";

import { getWordsFromDb } from "../../db";
import {
  ADD_NEW_WORD,
  FETCH_LOADING,
  FETCH_WORDS,
  FILTER_ALL,
  FILTER_LOCAL,
  SORT_A_Z,
  SORT_DATE_ASC,
  SORT_DATE_DESC,
  SORT_Z_A,
} from "../actions/Words_ActionTypes";
import { fetchLoading, fetchWords, sort_A_Z } from "../actions/Words_Actions";

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
      const newWords = [...state.words, payload];
      return { ...state, words: newWords };
    case SORT_A_Z:
      const sortAZ = sortByAsc(state.words);
      return { ...state, words: sortAZ };
    case SORT_Z_A:
      const sortZA = sortByDesc(state.words);
      return { ...state, words: sortZA };
    case SORT_DATE_ASC:
      const sortDateAsc = sortByDateAsc(state.words);
      return { ...state, words: sortDateAsc };
    case SORT_DATE_DESC:
      const sortDateDesc = sortByDateDesc(state.words);
      return { ...state, words: sortDateDesc };
    case FILTER_ALL:
      return { ...state };
    case FILTER_LOCAL:
      const local = state.words.filter((wd) => wd.indexedDB === true);
      return { ...state, words: local };
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
    const combine = data.concat(fromDB);
    dispatch(fetchWords(combine, error));
    dispatch(sort_A_Z());
  };
}

function sortByAsc(data) {
  const words = [...data].sort((a, b) => {
    const first = a.name.toLowerCase();
    const second = b.name.toLowerCase();
    return first > second ? 1 : -1;
  });
  return words;
}

function sortByDesc(data) {
  const words = [...data].sort((a, b) => {
    const first = a.name.toLowerCase();
    const second = b.name.toLowerCase();
    return first > second ? -1 : 1;
  });
  return words;
}

function sortByDateAsc(data) {
  const words = [...data].sort((a, b) => {
    const first = a.createdBy ? a.createdBy : 0;
    const last = b.createdBy ? b.createdBy : 0;
    return first - last;
  });
  return words;
}

function sortByDateDesc(data) {
  const words = [...data].sort((a, b) => {
    const first = a.createdBy ? a.createdBy : 0;
    const last = b.createdBy ? b.createdBy : 0;
    return last - first;
  });
  return words;
}

export default reducer;
