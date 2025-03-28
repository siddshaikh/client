import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
          <>
            {/* Default route redirects to login when not authenticated */}
            <Route path="/" element={<Navigate to="/login" />} />
            <Route
              path="/login"
              element={<LoginPage setIsAuthenticate={setIsAuthenticate} />}
            />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
