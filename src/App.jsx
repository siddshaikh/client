import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MoviePage from "./pages/MoviePage";
import React, { useEffect } from "react";
import NavBar from "./components/NavBar";
import WishList from "./pages/WishList";

function App() {
  const [isAuthenticate, setIsAuthenticate] = React.useState(false);

  useEffect(() => {
    const token = localStorage.getItem("movieUser");
    if (token) {
      setIsAuthenticate(true);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticate) {
      window.location.href = "/login";
    }
  }, [isAuthenticate]);

  return (
    <Router>
      {isAuthenticate && <NavBar />}
      <Routes>
        {isAuthenticate ? (
          <>
            <Route path="/" element={<MoviePage />} />
            <Route path="/wishList" element={<WishList />} />
          </>
        ) : (
          <Route
            path="/login"
            element={<LoginPage setIsAuthenticate={setIsAuthenticate} />}
          />
        )}
      </Routes>
    </Router>
  );
}

export default App;
