import React from "react";
import SignUpButton from "../components/SignUpButton"
import BottomBar from "../components/BottomBar"

function Home() {
  return (
    <div>
    <div className="home">
      <div className="grid-container ">
      <div className="landingPageText">
        <div className="letsGetText">Let’s get</div>
        <div className="cooking">cooking!</div>
        <h3 className="EasilyLandingPage">Easily store recipes to</h3>
        <h3 className="EasilyLandingPage">recreate at any time with</h3>
        <h3 className="EasilyLandingPage">Foodie</h3>
        <SignUpButton></SignUpButton>
      </div>
      <img src={`https://file.rendit.io/n/rZRVDlqtBdNumaJBs8iy.png`}alt="landig page"/>
    </div>
    <BottomBar></BottomBar>
    </div>
    </div>
  );
}

export default Home;