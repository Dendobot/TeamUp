import React from "react";
import { NavLink } from "react-router-dom";
import SignOutButton from "./SignOutButton";
import useAuth from "../hooks/useAuth";


function Navigation () {

  //this signout button will only appear if you are logged in
  var loginButton = <></>;
  const { auth } = useAuth();
  if (auth?.user) {
    loginButton =
      <SignOutButton />;
  } else {
    loginButton = <></>;
  }


  return (
    <nav class="navbar navbar-expand-lg navbar-light ">
      <div className="left">
        <h1 > <a href="/landingPage">Cheffie </a> </h1>
      </div>
      <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-collapse collapse right" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item navBarLinks">
            <NavLink className="nav-link " to="/landingPage">
              Home
              <span className="sr-only">(current)</span>
            </NavLink>
          </li>
          <li className="nav-item navBarLinks">
            <NavLink className="nav-link" to="/Recipes">
              Recipes
            </NavLink>
          </li>
          <li className="nav-item navBarLinks">
            <NavLink className="nav-link" to="/about">
              About
            </NavLink>
          </li>
          <li className="nav-item navBarLinks">
            <NavLink className="nav-link" to="/signin">
              Sign in
            </NavLink>
          </li>

          <li className="nav-item navBarLinks">
            <NavLink className="nav-link" to="/signup">
              Sign up
            </NavLink>
          </li>
          <li className="nav-item navBarLinks">
            {loginButton}
          </li>

        </ul>



      </div>

    </nav>

  );
}

export default Navigation;



