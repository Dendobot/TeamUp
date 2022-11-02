import React from "react";
import Navigation from "../components/Navigation";

export const Help = () => {
  return (
    <div className="min-vh-100 overflow">
      <img
        className="top-lightimg"
        src={`https://file.rendit.io/n/PKdbhv0kawz00MsuG3et.png`}
        alt="sign in page"
      />
      <Navigation />
      <div className="row justify-content-center text-center text-md-left">
        <div className="col-sm-12 col-md-10 col-xl-8">
          <div className="d-flex flex-column justify-content-center h-100">
            <h1 className="mt-5 primary-bold-text">Website Walkthrough</h1>
            <p className="h5 mb-3">
              Below is a tutorial that TeamUp has put together for new users, to
              see how you can use Cheffie.
            </p>
            <video controls>
              <source
                src="https://res.cloudinary.com/dyhv1equv/video/upload/v1666516962/website_walkthrough_ogpnqj.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};
