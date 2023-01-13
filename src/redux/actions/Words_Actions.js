import { ADD_NEW_WORD, FETCH_LOADING, FETCH_WORDS } from "./Words_ActionTypes";

export function fetchWords(payload, error) {
  return {
    type: FETCH_WORDS,
    payload,
    error,
  };
}

export function fetchLoading() {
  return {
    type: FETCH_LOADING,
  };
}

export function addWord(payload) {
  return {
    type: ADD_NEW_WORD,
    payload,
  };
}
