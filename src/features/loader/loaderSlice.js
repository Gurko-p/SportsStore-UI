import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    isLoading: false,
  },
  reducers: {
    showProgressLoader: (state) => {
      state.isLoading = true;
    },
    hideProgressLoader: (state) => {
      state.isLoading = false;
    },
  },
});

export const showLoader = createAsyncThunk(
  "loader/showLoader",
  async (_, { dispatch }) => {
    dispatch(showProgressLoader());
  }
);

export const hideLoader = createAsyncThunk(
    "loader/hideLoader",
    async (_, { dispatch }) => {
      dispatch(hideProgressLoader());
    }
  );

export const { showProgressLoader, hideProgressLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
