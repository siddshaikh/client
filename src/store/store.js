import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./features/wishList/wishListSlice";
import moviesReducer from "./features/movies/movieSlice";

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    movies: moviesReducer,
  },
});
