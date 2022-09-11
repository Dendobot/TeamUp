import React from "react";
import BottomBar from "../components/BottomBar"
import { RegButton } from "../components/RegButton";

import Navigation from "../components/Navigation";
function Home() {
  return (
    <div>
      <Navigation />
    <div className="home">
      <div className="grid-container ">
      <div className="landingPageText">
        <div className="letsGetText">Let’s get</div>
        <div className="cooking">cooking!</div>
        <h3 className="EasilyLandingPage">Easily store recipes to</h3>
        <h3 className="EasilyLandingPage">recreate at any time with</h3>
        <h3 className="EasilyLandingPage">Foodie</h3>
        <RegButton text = 'Sign me up!'/>
      </div>
      <img src={`https://file.rendit.io/n/rZRVDlqtBdNumaJBs8iy.png`}alt="landing page"/>
    </div>
    <BottomBar></BottomBar>
    </div>
    </div>
  );
}

export default Home;