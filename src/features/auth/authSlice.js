import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../api/authAPI";
import { getLocalToken, removeLocalToken, saveLocalToken } from "../../utils";

const initialState = {
  token: null,
  isLoggedIn: false,
  isLogInError: false,
  isRegistrationError: false,
  user: null,
};

const handleUserData = async (dispatch) => {
  try {
    const { data: userData } = await authAPI.getUserData();
    dispatch(userDataChange(userData));
    dispatch(userIsLoggedChange(true));
  } catch (error) {
    handleLogout(dispatch);
  }
};

const handleLogout = (dispatch) => {
  removeLocalToken();
  dispatch(userTokenChange(null));
  dispatch(userIsLoggedChange(false));
};

export const checkLoggedIn = createAsyncThunk(
  "auth/checkLoggedIn",
  async (_, { getState, dispatch }) => {
    const { token, isLoggedIn } = getState().auth;

    if (!isLoggedIn) {
      const localToken = token || getLocalToken();
      if (localToken) {
        dispatch(userTokenChange(localToken));
        await handleUserData(dispatch);
      }
    }
  }
);

export const removeLoggedIn = createAsyncThunk(
  "auth/removeLoggedIn",
  async (_, { dispatch }) => {
    handleLogout(dispatch);
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { dispatch }) => {
    try {
      const { data } = await authAPI.logInGetToken(email, password);
      const token = data.token.result;

      if (token) {
        saveLocalToken(token);
        dispatch(userTokenChange(token));
        await handleUserData(dispatch);
        dispatch(userIsErrorChange(false));
      }
    } catch (error) {
      dispatch(userIsErrorChange(true));
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userTokenChange(state, action) {
      state.token = action.payload;
    },
    userIsLoggedChange(state, action) {
      state.isLoggedIn = action.payload;
    },
    userIsErrorChange(state, action) {
      state.isLogInError = action.payload;
    },
    userIsRegistrationErrorChange(state, action) {
      state.isRegistrationError = action.payload;
    },
    userDataChange(state, action) {
      state.user = action.payload;
    },
  },
});

export const {
  userTokenChange,
  userIsLoggedChange,
  userDataChange,
  userIsRegistrationErrorChange,
  userIsErrorChange,
} = authSlice.actions;

export const isLoggedIn = (state) => state.auth.isLoggedIn;
export const authUser = (state) => state.auth.user;

export default authSlice.reducer;
