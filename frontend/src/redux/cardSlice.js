import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
  name: "card",
  initialState: {
    products: [],
  },
  reducers: {
    setProduct: (state, action) => {
      state.products = [...state.products, action.payload]; 
    },
  },
});

export const { setProduct } = cardSlice.actions;

export default cardSlice.reducer;
