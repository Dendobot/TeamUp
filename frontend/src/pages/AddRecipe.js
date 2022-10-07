import React from "react";
import Navigation from "../components/Navigation";
import UploadAndDisplayImage from "../components/UploadAndDisplayImage";
function AddRecipe() {
  return (
    <div className="blue-background">
      <div className="vh-100 overflow">
        <Navigation />
        <div>
          <UploadAndDisplayImage />
        </div>
      </div>
    </div>
  );
}

export default AddRecipe;
