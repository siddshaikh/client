import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./features/wishList/wishListSlice";

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
  },
});
