import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../api/authAPI";
import { getLocalToken, removeLocalToken, saveLocalToken } from "../../utils";

const initialState = {
  token: null,
  isLoggedIn: null,
  isLogInError: null,
  isRegistrationError: null,
  user: null,
  isLoading: true,
  itemCountInCart: getCarts(),
};

function getCarts() {
  let carts = JSON.parse(localStorage.getItem("cart"));
  let arr = carts?.map((obj) => obj.id);
  return arr ?? [];
}

export const checkLoggedIn = createAsyncThunk(
  "auth/checkLoggedIn",
  async (_, { getState, dispatch }) => {
    const state = getState();
    const isLoggedIn = state.auth.isLoggedIn;
    if (!isLoggedIn) {
      let token = state.auth.token;
      if (!token) {
        const localToken = getLocalToken();
        if (localToken) {
          dispatch(userTokenChange(localToken));
          token = localToken;
        }
        if (token) {
          try {
            const userDataResponse = await authAPI.getUserData(token);
            const userData = await userDataResponse.data;
            dispatch(userDataChange(userData));
            dispatch(userIsLoggedChange(true));
          } catch (error) {
            removeLocalToken();
            dispatch(userTokenChange(null));
            dispatch(userIsLoggedChange(null));
          }
        }
      }
    }
  }
);

export const removeLoggedIn = createAsyncThunk(
  "auth/removeLoggedIn",
  async (_, { getState, dispatch }) => {
    removeLocalToken();
    dispatch(userTokenChange(null));
    dispatch(userIsLoggedChange(null));
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { dispatch }) => {
    try {
      const response = await authAPI.logInGetToken(email, password);
      const data = await response.data;
      const token = data.token.result;
      if (token) {
        saveLocalToken(token);
        dispatch(userTokenChange(token));
        dispatch(userIsLoggedChange(true));
        const userDataResponse = await authAPI.getUserData(token);
        const userData = await userDataResponse.data;
        dispatch(userDataChange(userData));
      }
      return;
    } catch (error) {
      dispatch(userIsErrorChange(true));
      console.error(error);
      if(error?.response?.data?.status === 401){
        alert("Неверный логин или пароль!");
      }
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
    isLoadingChange(state, action) {
      state.isLoading = action.payload;
    },
    countProductsInCartChange(state, action) {
      if (action.payload === 0) {
        state.itemCountInCart = [];
        return;
      }
      if (!state.itemCountInCart.some((id) => id === action.payload)) {
        state.itemCountInCart.push(action.payload);
      } else {
        state.itemCountInCart = state.itemCountInCart.filter(
          (id) => id !== action.payload
        );
      }
    },
  },
});

export const {
  userTokenChange,
  userIsLoggedChange,
  userDataChange,
  userIsRegistrationErrorChange,
  userIsErrorChange,
  isLoadingChange,
  countProductsInCartChange,
} = authSlice.actions;

export const isLoggedIn = (state) => state.auth.isLoggedIn;
export const token = (state) => state.auth.token;
export const isAuthLoading = (state) => state.auth.isLoading;
export const authUser = (state) => state.auth.user;
export const itemCountInCart = (state) => state.auth.itemCountInCart;

export default authSlice.reducer;
