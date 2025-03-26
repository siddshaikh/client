import React, { useCallback, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Card,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { debounce } from "lodash";
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import ShopIcon from "@mui/icons-material/Shop";
import { Add } from "@mui/icons-material";
import EditModal from "./EditModal";
import axiosInstance from "../axiosInstance";
import { useDispatch } from "react-redux";
import { setLoading, setMovies } from "../store/features/movies/movieSlice";

const NavBar = () => {
  const [openAdd, setOpenAdd] = React.useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("movieUser");
    window.location.reload();
  };

  const params = {
    name: "",
    limit,
    page: currentPage,
  };

  const fetchMovies = async (searchTerm) => {
    try {
      dispatch(setLoading(true));

      const response = await axiosInstance.get("/moviesByName", {
        params: { name: searchTerm, ...params },
      });
      if (response.data.length) {
        dispatch(setMovies(response.data.movies));
        setTotalPages(Math.ceil(response.data.totalMovies / limit));
      }
    } catch (error) {
      console.log(error);
      dispatch(setMovies([]));
    } finally {
      dispatch(setLoading(false));
    }
  };
  const debouncedSearch = useCallback(
    debounce((query) => {
      fetchMovies(query);
    }, 500),
    []
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };
  return (
    <Card
      sx={{
        px: 2,
        py: 1,
        display: "flex",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* logo */}
      <Link to={"/"}>
        <Typography
          variant={"h1"}
          sx={{
            fontWeight: "bold",
            fontSize: "2rem",
            letterSpacing: "0.1rem",
          }}
        >
          MovieMania
        </Typography>
      </Link>
      <Box>
        <TextField
          size="small"
          placeholder="Search movies..."
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Link to={"/wishList"}>
          <Badge badgeContent={4} color="primary">
            <IconButton size="small" color="primary">
              <ShopIcon />
            </IconButton>
          </Badge>
        </Link>
        <Button
          sx={{ ml: 3 }}
          size="small"
          variant="outlined"
          startIcon={<Add />}
          onClick={() => setOpenAdd(true)}
        >
          Add Movie
        </Button>
        <Button
          startIcon={<PersonIcon />}
          size="small"
          variant="outlined"
          onClick={handleLogout}
          sx={{ ml: 3 }}
        >
          Logout
        </Button>
      </Box>
      <EditModal
        open={openAdd}
        handleClose={() => setOpenAdd(false)}
        movie={{}}
        mode="add"
      />
    </Card>
  );
};

export default NavBar;
