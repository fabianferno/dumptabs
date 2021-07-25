import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import phaseReducer from "./features/phaseSlice";

export default configureStore({
  reducer: { user: userReducer, phases: phaseReducer },
});
