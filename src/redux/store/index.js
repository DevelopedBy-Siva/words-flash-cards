import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import Questions from "../reducer/Questions";
import WordsReducer from "../reducer/Words";

export default configureStore({
  reducer: {
    questions: Questions,
    words: WordsReducer,
  },
  middleware: [thunk],
});
