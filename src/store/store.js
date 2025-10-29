import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/themeSlice/themeSlice";
import authReducer from "../features/authSlice/authSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
  },
});
