import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./redux-slices/user-slice";
import projectSlice from "./redux-slices/project-slice";
import logger from "redux-logger";

export default configureStore({
  reducer: {
    user: userSlice,
    project: projectSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
