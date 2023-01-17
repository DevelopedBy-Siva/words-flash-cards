import {
  ADD_NEW_WORD,
  UPDATE_WORD,
  FETCH_WORDS,
  LOAD_NEW_WORDS,
} from "./Words_ActionTypes";

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

export function updateWord(payload) {
  return {
    type: UPDATE_WORD,
    payload,
  };
}

export function loadNewWords(payload) {
  return {
    type: LOAD_NEW_WORDS,
    payload,
  };
}
