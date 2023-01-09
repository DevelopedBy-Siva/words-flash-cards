import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import Questions from "../reducer/Questions";

export default configureStore({
  reducer: {
    questions: Questions,
  },
  middleware: [thunk],
});
