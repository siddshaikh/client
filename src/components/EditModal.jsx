import React, { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import axiosInstance from "../axiosInstance";

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const requestData = {
        name: editedMovie.name,
        rating: editedMovie.rating,
        release_date: editedMovie.release_date,
        duration: editedMovie.duration,
        url: editedMovie.url,
      };
      const response = await axiosInstance.put(
        `/updateMovie/${movie._id}`,
        requestData
      );
      console.log(response.data.status);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const requestData = {
        name: editedMovie.name,
        rating: editedMovie.rating,
        release_date: editedMovie.release_date,
        duration: editedMovie.duration,
        url: editedMovie.url,
      };
      const response = await axiosInstance.post("/insertMovie", requestData);
      console.log(response.data);
      handleClose();
    } catch (error) {
      console.log(error);
    }
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
        <form onSubmit={mode === "edit" ? handleUpdate : handleAdd}>
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
            type="date"
            label="Release Date"
            name="release_date"
            InputLabelProps={{ shrink: true }}
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
            onChange={handleChange}
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
