import { configureStore } from "@reduxjs/toolkit";

import Questions from "../reducer/Questions";

export default configureStore({
  reducer: {
    questions: Questions,
  },
});
