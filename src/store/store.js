import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/themeSlice/themeSlice";
import authReducer from "../features/authSlice/authSlice";
import loadingReducer from "../features/loadingSlice/loadingSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    loading: loadingReducer,
  },
});
