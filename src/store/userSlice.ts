import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  currentUser: string;
}

const initialState: UserState = {
  currentUser: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.currentUser = action.payload;
    },
    unsetUser: (state) => {
      state.currentUser = "";
    },
  },
});

export const { setUser, unsetUser } = userSlice.actions;

export default userSlice.reducer;
