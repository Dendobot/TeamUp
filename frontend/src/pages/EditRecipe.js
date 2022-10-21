import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useParams, useNavigate } from "react-router-dom";

import {
  TextField,
  InputAdornment,
  Button,
  Grid,
  IconButton,
  ListItem,
  Chip,
  Box,
  Stack,
  CardMedia,
  Snackbar,
  Alert,
  AlertTitle,
  Divider,
  Tooltip,
} from "@mui/material";

import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useFormik } from "formik";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import TextareaAutosize from "@mui/base/TextareaAutosize";

//for backEnd
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { WindowSharp } from "@mui/icons-material";
import usePrompt from "../hooks/usePromt";

const CREATE_URL = "/recipe/editRecipe";
const PHOTO_CLOUD_URL =
  "https://api.cloudinary.com/v1_1/dyhv1equv/image/upload";

const EDIT_RECIPE_URL = "/recipe/viewRecipe?id=";

function EditRecipe () {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  console.log("id = ", id);
  const [recipeInfo, setrecipeInfo] = useState();
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
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [changed, setChanged] = useState(false);

  let duplicate_tag = false;
  let duplicate_ingredient = false;

  const getEditRecipe = async () => {
    const url = EDIT_RECIPE_URL + id;
    console.log("get url = ", url);
    try {
      const response = await axiosPrivate.get(url, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("response.data = ", response.data);
      const obj = await JSON.parse(response.data);
      console.log("response obj = ", obj);
      setrecipeInfo(obj);
      console.log("recipe name = ", obj["recipeName"]);
      console.log("recipe info", obj["recipeName"]);
      console.log("recipe url = ", obj["photo_url"]);
      console.log("recipe cookingTime = ", obj["cookingTime"]);
      setName(obj["recipeName"]);
      setIngredientList(obj["ingredients"]);
      setStepsList(obj["method"]);
      if (obj["photo_url"]) {
        setSelectedImage("hello");
        console.log("selected image = ", selectedImage);
      }
      if (obj["tags"]) {
        setTagsList(obj["tags"]);
      }
      if (obj["cookingTime"] || obj["cookingTime"] === 0) {
        setTime(obj["cookingTime"]);
      }
      if (obj["note"]) {
        setNotes(obj["note"]);
      }
    } catch (err) {
      console.log(err);
      alert("Failed to get recipe");
    }
  };

  useEffect(() => {
    getEditRecipe();
  }, [axiosPrivate]);

  //unsaved changes
  useEffect(() => {
    const saveBeforeLeave = (e) => {
      if (changed) {
        e.preventDefault();
        e.stopPropagation();
        e.returnValue = true;
      }
    };

    window.addEventListener('beforeunload', saveBeforeLeave);
    return () => window.removeEventListener('beforeunload', saveBeforeLeave);
  }, [changed]);

  usePrompt("you have some unsave changes, do you wish to continue?", changed);

  const handleClose = (event = React.SyntheticEvent | Event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  //backend
  const { auth } = useAuth();
  //redirecting to home page if successfully registered
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      recipeName: "",
      note: "",
      ingredients: [],
      method: [],
      cookingTime: "",
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
          name !== "" &&
          name !== " " &&
          Number.isInteger(+time)
        ) {
          var url = recipeInfo.photo_url;
          if (selectedImage !== "hello") {
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
              id: id,
              recipeName: name,
              note: notes,
              ingredients: ingredientList,
              method: stepsList,
              cookingTime: time,
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
            navigate("/viewRecipe".concat(id));
            setSuccess(false);
          }, 2000);
        } else {
          if (stepsList.length === 0) {
            formik.errors.method = "Method is required";
          }

          if (name === "" || name === " ") {
            formik.errors.recipeName = "Recipe name is required";
          }
          if (ingredientList.length === 0) {
            formik.errors.ingredients = "Ingredient is required";
          }
          if (!Number.isInteger(+time)) {
            formik.errors.cookingTime = "Cooking time needs to be a number";
          }
        }
      } catch (err) {
        console.log("error = ", err.response?.status);
        alert("Error");
      }
      //axios to back end
      console.log("you clicked the submit button");
      console.log("id = ", id);
      console.log(" recipe name = ", name);
      console.log("Tags = ", tagsList);
      console.log("note = ", notes);
      console.log("method = ", stepsList);
      console.log("ingredients = ", ingredientList);
      console.log("cooking time = ", +time);
      console.log("url = ", url);

      setChanged(false);
    },
  });

  const handleTag = () => {
    for (let i = 0; i < tagsList.length; i++) {
      if (tags === tagsList[i]) {
        duplicate_tag = true;
      }
    }

    if (!duplicate_tag && tags !== "" && tagValue !== "" && tags !== " ") {
      setTagsList((tagsList) => tagsList.concat(tags));
    }
    setTags("");
    setTagValue("");
  };

  const handleIngredient = () => {
    for (let i = 0; i < ingredientList.length; i++) {
      if (ingredients === ingredientList[i]) {
        duplicate_ingredient = true;
      }
    }

    if (
      !duplicate_ingredient &&
      ingredients !== "" &&
      value !== "" &&
      ingredients !== " "
    ) {
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

  function handleDeleteSteps (e) {
    console.log(stepsList);
    const m = stepsList.filter((steps, index) => index !== e);
    setStepsList(m);
    console.log(m);
    setChanged(true);
  }

  function handleDelete (e) {
    console.log(ingredientList);
    const s = ingredientList.filter((ingredients, i) => i !== e);
    setIngredientList(s);
    console.log(s);
    setChanged(true);
  }

  function removeTag (e) {
    console.log(tagsList);
    const t = tagsList.filter((tags, i) => i !== e);
    setTagsList(t);
    console.log(t);
    setChanged(true);
  }

  return (
    <div className="secondary-color min-vh-100 overflow">
      <Navigation />
      <div className="blue-background">
        <form
          onKeyPress={(e) => {
            e.which === 13 && e.preventDefault();
          }}
          onSubmit={formik.handleSubmit}
        >
          <Grid
            container
            rowSpacing={0}
            columnSpacing={{ xs: 0, sm: 0, md: 0 }}
          >
            <Grid item className="setGridMargin" xs={12} md={4}>
              <div className="center">
                <h2 className="common-font-color">Edit Recipe</h2>
                <p className="recipeTitle"> Recipe Title </p>
                <TextField
                  fullWidth
                  size="small"
                  className="bg-color"
                  label=" "
                  variant="outlined"
                  id="recipeName"
                  name="recipeName"
                  onChange={({ target }) => {
                    setName(target.value);
                    setChanged(true);
                  }}
                  value={name}
                  error={
                    formik.touched.recipeName &&
                    Boolean(formik.errors.recipeName)
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
                          setChanged(true);
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
                          width: "100%",
                          height: "200px",
                          marginBottom: "10px",
                        }}
                        src={
                          selectedImage === "hello"
                            ? recipeInfo.photo_url
                            : URL.createObjectURL(selectedImage)
                        }
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
                  value={time}
                  onChange={({ target }) => {
                    setTime(target.value);
                    setChanged(true);
                  }}
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
                    key={tags + i}
                    label={`${tags}`}
                    onDelete={(e) => removeTag(i)}
                    sx={{ marginBottom: "5px", marginRight: "5px" }}
                  />
                ))}
                <div>
                  <TextField
                    fullWidth
                    label=" "
                    type="text"
                    className="bg-color"
                    id="tags"
                    name="tags"
                    size="small"
                    variant="outlined"
                    onChange={({ target }) => {
                      setTags(target.value);
                      setTagValue(target.value);
                      setChanged(true);
                    }}
                    onKeyDown={handleKeyDown}
                    value={tagValue}
                    InputLabelProps={{ shrink: false }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip disableFocusListener title="Add a Tag">
                            <IconButton
                              onClick={handleTag}
                              aria-label="add to tags list"
                            >
                              <AddCircleRoundedIcon color="primary" />
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ marginTop: "5px" }}
                  />
                </div>

                <p className="recipeTitle"> Note</p>
                <TextField
                  fullWidth
                  className="bg-color"
                  id="note"
                  label=" "
                  variant="outlined"
                  size="small"
                  multiline
                  minRows={"7"}
                  name="note"
                  onChange={({ target }) => {
                    setNotes(target.value);
                    setChanged(true);
                  }}
                  value={notes}
                  InputLabelProps={{ shrink: false }}
                />
              </div>
            </Grid>
            <Grid item className="setGridMargin" xs={12} md={4}>
              <div className="center">
                <p className="OtherTitle">Ingredients</p>
                <Box
                  sx={{
                    bgcolor: "background.paper",
                    boxShadow: 1,
                    borderRadius: 2,
                    maxWidth: "100%",
                    marginBottom: "10px",
                  }}
                >
                  {ingredientList.map((ingredients, i) => (
                    <div>
                      <ListItem size="small" key={ingredients + i}>
                        <TextareaAutosize
                          defaultValue={`${ingredients}`}
                          style={{
                            width: "100%",
                            border: "none",
                            resize: "none",
                            borderStyle: "none",
                          }}
                        />
                        <Tooltip disableFocusListener title="Delete Ingredeint">
                          <IconButton onClick={(e) => handleDelete(i)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </ListItem>
                      <Divider />
                    </div>
                  ))}
                </Box>
                <div>
                  <TextField
                    fullWidth
                    label=" "
                    size="small"
                    type="text"
                    className="bg-color"
                    id="ingredients"
                    name="ingredients"
                    variant="outlined"
                    onChange={({ target }) => {
                      if (target.value.length <= 22) {
                        setIngredients(target.value);
                        setValue(target.value);
                        setChanged(true);
                      }
                    }}
                    onKeyDown={handleIngredientKey}
                    value={value}
                    InputLabelProps={{ shrink: false }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip
                            disableFocusListener
                            title="Add an Ingredient"
                          >
                            <IconButton
                              onClick={handleIngredient}
                              aria-label="add to ingredient list"
                            >
                              <AddCircleRoundedIcon color="primary" />
                            </IconButton>
                          </Tooltip>
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
            <Grid item className="setGridMargin" xs={12} md={4}>
              <div className="center">
                <p className="OtherTitle"> Add Steps</p>
                <Box
                  sx={{
                    bgcolor: "background.paper",
                    boxShadow: 1,
                    borderRadius: 2,
                    maxWidth: "100%",
                    marginBottom: "10px",
                  }}
                >
                  {stepsList.map((steps, index) => (
                    <div>
                      <ListItem size="small" key={steps + index}>
                        <TextareaAutosize
                          defaultValue={`${index + 1}.${steps}`}
                          style={{
                            width: "100%",
                            border: "none",
                            resize: "none",
                            borderStyle: "none",
                          }}
                        />
                        <Tooltip disableFocusListener title="Delete Step">
                          <IconButton onClick={(e) => handleDeleteSteps(index)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </ListItem>
                      <Divider />
                    </div>
                  ))}
                </Box>
                <div>
                  <TextField
                    fullWidth
                    label=" "
                    size="small"
                    type="text"
                    className="bg-color"
                    id="method"
                    name="method"
                    variant="outlined"
                    onChange={({ target }) => {
                      setSteps(target.value);
                      setValueStep(target.value);
                      setChanged(true);
                    }}
                    onKeyDown={handleStepsKey}
                    value={valueStep}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip disableFocusListener title="Add a Step">
                            <IconButton
                              onClick={handleSteps}
                              aria-label="add to steps list"
                            >
                              <AddCircleRoundedIcon color="primary" />
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                    error={
                      formik.touched.method && Boolean(formik.errors.method)
                    }
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
                <div className="d-flex justify-content-center">
                  <Button
                    variant="contained"
                    size="small"
                    type="submit"
                    sx={{ marginTop: "10px"}}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}

export default EditRecipe;
