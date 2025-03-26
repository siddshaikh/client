import React, { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";

const EditModal = ({ open, handleClose, movie, mode }) => {
  const [editedMovie, setEditedMovie] = useState({
    name: movie.name || "",
    rating: movie.rating || "",
    release_date: movie.release_date || "",
    duration: movie.duration || "",
    url: movie.url || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedMovie((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-movie-modal"
      aria-describedby="edit-movie-form"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="edit-movie-modal" variant="h6" component="h2">
          {mode === "edit" ? "Edit" : "Add"} Movie
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={editedMovie.name}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Rating"
            name="rating"
            value={editedMovie.rating}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Release Date"
            name="release_date"
            value={editedMovie.release_date}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Duration"
            name="duration"
            value={editedMovie.duration}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="URL"
            name="url"
            value={editedMovie.url}
            InputProps={{
              readOnly: !mode === "edit",
            }}
            margin="normal"
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }} fullWidth>
            Save
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditModal;
