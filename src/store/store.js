import { configureStore } from "@reduxjs/toolkit";
import snackbarReducer from "./slices/snackbarSlice";
import productReducer from "./slices/productSlice";

export const reduxStore = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    product: productReducer,
  },
});
export default reduxStore;
