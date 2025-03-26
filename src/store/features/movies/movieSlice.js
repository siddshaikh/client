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
    deleteSingleMovie: (state, action) => {
      state.movies = state.movies.filter(
        (movie) => movie._id !== action.payload
      );
    },
  },
});

export const { setMovies, setLoading, deleteSingleMovie } = movieSlice.actions;

export default movieSlice.reducer;
