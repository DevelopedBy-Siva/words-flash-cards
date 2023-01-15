import { ADD_NEW_WORD, FETCH_WORDS } from "./Words_ActionTypes";

export function fetchWords(payload) {
  return {
    type: FETCH_WORDS,
    payload,
  };
}

export function addWord(payload) {
  return {
    type: ADD_NEW_WORD,
    payload,
  };
}
