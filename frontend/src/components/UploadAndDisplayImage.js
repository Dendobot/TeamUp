import React, { useEffect, useState } from "react";
import {
  TextField,
  InputAdornment,
  Button,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";


import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageUploadPreviewComponent from "../components/ImageUploadPreviewComponent";

const UploadAndDisplayImage = () => {
  const [ingredientList, setIngredientList] = useState([]);
  const [ingredients, setIngredients] = useState("");
  const handleClick = () => {
    setIngredientList((ingredientList) => ingredientList.concat(ingredients));
  };

  const updateIngredient = ({ target }) => {
    // Update query onKeyPress of input box
    setIngredients(target.value);
  };

  function handleDelete(e) {
    console.log(ingredientList);
    const s = ingredientList.filter((ingredients, i) => i !== e);
    setIngredientList(s);
    console.log(s);
  };

  return (
    <form>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
        <Grid className="setGridMargin" xs={3.8}>
          <div className="left">
            <h2 classname="common-font-color">Add a recipe</h2>
            <p className="recipeTitle"> Recipe Title</p>
            <TextField
              size="small"
              className="bg-color"
              label=" "
              id="filled-basic"
              variant="outlined"
            />
            <p className="recipeTitle"> Add Photo</p>
            <div>
              <ImageUploadPreviewComponent />
            </div>
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
              sx={{ width: "346px", marginBottom: "20px" }}
            />
          </div>
        </Grid>
        <Grid className="setGridMargin" xs={4}>
          <div className="left">
            <p className="recipeTitle">Ingredients</p>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper", marginBottom:"15px" }}
            >
              {ingredientList.map((ingredients, i) => (
                <ListItem key={ingredients + i}>
                  <ListItemText primary={`${i+1}. ${ingredients}`}/> 
                  <IconButton onClick={(e) => handleDelete(i)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
            <div>
            <TextField
                  label="Add Ingredient"
                  type = "text"
                  className="bg-color"
                  id="outlined-basic"
                  variant="outlined"
                  onChange={updateIngredient}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          onClick={handleClick}
                          aria-label="add to ingredient list"
                        >
                          <AddCircleRoundedIcon color="primary" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
            </div>
          </div>
        </Grid>
        <Grid className="setGridMargin" xs={3.5}>
          <div className="left">
            <p className="recipeTitle"> Add Steps</p>
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
            <Button
              variant="contained"
              size="small"
              type="submit"
              sx={{ marginLeft: "190px" }}
            >
              Save Changes
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

export default UploadAndDisplayImage;
