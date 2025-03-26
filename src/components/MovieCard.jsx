import React, { useState } from "react";
import { Card, CardContent, IconButton, Typography, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { styled } from "@mui/system";
import EditModal from "./EditModal";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../store/features/wishList/wishListSlice";

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const isInWishlist = wishlistItems.some((item) => item._id === movie._id);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(movie));
    } else {
      dispatch(addToWishlist(movie));
    }
  };

  return (
    <StyledCard onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <img src={movie.url} alt={movie.name} className="movie-img" />
      <Box className="overlay" sx={{ opacity: isHovered ? 1 : 0 }}>
        <CardContent>
          <Typography variant="h5">{movie.name}</Typography>
          <Typography>Rating: {movie.rating}</Typography>
          <Typography>
            Release Date: {new Date(movie.release_date).toDateString()}
          </Typography>
          <Typography>Duration: {movie.duration} mins</Typography>
        </CardContent>
        <Box className="icons">
          <IconButton
            aria-label="add to wishlist"
            sx={{ color: "white" }}
            onClick={handleWishlistToggle}
          >
            {isInWishlist ? <RemoveIcon /> : <FavoriteIcon />}
          </IconButton>
          <IconButton
            aria-label="add movie"
            sx={{ color: "white" }}
            onClick={() => setIsEditClicked(true)}
          >
            <AddIcon />
          </IconButton>
          <IconButton aria-label="delete movie" sx={{ color: "white" }}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      <EditModal
        movie={movie}
        open={isEditClicked}
        handleClose={() => setIsEditClicked(false)}
        mode="edit"
      />
    </StyledCard>
  );
};

const StyledCard = styled(Card)(({ theme }) => ({
  position: "relative",
  width: 300,
  height: 450,
  overflow: "hidden",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
  ".movie-img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  ".overlay": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: theme.spacing(2),
    transition: "opacity 0.3s ease-in-out",
  },
  ".icons": {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(1),
  },
  ".icons .MuiIconButton-root": {
    color: "#fff",
  },
}));

export default MovieCard;
