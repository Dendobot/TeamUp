import React from "react";
import { NavLink } from "react-router-dom";
import SignOutButton from "./SignOutButton";
import useAuth from "../hooks/useAuth";


function Navigation () {

  //this signout button will only appear if you are logged in
  var loginButton = <></>;
  var home = <></>;
  var about = <></>;
  var signin = <></>;
  var signout = <></>;
  var myRecipes = <></>;
  var addRecipe = <></>;
  const { auth } = useAuth();
  if (auth?.user) {
    loginButton =
      <SignOutButton />;
    myRecipes = <NavLink className="nav-link" to="/myRecipes">My Recipes</NavLink>
    addRecipe = <NavLink className="nav-link" to="/addRecipe">Add Recipe</NavLink>
  } else {
    loginButton = <></>;
    home = <NavLink className="nav-link " to="/landingPage">Home<span className="sr-only">(current)</span></NavLink>
    about = <NavLink className="nav-link" to="/about">About</NavLink>
    signin= <NavLink className="nav-link" to="/signin">Sign in</NavLink>
    signout = <NavLink className="nav-link" to="/signup">Sign up</NavLink>

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
            {home}
            {myRecipes}
          </li>

          <li className="nav-item navBarLinks">
            {about}
            {addRecipe}
            </li>
          <li className="nav-item navBarLinks">
            {signin}
          </li>

          <li className="nav-item navBarLinks">
            {signout}
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



