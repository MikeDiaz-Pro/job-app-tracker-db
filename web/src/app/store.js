import { configureStore } from "@reduxjs/toolkit";
import applicationsReducer from "../features/applications/store/applicationsSlice";
import uiReducer from "./ui/uiSlice"

export const store = configureStore({
  reducer: {
    applications: applicationsReducer,
    ui: uiReducer 
  },
});