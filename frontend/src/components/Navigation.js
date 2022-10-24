import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import SignOutButton from "./SignOutButton";
import useAuth from "../hooks/useAuth";
import { Drawer, MenuItem, ListItemIcon } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LogoutIcon from "@mui/icons-material/Logout";

function Navigation() {
  //this signout button will only appear if you are logged in
  var loginButton = <></>;
  var home = <></>;
  var about = <></>;
  var signin = <></>;
  var signout = <></>;
  var myRecipes = <></>;
  var cheffie = <></>;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const location = useLocation();
  const { auth } = useAuth();
  if (auth?.user) {
    console.log("location: " + location.pathname);
    if (
      !location.pathname.includes("/editRecipe") &&
      !location.pathname.includes("/addRecipe")
    ) {
      loginButton = <SignOutButton />;
    }

    myRecipes = (
      <NavLink className="nav-link" to="/myRecipes">
        My Recipes
      </NavLink>
    );

    cheffie = (
      <NavLink className="nav-link" to="/myRecipes">
        Cheffie
      </NavLink>
    );
  } else {
    loginButton = <></>;
    cheffie = (
      <NavLink className="nav-link" to="/landingPage">
        Cheffie
      </NavLink>
    );
    home = (
      <NavLink className="nav-link " to="/landingPage">
        Home<span className="sr-only">(current)</span>
      </NavLink>
    );
    signin = (
      <NavLink className="nav-link" to="/signin">
        Sign in
      </NavLink>
    );
    signout = (
      <NavLink className="nav-link" to="/signup">
        Sign up
      </NavLink>
    );
  }

  return (
    <div
      className={`row justify-content-center ${
        auth?.user && "light-blue-background"
      }`}
    >
      <nav class="navbar navbar-expand-lg navbar-light col-sm-12 col-md-10 col-xl-8">
        <h1>{cheffie}</h1>
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={handleClick}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {Boolean(auth?.user) === false ? (
          <Drawer anchor="right" open={open} onClose={handleClose}>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              {home}
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              {signin}
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <AppRegistrationIcon />
              </ListItemIcon>
              {signout}
            </MenuItem>
          </Drawer>
        ) : (
          <Drawer anchor="right" open={open} onClose={handleClose}>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              {myRecipes}
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
               
              </ListItemIcon>
              {loginButton}
            </MenuItem>
          </Drawer>
        )}

        <div className="navbar-collapse collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item navBarLinks">{home}</li>
            <li className="nav-item navBarLinks"> {myRecipes}</li>
            <li className="nav-item navBarLinks">{signin}</li>
            <li className="nav-item navBarLinks">{signout}</li>
            <li className="nav-item navBarLinks">{loginButton}</li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
