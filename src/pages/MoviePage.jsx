import { Box, CircularProgress, Grid, Pagination } from "@mui/material";
import MovieCard from "../components/MovieCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { setLoading, setMovies } from "../store/features/movies/movieSlice";

const MoviePage = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const loading = useSelector((state) => state.movies.loading);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const params = {
    name: "",
    limit,
    page: currentPage,
  };

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        dispatch(setLoading(true));
        const response = await axiosInstance.get("/moviesByName", { params });
        dispatch(setMovies(response.data.movies));
        setTotalPages(Math.ceil(response.data.totalMovies / limit));
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchAllMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        pt: 4,
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid item>{loading && <CircularProgress />}</Grid>
        {movies.map((movie) => (
          <Grid item key={movie._id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        sx={{ my: 2 }}
      />
    </Box>
  );
};

export default MoviePage;
