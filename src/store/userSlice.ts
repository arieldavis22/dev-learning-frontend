import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  currentUser: null | { id: string; first_name: string; last_name: string };
}

const initialState: UserState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        id: string;
        first_name: string;
        last_name: string;
      }>,
    ) => {
      state.currentUser = action.payload;
    },
    unsetUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { setUser, unsetUser } = userSlice.actions;

export default userSlice.reducer;
