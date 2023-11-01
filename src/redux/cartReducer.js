import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);

      item
        ? (item.quantity += action.payload.quantity)
        : state.products.push(action.payload);
    },
    removeItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
    },
    resetCart: (state) => {
      state.products = [];
    },
    // clearError: (state) => {
    //   state.error = null;
    // },
  },
});

export const {
  addToCart,
  removeItem,
  resetCart,
  // clearError
} = cartSlice.actions;

export default cartSlice.reducer;
