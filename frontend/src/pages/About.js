import React from "react";
import Navigation from "../components/Navigation";
import aboutKitchen from "../assets/aboutKitchen.jpg";

export const About = () => {
  return (
    <div className="min-vh-100 overflow">
      <img
        className="top-lightimg"
        src={`https://file.rendit.io/n/PKdbhv0kawz00MsuG3et.png`}
        alt="sign in page"
      />
      <Navigation />
      <div className="row justify-content-center custom-large-margin text-center text-md-left">
        <div className="col-sm-12 col-md-10 col-xl-8">
          <div className="d-flex flex-column justify-content-center h-100">
            <div className="col-sm-12 col-xl-8">
              <h1 className="mb-5 primary-bold-text">About</h1>
              <p className="h5 mb-4">
                Cheffie was born as a project for the subject COMP30022 (IT
                Project). The project was created by TeamUp in Semester 2, 2022.
              </p>
              <p className="h5 mb-5">
                Currently, users are able to use Cheffie to keep family recipes,
                favourites and go-to recipes all in one place. We have placed
                careful thought in creating a simple but beautiful user
                interface. We hope you enjoy using the application as much as we
                did building it!
              </p>
              <p className="h5 mb-4">Cheers,</p>
              <p className="h5">Truman, Ramya, Rahaf, Rachel and Joanna</p>
            </div>
            <div class="row justify-content-center kitchen-img">
              <img src={aboutKitchen} alt="sign in page" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
