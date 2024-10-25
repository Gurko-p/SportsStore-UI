import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemCountInCart: getCarts(),
  },
  reducers: {
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

function getCarts() {
  let carts = JSON.parse(localStorage.getItem("cart"));
  let arr = carts?.map(obj => obj.id);
  return arr ?? [];
}

export const { countProductsInCartChange } = cartSlice.actions;
export const itemCountInCart = (state) => state.cart.itemCountInCart;

export default cartSlice.reducer;