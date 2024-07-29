import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    Category: null,
    minPrice: 0,
    maxPrice: 0,
  },
  reducers: {
    setFilter: (state, action) => {
      state.Category = action.payload.Category; //action.payload (.)object ho vanera bujhauxa
      state.minPrice = action.payload.minaprice;
      state.maxPrice = action.payload.maxPrice;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFilter } = productSlice.actions;

export default productSlice.reducer;
