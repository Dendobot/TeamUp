import { Box } from "@mui/material";
import React from "react";
import Navigation from "../components/Navigation";
import UploadAndDisplayImage from "../components/UploadAndDisplayImage";
function AddRecipe() {
  return (
    <div className="blue-background">
      <div className="vh-100">
        <Box
          sx={{
            width: 1600,
          }}
        >
          <Navigation />
          <div>
            <UploadAndDisplayImage />
          </div>
        </Box>
      </div>
    </div>
  );
}

export default AddRecipe;
