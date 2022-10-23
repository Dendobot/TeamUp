import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import SignOutButton from "./SignOutButton";
import useAuth from "../hooks/useAuth";
import { Divider, Menu, MenuItem } from "@mui/material";

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

  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      setAnchorEl(null);
    } else if (event.key === "Escape") {
      anchorEl.focus();
      setAnchorEl(null);
    }
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
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>{home}</MenuItem>
            <MenuItem onClick={handleClose}>{signin}</MenuItem>
            <MenuItem onClick={handleClose}>{signout}</MenuItem>
          </Menu>
        ) : (
          <Menu
            id="menu-appbar"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>{myRecipes}</MenuItem>
            <MenuItem onClick={handleClose}>{loginButton}</MenuItem>
          </Menu>
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
