import { getWordsFromDb } from "../../db";
import {
  ADD_NEW_WORD,
  DELETE_WORD,
  FETCH_WORDS,
  LOAD_NEW_WORDS,
  TRIGGER_LOADING,
  UPDATE_WORD,
} from "../actions/Words_ActionTypes";
import { fetchWords, triggerLoading } from "../actions/Words_Actions";

const initialState = {
  loading: true,
  words: [],
};

const reducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case TRIGGER_LOADING:
      return {
        ...state,
        loading: payload,
      };
    case FETCH_WORDS:
      return { ...state, words: payload, loading: false };
    case ADD_NEW_WORD:
      const newWords = [...state.words, payload];
      return { ...state, words: newWords };
    case UPDATE_WORD:
      const updateWords = [...state.words].map((wd) => {
        if (wd.name === payload.name) {
          wd.meaning = payload.meaning;
          wd.example = payload.example;
          wd.createdAt = Date.now();
        }
        return wd;
      });
      return { ...state, words: updateWords };
    case LOAD_NEW_WORDS:
      if (!payload || payload.length === 0) return { ...state };

      const newLoad = [...state.words];
      [...payload].forEach((item) => {
        const index = state.words.findIndex(
          (wd) => wd.name.toLowerCase() === item.name.toLowerCase()
        );
        if (index === -1) newLoad.push(item);
      });
      return {
        ...state,
        words: newLoad,
      };
    case DELETE_WORD:
      const afterDelete = state.words.filter(
        (wd) => wd.name.toLowerCase() !== payload.toLowerCase()
      );
      return { ...state, words: [...afterDelete] };
    default:
      return state;
  }
};
export default reducer;

function getAllWords() {
  return async (dispatch) => {
    dispatch(triggerLoading(true));
    const data = await import("../../assets/data/words.json").then(
      ({ default: myData }) => myData
    );
    const fromDB = await getWordsFromDb().catch(() => []);
    let toDisplay = [...data];
    // If duplicate words, then prioritize Local DB over words.json file
    fromDB.forEach((item) => {
      toDisplay = toDisplay.filter(
        (ele) =>
          (ele.name && ele.name.trim().toLowerCase()) !==
          (item.name && item.name.trim().toLowerCase())
      );
    });
    const combine = toDisplay.concat(fromDB);
    dispatch(fetchWords(combine));
  };
}

export function initialiseWords(dispatch) {
  dispatch(getAllWords());
}
