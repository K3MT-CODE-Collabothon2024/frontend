import { configureStore } from "@reduxjs/toolkit";
import tutorialReducer from "../slice/tutorialSlice";

const store = configureStore({
  reducer: {
    tutorial: tutorialReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
