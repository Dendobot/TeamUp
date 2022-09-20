import React from "react";
import { NavLink } from "react-router-dom";

function LoggedInNavBar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light ">
      <div className="left">
        <h1>Cheffie</h1>
        </div>
          <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarNav" 
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse right" id="navbarNav">
          <ul className="navbar-nav ml-auto">
                <li className="nav-item nav-bar-links">
                  <NavLink className="nav-link " to="/home">
                  Your recipes
                    <span className="sr-only">(current)</span>
                  </NavLink>
                </li>
                <li className="nav-item nav-bar-links">
                  <NavLink className="nav-link" to="/addRecipe">
                  Add Recipe
                  </NavLink>
                </li>
                <li className="nav-item nav-bar-links">
                  <NavLink className="nav-link " to="/Profile">
                  Profile
                  </NavLink>
                </li>

                <li className="nav-item nav-bar-links">
                  <NavLink className="nav-link " to="/landingPage">
                  Logout
                  </NavLink>
                </li>
              </ul>
        </div>

</nav>

  );
}

export default LoggedInNavBar;



