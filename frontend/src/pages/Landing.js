import React from "react";
import { Button } from "@mui/material";
import Navigation from "../components/Navigation";
function Landing() {
  return (
    <div className="min-vh-100 overflow">
      <Navigation />
      <div className="row justify-content-center custom-large-margin text-center text-md-left">
        <div className="col-sm-12 col-md-5 col-xl-4">
          <div className="d-flex flex-column justify-content-center h-100">
            <div>
              <h1 className="lets-get-text">Let's get</h1>
              <h1 className="cooking-text">cooking!</h1>
              <h1 className="hero-tagline w-md-75">
                Easily store recipes to recreate at any time with Cheffie
              </h1>
            </div>
            <div>
              <a href="../signup">
                <Button variant="contained" size="large">
                  Sign me up!
                </Button>
              </a>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-5 col-xl-4 align-items-center justify-content-end m-3 m-md-0 h-100">
          <img
            className="w-100 h-100"
            h-auto
            src={`https://file.rendit.io/n/rZRVDlqtBdNumaJBs8iy.png`}
            alt="landing page"
          />
        </div>
      </div>
    </div>
  );
}

export default Landing;
