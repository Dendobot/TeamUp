import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  Button,
  Grid,
  IconButton,
  ListItem,
  ListItemText,
  Chip,
  Box,
  Stack,
  CardMedia,
  Snackbar,
  Alert,
  AlertTitle,
  Divider,
} from "@mui/material";

import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useFormik } from "formik";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import TextareaAutosize from "@mui/base/TextareaAutosize";

//for backEnd
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const CREATE_URL = "/recipe/createRecipe";
const PHOTO_CLOUD_URL =
  "https://api.cloudinary.com/v1_1/dyhv1equv/image/upload";

const UploadAndDisplayImage = () => {
  const [ingredientList, setIngredientList] = useState([]);
  const [ingredients, setIngredients] = useState("");
  const [value, setValue] = useState("");

  const [stepsList, setStepsList] = useState([]);
  const [steps, setSteps] = useState("");
  const [valueStep, setValueStep] = useState("");

  const [tagsList, setTagsList] = useState([]);
  const [tags, setTags] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(true);

  const handleClose = (event = React.SyntheticEvent | Event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  //backend
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  //redirecting to home page if successfully registered
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      recipeName: "",
      note: "",
      ingredients: [],
      method: [],
      cookingTime: 0,
      tags: [],
      photo_url: "",
    },
    onSubmit: async (values) => {
      //axios to back end
      console.log("click save changes");
      try {
        if (
          ingredientList.length > 0 &&
          stepsList.length > 0 &&
          values.recipeName !== "" &&
          values.recipeName !== " " &&
          Number.isInteger(+values.cookingTime)
        ) {
          var url =
            "https://res.cloudinary.com/dyhv1equv/image/upload/v1665651239/no_image_uploaded-253x190_id5eas.gif";
          if (selectedImage) {
            const formData = new FormData();
            formData.append("file", selectedImage);
            formData.append("upload_preset", "default");
            try {
              const res = await axios.post(PHOTO_CLOUD_URL, formData);
              console.log("photo Submit Success");
              console.log(res.data.url);
              url = res.data.url;
            } catch {
              console.log("photo Submit failed");
            }
          }

          const response = await axiosPrivate.post(
            CREATE_URL,
            JSON.stringify({
              user: auth.user,
              recipeName: values.recipeName,
              note: values.note,
              ingredients: ingredientList,
              method: stepsList,
              cookingTime: values.cookingTime,
              tags: tagsList,
              photo_url: url,
            }),
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          setSuccess(true);
          console.log(response?.data);
          console.log(response?.accessToken);
          console.log(JSON.stringify(response));
          setTimeout(() => {
            navigate("/myRecipes");
            setSuccess(false);
          }, 2000);
        } else {
          if (stepsList.length === 0) {
            formik.errors.method = "Method is required";
          }

          if (values.recipeName === "" || values.recipeName === " ") {
            formik.errors.recipeName = "Recipe name is required";
          }
          if (ingredientList.length === 0) {
            formik.errors.ingredients = "Ingredient is required";
          }
          if (!Number.isInteger(+values.cookingTime)) {
            formik.errors.cookingTime = "Cooking time needs to be a number";
          }
        }
      } catch (err) {
        console.log("error = ", err.response?.status);
      }
      //axios to back end
      console.log("you clicked the submit button");
      console.log(" recipe name = ", values.recipeName);
      console.log("Tags = ", tagsList);
      console.log("note = ", values.note);
      console.log("method = ", stepsList);
      console.log("ingredients = ", ingredientList);
      console.log("cooking time = ", +values.cookingTime);
    },
  });

  const handleTag = () => {
    if (tags !== "" && tagValue !== "" && tags !== " ") {
      setTagsList((tagsList) => tagsList.concat(tags));
    }
    setTags("");
    setTagValue("");
  };

  const handleIngredient = () => {
    if (ingredients !== "" && value !== "" && ingredients !== " ") {
      setIngredientList((ingredientList) => ingredientList.concat(ingredients));
      formik.errors.ingredients = "";
    }
    setIngredients("");
    setValue("");
  };

  const handleSteps = () => {
    if (steps !== "" && valueStep !== "" && steps !== " ") {
      setStepsList((stepsList) => stepsList.concat(steps));
      formik.errors.method = "";
    }
    setSteps("");
    setValueStep("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleTag();
    }
  };

  const handleStepsKey = (event) => {
    if (event.key === "Enter") {
      handleSteps();
    }
  };

  const handleIngredientKey = (event) => {
    if (event.key === "Enter") {
      handleIngredient();
    }
  };

  function handleDeleteSteps(e) {
    console.log(stepsList);
    const m = stepsList.filter((steps, index) => index !== e);
    setStepsList(m);
    console.log(m);
  }

  function handleDelete(e) {
    console.log(ingredientList);
    const s = ingredientList.filter((ingredients, i) => i !== e);
    setIngredientList(s);
    console.log(s);
  }

  function removeTag(e) {
    console.log(tagsList);
    const t = tagsList.filter((tags, i) => i !== e);
    setTagsList(t);
    console.log(t);
  }

  return (
    <div className="secondary-color vh-100 overflow">
      <form
        onKeyPress={(e) => {
          e.which === 13 && e.preventDefault();
        }}
        onSubmit={formik.handleSubmit}
      >
        <Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
          <Grid className="setGridMargin" xs={3.7}>
            <div className="left">
              <h2 className="common-font-color">Add a recipe</h2>
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
                InputLabelProps={{ shrink: false }}
              />
              {Boolean(formik.errors.recipeName) &&
                formik.touched.recipeName && (
                  <div style={{ color: "#d32f2f" }}>
                    {formik.errors.recipeName}
                  </div>
                )}
              <p className="recipeTitle"> Add Photo</p>
              <div>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                  >
                    <input
                      id="photoInput"
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={(event) => {
                        setSelectedImage(event.target.files[0]);
                      }}
                    />
                    <PhotoCamera />
                  </IconButton>
                  <p>Click Icon to Upload</p>
                </Stack>
                {selectedImage && (
                  <div>
                    <CardMedia
                      component="img"
                      sx={{
                        width: "346px",
                        height: "173px",
                        marginBottom: "10px",
                      }}
                      src={URL.createObjectURL(selectedImage)}
                      alt="Live from space album cover"
                    />
                    <div class=" d-flex justify-content-center">
                      <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                          setSelectedImage(null);
                          document.getElementById("photoInput").value = null;
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                )}
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
                error={
                  formik.touched.cookingTime &&
                  Boolean(formik.errors.cookingTime)
                }
                InputLabelProps={{ shrink: false }}
              />
              {Boolean(formik.errors.cookingTime) &&
                formik.touched.cookingTime && (
                  <div style={{ color: "#d32f2f" }}>
                    {formik.errors.cookingTime}
                  </div>
                )}

              <p className="recipeTitle">Add Tags</p>
              {tagsList.map((tags, i) => (
                <Chip
                  label={`${tags}`}
                  onDelete={(e) => removeTag(i)}
                  sx={{ marginBottom: "5px", marginRight: "5px" }}
                />
              ))}
              <div>
                <TextField
                  label="Add Tag"
                  type="text"
                  className="bg-color"
                  id="tags"
                  name="tags"
                  size="small"
                  variant="outlined"
                  onChange={({ target }) => {
                    setTags(target.value);
                    setTagValue(target.value);
                  }}
                  onKeyDown={handleKeyDown}
                  value={tagValue}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          onClick={handleTag}
                          aria-label="add to tags list"
                        >
                          <AddCircleRoundedIcon color="primary" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ marginTop: "5px" }}
                />
              </div>

              <p className="recipeTitle"> Note</p>
              <TextField
                className="bg-color"
                id="note"
                label=" "
                variant="outlined"
                size="small"
                multiline
                minRows={"7"}
                sx={{ width: "346px", marginBottom: "40px" }}
                name="note"
                value={formik.values.note}
                onChange={formik.handleChange}
                InputLabelProps={{ shrink: false }}
              />
            </div>
          </Grid>
          <Grid className="setGridMargin" xs={3.7}>
            <div className="left">
              <p className="OtherTitle">Ingredients</p>
              <Box
                sx={{
                  bgcolor: "background.paper",
                  boxShadow: 1,
                  borderRadius: 2,
                  maxWidth: 270,
                  marginBottom: "10px",
                }}
              >
                {ingredientList.map((ingredients, i) => (
                  <div>
                    <ListItem size="small" key={ingredients + i}>
                      <TextareaAutosize
                        defaultValue={`${ingredients}`}
                        style={{
                          width: 200,
                          border: "none",
                          resize: "none",
                          borderStyle: "none",
                        }}
                      />
                      <IconButton onClick={(e) => handleDelete(i)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                    <Divider />
                  </div>
                ))}
              </Box>
              <div>
                <TextField
                  label="Add Ingredient"
                  type="text"
                  className="bg-color"
                  id="ingredients"
                  name="ingredients"
                  variant="outlined"
                  onChange={({ target }) => {
                    if (target.value.length <= 22) {
                      setIngredients(target.value);
                      setValue(target.value);
                    }
                  }}
                  onKeyDown={handleIngredientKey}
                  value={value}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          onClick={handleIngredient}
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
          <Grid className="setGridMargin" xs={3.7}>
            <div className="left">
              <p className="OtherTitle"> Add Steps</p>
              <Box
                sx={{
                  bgcolor: "background.paper",
                  boxShadow: 1,
                  borderRadius: 2,
                  maxWidth: 270,
                  marginBottom: "10px",
                }}
              >
                {stepsList.map((steps, index) => (
                  <div>
                    <ListItem size="small" key={steps + index}>
                      <TextareaAutosize
                        defaultValue={`${index + 1}.${steps}`}
                        style={{
                          width: 200,
                          border: "none",
                          resize: "none",
                          borderStyle: "none",
                        }}
                      />
                      <IconButton onClick={(e) => handleDeleteSteps(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                    <Divider />
                  </div>
                ))}
              </Box>
              <div>
                <TextField
                  label="Add Steps"
                  type="text"
                  className="bg-color"
                  id="method"
                  name="method"
                  variant="outlined"
                  onChange={({ target }) => {
                    setSteps(target.value);
                    setValueStep(target.value);
                  }}
                  onKeyDown={handleStepsKey}
                  value={valueStep}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          onClick={handleSteps}
                          aria-label="add to steps list"
                        >
                          <AddCircleRoundedIcon color="primary" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={formik.touched.method && Boolean(formik.errors.method)}
                />
              </div>

              {Boolean(formik.errors.method) && formik.touched.method && (
                <div style={{ color: "#d32f2f" }}>{formik.errors.method}</div>
              )}
              {Boolean(success) && (
                <Snackbar
                  open={open}
                  autoHideDuration={2000}
                  onClose={handleClose}
                >
                  <Alert severity="success" sx={{ marginTop: 2 }}>
                    <AlertTitle> Success </AlertTitle>
                    Recipe Saved Successfully
                  </Alert>
                </Snackbar>
              )}
              <Button
                variant="contained"
                size="small"
                type="submit"
                sx={{ marginTop: "10px", marginLeft: "145px" }}
              >
                Save Changes
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default UploadAndDisplayImage;
