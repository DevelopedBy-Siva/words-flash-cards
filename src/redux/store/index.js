import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import Words from "../reducer/Words";

export default configureStore({
  reducer: {
    words: Words,
  },
  middleware: [thunk],
});
