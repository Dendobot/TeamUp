import React from "react";
import Navigation from "../components/Navigation";
import UploadAndDisplayImage from "../components/UploadAndDisplayImage";
function AddRecipe() {
  return (
    <div>
      <Navigation />
      <div className="secondary-color">
        <UploadAndDisplayImage />
      </div>
    </div>
  );
}

export default AddRecipe;
