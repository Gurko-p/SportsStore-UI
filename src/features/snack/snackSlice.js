import { createSlice } from "@reduxjs/toolkit";

const snackBarSlice = createSlice({
  name: "snackBar",
  initialState: {
    open: false,
    message: "",
    severity: "success",
  },
  reducers: {
    showSnackBar: (state, action) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    hideSnackBar: (state) => {
      state.open = false;
    },
  },
});

export const { showSnackBar, hideSnackBar } = snackBarSlice.actions;
export default snackBarSlice.reducer;
