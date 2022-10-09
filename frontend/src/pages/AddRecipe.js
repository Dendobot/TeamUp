import { Box } from "@mui/material";
import React from "react";
import Navigation from "../components/Navigation";
import UploadAndDisplayImage from "../components/UploadAndDisplayImage";
function AddRecipe() {
  return (
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
  );
}

export default AddRecipe;
