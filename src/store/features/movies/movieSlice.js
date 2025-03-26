import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  loading: false,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setMovies, setLoading } = movieSlice.actions;

export default movieSlice.reducer;
