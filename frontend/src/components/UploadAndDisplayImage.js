import React, { useEffect, useState } from "react";
import {
  TextField,
  InputAdornment,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import { useFormik } from "formik";
import * as yup from "yup";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageUploadPreviewComponent from "../components/ImageUploadPreviewComponent";

//for backEnd
import axios from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
const REGISTER_URL = "/recipe/createRecipe";

const validationSchema = yup.object({
  recipeName: yup.string("Enter your name").required("Name is required"),
  method: yup.string("Enter your method").required("Method is required"),
});

const UploadAndDisplayImage = () => {
  const [ingredientList, setIngredientList] = useState([]);
  const [ingredients, setIngredients] = useState("");

  //redirecting to login if successfully registered
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      recipeName: "",
      note: "",
      ingredients: [],
      method: "",
      cookingTime: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      //axios to back end
      try {
        if (ingredientList.length > 0) {
          const response = await axios.post(
            REGISTER_URL,
            JSON.stringify({
              recipeName: values.recipeName,
              note: values.note,
              ingredients: ingredientList,
              method: values.method,
              cookingTime: values.cookingTime,
            }),
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          console.log(response?.data);
          console.log(response?.accessToken);
          console.log(JSON.stringify(response));
          alert("Success!");
          navigate("/home");
        }
        else {
          formik.errors.ingredients = "No ingredient present";
        }
      } catch (err) {
        alert("Fail");
      }
      //axios to back end
      console.log("you clicked the submit button");
      console.log(" recipe name = ", values.recipeName);
      console.log("note = ", values.note);
      console.log("method = ", values.method);
      console.log("ingredients = ", ingredientList);
      console.log("cooking time = ", +values.cookingTime);
    },
  });

  const handleClick = () => {
    setIngredientList((ingredientList) => ingredientList.concat(ingredients));
  };

  const updateIngredient = ({ target }) => {
    setIngredients(target.value);
  };

  function handleDelete(e) {
    console.log(ingredientList);
    const s = ingredientList.filter((ingredients, i) => i !== e);
    setIngredientList(s);
    console.log(s);
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
        <Grid className="setGridMargin" xs={3.8}>
          <div className="left">
            <h2 classname="common-font-color">Add a recipe</h2>
            <p className="recipeTitle"> Recipe Title</p>
            <TextField
              id="recipeName"
              name="recipeName"
              size="small"
              className="bg-color"
              label=" "
              variant="outlined"
              value={formik.values.recipeName}
              onChange={formik.handleChange}
              error={
                formik.touched.recipeName && Boolean(formik.errors.recipeName)
              }
            />
            {Boolean(formik.errors.recipeName) && formik.touched.recipeName && (
              <div style={{ color: "#d32f2f" }}>{formik.errors.recipeName}</div>
            )}
            <p className="recipeTitle"> Add Photo</p>
            <div>
              <ImageUploadPreviewComponent />
            </div>
            <p className="recipeTitle"> Cooking Time (In Minutes)</p>
            <TextField
              className="bg-color"
              label=" "
              variant="outlined"
              size="small"
              sx={{ width: "120px" }}
              id="cookingTime"
              name="cookingTime"
              value={formik.values.cookingTime}
              onChange={formik.handleChange}
            />
            <p className="recipeTitle"> Note</p>
            <TextField
              className="bg-color"
              id="note"
              label=" "
              variant="outlined"
              size="small"
              multiline
              minRows={"7"}
              sx={{ width: "346px", marginBottom: "20px" }}
              name="note"
              value={formik.values.note}
              onChange={formik.handleChange}
            />
          </div>
        </Grid>
        <Grid className="setGridMargin" xs={4}>
          <div className="left">
            <p className="recipeTitle">Ingredients</p>
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
                marginBottom: "15px",
              }}
            >
              {ingredientList.map((ingredients, i) => (
                <ListItem key={ingredients + i}>
                  <ListItemText primary={`${i + 1}. ${ingredients}`} />
                  <IconButton onClick={(e) => handleDelete(i)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
            <div>
              <TextField
                label="Add Ingredient"
                type="text"
                className="bg-color"
                id="ingredients"
                name="ingredients"
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
                error={
                  formik.touched.ingredients &&
                  Boolean(formik.errors.ingredients)
                }
              />
              {Boolean(formik.errors.ingredients) &&
                formik.touched.ingredients && (
                  <div style={{ color: "#d32f2f" }}>
                    {formik.errors.ingredients}
                  </div>
                )}
            </div>
          </div>
        </Grid>
        <Grid className="setGridMargin" xs={3.5}>
          <div className="left">
            <p className="recipeTitle"> Add Steps</p>
            <TextField
              className="bg-color"
              id="method"
              label=" "
              variant="outlined"
              size="small"
              multiline
              minRows={"19"}
              sx={{ width: "346px", marginBottom: "20px" }}
              name="method"
              value={formik.values.method}
              onChange={formik.handleChange}
              error={formik.touched.method && Boolean(formik.errors.method)}
            />
            {Boolean(formik.errors.method) && formik.touched.method && (
              <div style={{ color: "#d32f2f" }}>{formik.errors.method}</div>
            )}
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
