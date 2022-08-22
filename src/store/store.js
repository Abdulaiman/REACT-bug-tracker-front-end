import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./redux-slices/user-slice";
import logger from "redux-logger";

export default configureStore({
  reducer: {
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
