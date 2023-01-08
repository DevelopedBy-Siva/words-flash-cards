import axios from "../../api";
import { apiError, fetchWords } from "../actions/Words_Actions";
import { FETCH_WORDS, API_ERROR } from "../actions/Words_ActionTypes";

const initialState = {
  loading: true,
  error: [],
  words: [],
};

const WordsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_WORDS:
      if (payload && payload.length === 0)
        return {
          ...state,
          loading: false,
        };
      return {
        ...state,
        loading: false,
        words: state.words.push(payload[0]),
      };
    case API_ERROR:
      return {
        ...state,
        error: state.error.push(payload),
      };
    default:
      return { ...state };
  }
};

export const getWords = (word) => {
  return (dispatch) => {
    axios
      .get(word)
      .then(({ data }) => {
        console.log(data);
        dispatch(fetchWords(data));
      })
      .catch((err) => {
        dispatch(apiError(word, err));
      });
  };
};

export default WordsReducer;
