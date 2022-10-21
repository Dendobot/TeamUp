import React from "react";
import Navigation from "../components/Navigation";
import UploadAndDisplayImage from "../components/UploadAndDisplayImage";
function AddRecipe() {
  return (
    <div className="secondary-color min-vh-100 overflow">
      <Navigation />
      <div>
        <UploadAndDisplayImage />
      </div>
    </div>
  );
}

export default AddRecipe;
