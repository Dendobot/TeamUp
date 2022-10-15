import { Box } from "@mui/material";
import React from "react";
import Navigation from "../components/Navigation";
import UploadAndDisplayImage from "../components/UploadAndDisplayImage";
function AddRecipe() {
  return (
        <div className="secondary-color vh-100 overflow"
        >
          <Navigation />
          <div>
            <UploadAndDisplayImage />
          </div>
        </div>
  );
}

export default AddRecipe;
