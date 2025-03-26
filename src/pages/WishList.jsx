import React from "react";
import { Box, Typography, Grid, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../store/features/wishList/wishListSlice";
import MovieCard from "../components/MovieCard";
import DeleteIcon from "@mui/icons-material/Delete";

const WishList = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = (movie) => {
    dispatch(removeFromWishlist(movie));
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
      <Typography variant="h4" gutterBottom>
        Your Wishlist
      </Typography>
      {wishlistItems.length === 0 ? (
        <Typography variant="body1">Your wishlist is empty.</Typography>
      ) : (
        <Grid container spacing={2} justifyContent="center">
          {wishlistItems.map((movie) => (
            <Grid item key={movie._id}>
              <Box position="relative">
                <MovieCard movie={movie} />
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    color: "white",
                  }}
                  onClick={() => handleRemoveFromWishlist(movie)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default WishList;
