import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: getSelectedTheme(),
};

function getSelectedTheme(){
  let selectedTheme = localStorage.getItem("theme");
  return selectedTheme ?? 'light';
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export const selectTheme = (state) => state.theme.mode;
export default themeSlice.reducer;
