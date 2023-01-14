import {
  ADD_NEW_WORD,
  FETCH_LOADING,
  FETCH_WORDS,
  SORT_A_Z,
  SORT_DATE_ASC,
  SORT_DATE_DESC,
  SORT_Z_A,
  FILTER_ALL,
  FILTER_LOCAL,
} from "./Words_ActionTypes";

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

export function sort_A_Z() {
  return {
    type: SORT_A_Z,
  };
}

export function sort_Z_A() {
  return {
    type: SORT_Z_A,
  };
}

export function sortDate_asc() {
  return {
    type: SORT_DATE_ASC,
  };
}

export function sortDate_desc() {
  return {
    type: SORT_DATE_DESC,
  };
}

export function filterAll() {
  return {
    type: FILTER_ALL,
  };
}

export function filterLocal() {
  return {
    type: FILTER_LOCAL,
  };
}
