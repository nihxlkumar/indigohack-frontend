import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsAdmin(false);
    const isUser = localStorage.getItem("user");
    setUser(isUser ? JSON.parse(isUser) : null);
    if (isUser && JSON.parse(isUser).email === "admin@indigowithme.com") {
      setIsAdmin(true);
    }
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <NavLink to="/" style={{ color: "#fff", textDecoration: "none" }}>
            MyApp
          </NavLink>
        </Typography>
        {user ? (
          <>
            {isAdmin && !location.pathname.includes("update-flight") ? (
              <Button color="inherit" component={Link} to="/add-flight">
                Add Flights
              </Button>
            ) : (
              ""
            )}
            <Button color="inherit" onClick={() => logout()}>
              Logout
            </Button>
          </>
        ) : ["/login", "/signup"].includes(location.pathname) ? (
          ""
        ) : (
          <Button color="inherit">
            <Link to="/login" style={{ color: "#fff", textDecoration: "none" }}>
              Login
            </Link>
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
