import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { Box, CircularProgress, Grid, Pagination } from "@mui/material";
import MovieCard from "../components/MovieCard";

const MoviePage = () => {
  const [loading, setLoading] = useState(true);
  const [movieData, setMovieData] = useState([]);
  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/allMovies");
        setMovieData(response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllMovies();
  }, []);

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
        {movieData.map((movie) => (
          <Grid item key={movie._id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={10}
        variant="outlined"
        shape="rounded"
        sx={{ my: 2 }}
      />
    </Box>
  );
};

export default MoviePage;
