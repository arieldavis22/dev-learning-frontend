import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  background: string;
  logo: string;
  menu: boolean;
}

const initialState: AppState = {
  background: 'rgb(240, 240, 240);',
  logo: 'logo-light.png',
  menu: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setBackDark: (state, action: PayloadAction<string>) => {
      state.background = action.payload;
    },
    setBackLight: (state, action: PayloadAction<string>) => {
      state.background = action.payload;
    },
    setLogoDark: (state, action: PayloadAction<string>) => {
      state.logo = action.payload;
    },
    setLogoLight: (state, action: PayloadAction<string>) => {
      state.logo = action.payload;
    },
    setMenuDark: (state) => {
      state.menu = true;
    },
    setMenuLight: (state) => {
      state.menu = false;
    },
  },
});

export const {
  setBackDark,
  setBackLight,
  setLogoDark,
  setLogoLight,
  setMenuDark,
  setMenuLight,
} = appSlice.actions;

export default appSlice.reducer;
