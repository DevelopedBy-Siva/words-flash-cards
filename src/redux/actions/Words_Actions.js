import { API_ERROR, FETCH_WORDS } from "./Words_ActionTypes";

export function fetchWords(data) {
  return {
    type: FETCH_WORDS,
    payload: data,
  };
}

export function apiError(word, err) {
  return {
    type: API_ERROR,
    payload: {
      word,
      err,
    },
  };
}
