import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    reducers: {
      login: (state, action) => {
        state.user = action.payload;
      },
      logout: (state) => {
        state.user = null;
      },
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

// Export the selector
export const selectUser = (state) => state.user.user;

// Export the reducer
export default userSlice.reducer;
