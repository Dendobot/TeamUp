import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
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
                <li className="nav-item navBarLinks">
                  <NavLink className="nav-link" to="/home">
                    Home
                    <span className="sr-only">(current)</span>
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
              </ul>
        </div>

</nav>

  );
}

export default Navigation;



