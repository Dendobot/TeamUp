import { TextField } from "@mui/material";
import React, { useState } from "react";
import { Grid, Button} from "@mui/material";

const UploadAndDisplayImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  /*<input
          className="uploade-photo"
          type="file"
          name="myImage"
          onChange={(event) => {
            setSelectedImage(event.target.files[0]);
          }}
        />
        {selectedImage && (
          <div>
            <br />
            <div
              onClick={() => setSelectedImage(null)}
              className="uploade-photo"
            >
              Remove
            </div>
            <br />
            <br />
            <img
              className="photo-box"
              alt="not fount"
              width={"250px"}
              src={URL.createObjectURL(selectedImage)}
            />
          </div>
        )}*/

  return (
    <div className="secondary-color">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
        <Grid className="setGridMargin" xs={3.8}>
          <div className="left">
            <h2 classname="common-font-color">Add a recipe</h2>
            <p className="recipeTitle"> Recipe Title</p>
            <TextField
              className="bg-color"
              label=" "
              id="filled-basic"
              variant="outlined"
            />
            <p className="recipeTitle"> Add Photo</p>
            <input
              className="uploade-photo"
              type="file"
              name="myImage"
              onChange={(event) => {
                setSelectedImage(event.target.files[0]);
              }}
            />
            {selectedImage && (
              <div>
                <br />
                <div onClick={() => setSelectedImage(null)}>Remove</div>
                <br />
                <br />
                <img
                  className="photo-box"
                  alt="not fount"
                  width={"250px"}
                  src={URL.createObjectURL(selectedImage)}
                />
              </div>
            )}
            <p className="recipeTitle"> Cooking Time (In Minutes)</p>
            <TextField
              className="bg-color"
              id="outlined-basic"
              label=" "
              variant="outlined"
              size="small"
              sx={{ width: "120px" }}
            />
            <p className="recipeTitle"> Note</p>
            <TextField
              className="bg-color"
              id="outlined-basic"
              label=" "
              variant="outlined"
              size="small"
              multiline
              minRows={"7"}
              sx={{ width: "346px", marginBottom: "20px"}}
            />
          </div>
        </Grid>
        <Grid className="setGridMargin" xs={4}>
          <div className="left">
            <p className="recipeTitle">Ingredients</p>
            <TextField
              className="bg-color"
              id="outlined-basic"
              label=" "
              variant="outlined"
              size="small"
              multiline
              minRows={"7"}
              sx={{ width: "346px", marginBottom: "20px"}}
            />
          </div>
        </Grid>
        <Grid className="setGridMargin" xs={3.5}>
          <div className="left">
            <p className="recipeTitle">Steps</p>
            <TextField
              className="bg-color"
              id="outlined-basic"
              label=" "
              variant="outlined"
              size="small"
              multiline
              minRows={"19"}
              sx={{ width: "346px", marginBottom: "20px" }}
            />
              <Button variant="contained" size="small" type="submit"
              sx={{ marginLeft: "190px"}}>
                Save Changes
              </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default UploadAndDisplayImage;
