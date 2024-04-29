import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import storySlice from "./slice/storySlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    story: storySlice,
  },
});
export default store;
