import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    open: false,
    message: "",
    severity: "success",
  },
  reducers: {
    showAlertMessage: (state, action) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    hideAlertMessage: (state) => {
      state.open = false;
    },
  },
});

export const severityType = {
  success: "success",
  error: "error",
  warning: "warning",
  info: "info",
};

export const showMessage = createAsyncThunk(
  "alert/showMessage",
  async ({ message, severity, duration = 5000 }, { dispatch }) => {
    console.log("метод showMessage")
    dispatch(showAlertMessage({ message: message, severity: severity }));
    let timerId;
    timerId = setTimeout(() => {
      dispatch(hideAlertMessage());
      clearTimeout(timerId);
    }, duration);
  }
);

export const { showAlertMessage, hideAlertMessage } = alertSlice.actions;
export default alertSlice.reducer;
