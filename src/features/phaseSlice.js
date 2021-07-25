import { createSlice } from "@reduxjs/toolkit";
import runAtDb from "./harper-db";
import firebase from "firebase/app";

export const phasesSlice = createSlice({
  name: "phases",
  initialState: {
    phases: null,
    reducers: {
      refresh: (state) => {
        state.phases = runAtDb({
          operation: "search_by_value",
          schema: "dumptabs",
          table: "dumps",
          search_attribute: "uid",
          search_value: firebase.auth().currentUser.uid,
          get_attributes: ["perhaps", "wants", "musts"],
        });
      },
    },
  },
});

// Action creators are generated for each case reducer function
export const { refresh } = phasesSlice.actions;

// Export the selector
export const selectPhases = (state) => state.phases.phases;

// Export Reducers
export default phasesSlice.reducer;
