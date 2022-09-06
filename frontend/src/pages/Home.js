import React from "react";
import SignUpButton from "../components/SignUpButton"

function Home() {
  return (
    <div>
    <div className="home">
      <div className="grid-container ">
      <div >
        <div className="center-vert">
        <div className="letsGetText">Let’s get</div>
        <div className="cooking">cooking!</div>
        <h3>Easily store recipes to<br/>recreate at any time with<br/>Foodie</h3>
        <SignUpButton></SignUpButton>
        </div>
      </div>
        <img src={`https://file.rendit.io/n/Rp6ZvSUlQBqPyB0s5SG1.svg`}alt="landig page"/>
    </div>
    </div>
    </div>
  );
}

export default Home;