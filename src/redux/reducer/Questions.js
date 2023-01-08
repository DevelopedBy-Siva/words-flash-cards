import words from "../../assets/data/words.json";
import { questionObject, randomUnique } from "../../utils/QuizGenerator";
import {
  GENERATE_NEXT_QN,
  GENERATE_RANDOM_QN_INDEXES,
  SET_CHOICE,
} from "../actions/Questions_ActionTypes";

const question = {
  indexes: [],
  question: [],
};

const reducer = (state = question, action) => {
  switch (action.type) {
    case GENERATE_RANDOM_QN_INDEXES:
      const { indexes, question } = generateRandomQnIndexes(action.payload);
      return {
        ...state,
        indexes,
        question: [{ ...question }],
      };
    case GENERATE_NEXT_QN:
      const new_questions = { ...state };
      if (new_questions.indexes.length === 0) {
        alert("DONE");
        return { ...state };
      }

      const qnObj_2 = questionObject(new_questions.indexes[0]);

      new_questions.question.push(qnObj_2);
      new_questions.indexes.shift();

      return {
        ...state,
        question: new_questions.question,
        indexes: new_questions.indexes,
      };
    case SET_CHOICE:
      const index = action.payload;
      const updated_qn = { ...state };
      updated_qn.question[index].myChoice = index;
      return {
        ...updated_qn,
      };
    default:
      return { ...state };
  }
};

function generateRandomQnIndexes({ value, latestWords }) {
  const total_words = words.length;
  if (total_words < 4) return (window.location = "/");

  let range = [0, total_words];
  if (latestWords) range = [total_words - value, total_words];

  if (range[1] - range[0] < value) return (window.location = "/quiz");

  const indexes = randomUnique(value, ...range);
  const question = questionObject(indexes[0]);

  indexes.shift();

  return {
    indexes,
    question,
  };
}

export default reducer;
