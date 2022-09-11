import React from "react";
import Navigation from "../components/LoggedInNavBar";
import UploadAndDisplayImage from "../components/UploadAndDisplayImage"
function AddRecipe() {
  return (
    <div>
      <Navigation />
      <UploadAndDisplayImage/>
    </div>
  );
}

export default AddRecipe;