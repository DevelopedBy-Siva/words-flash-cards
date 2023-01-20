import {
  GENERATE_NEXT_QN,
  GENERATE_RANDOM_QN_INDEXES,
  SET_CHOICE,
} from "./Questions_ActionTypes";

export function generateInitialQuestion(payload) {
  return {
    type: GENERATE_RANDOM_QN_INDEXES,
    payload,
  };
}

export function generateNextQuestion() {
  return {
    type: GENERATE_NEXT_QN,
  };
}

export function setChoice(index) {
  return {
    type: SET_CHOICE,
    payload: index,
  };
}
