import React from "react";
import BottomBar from "../components/BottomBar";
import { Button } from "@mui/material";
import Navigation from "../components/Navigation";
function Landing() {
  return (
    <div className="landing-container">
      <Navigation />
      <div className="home">
        <div className="grid-container ">
          <div className="landingPageText">
            <div className="lets-get-text">Let’s get</div>
            <div className="cooking">cooking!</div>
            <h3 className="EasilyLandingPage">Easily store recipes to</h3>
            <h3 className="EasilyLandingPage">recreate at any time with</h3>
            <h3 className="EasilyLandingPage">Foodie</h3>
            <a href="../signup">
              <Button variant="contained" size="large">
                Sign me up!
              </Button>
            </a>
          </div>
          <img
            src={`https://file.rendit.io/n/rZRVDlqtBdNumaJBs8iy.png`}
            alt="landing page"
          />
        </div>
      </div>
    </div>
  );
}

export default Landing;
