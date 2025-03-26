import React from "react";
import {
  Badge,
  Box,
  Button,
  Card,
  IconButton,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import ShopIcon from "@mui/icons-material/Shop";
import { Add } from "@mui/icons-material";
import EditModal from "./EditModal";

const NavBar = () => {
  const [openAdd, setOpenAdd] = React.useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("movieUser");
    window.location.reload();
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
