import React from "react";
import Navigation from "../components/Navigation";
import RecipeBox from "../components/RecipeBox";
import AddIcon from "@mui/icons-material/Add";
import { Grid, IconButton, Typography, Fab } from "@mui/material";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

function MyRecipes() {
  const axiosPrivate = useAxiosPrivate();
  const [recipeNames, setRecipesNames] = useState();
  const [recipeIDs, setRecipeIDs] = useState();
  const [recipePhoto, setRecipePhoto] = useState();
  const [ans, setAns] = React.useState();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const getRecipeInfo = async () => {
    try {
      const response = await axiosPrivate.get("/recipe/viewRecipes", {
        headers: { "Content-Type": "application/json" },
      });

      console.log("response = ", response);
      console.log("response.data = ", response.data);
      const obj = await JSON.parse(response.data);
      console.log("obj = ", obj);

      let r = [];
      let d = [];
      let p = [];
      for (let i = 0; i < obj.recipeInfo.length; i++) {
        r.push(obj.recipeInfo[i].recipeName);
        d.push(obj.recipeInfo[i].recipeId);
        p.push(obj.recipeInfo[i].photo);
      }

      setRecipesNames(r);
      setRecipeIDs(d);
      setRecipePhoto(p);
      setAns(obj);
    } catch (err) {
      alert("Fail");
    }
  };
  useEffect(() => {
    getRecipeInfo();
    console.log("recipeInfo = ", getRecipeInfo());
  }, [axiosPrivate]);

  console.log(recipeNames);
  console.log(recipeIDs);
  console.log(ans);
  console.log(recipePhoto);

  const handleDelete = async (index) => {
    try {
      console.log("recipeIDs     ", recipeIDs);
      console.log("Deleted recipe ID", recipeIDs[index.index]);
      const response = await axiosPrivate.post(
        "/recipe/deleteRecipe",
        JSON.stringify({
          user: auth.user,
          id: recipeIDs[index.index],
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      console.log("Now index is:", index);

      recipeNames.splice(index.index, 1);
      recipeIDs.splice(index.index, 1);
      recipePhoto.splice(index.index, 1);

      //console.log("After ",recipeNames);
      //console.log("After ",recipeIDs)
      //console.log("After ",recipePhoto)
      navigate("/myRecipes");
    } catch (err) {
      alert("Fail");
    }
  };

  const handleEdit = async (index) => {
    navigate("/editRecipe".concat(recipeIDs[index.index]));
  };

  const handleAdd = async (index) => {
    navigate("/addRecipe");
  };

  const handleView = async (index) => {
    navigate("/viewRecipe".concat(recipeIDs[index.index]));
  };
  console.log("user:        ", useAuth().auth.user);

  return (
    <div className="secondary-color min-vh-100 overflow">
      <div classname="center">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <Navigation />
        <div className="addRecipeButton">
          <Typography>
            <h6 className="center-horiz">Hey {useAuth().auth.user}!</h6>
            <h3 className="center-horiz">Here are your recipes</h3>
          </Typography>

            <Tooltip disableFocusListener title="Add a recipe">
              <Fab size = "large" color="primary" aria-label="add" onClick={handleAdd}>
                <AddIcon fontSize="large" />
              </Fab>
            </Tooltip>
        </div>
      </div>
      <div>
        {recipeNames?.length ? (
          <Grid
            container
            rowSpacing={0}
            columnSpacing={{ xs: 0, sm: 2, md: 3 }}
          >
            {recipeNames.map((users, i) => (
              <Grid item className="setGridMargin" xs={12} sm={6} md={4}>
                <div className="center-horiz">
                  <RecipeBox
                    key={i}
                    recipeName={recipeNames[i]}
                    imgsrc={recipePhoto[i]}
                    onDelete={handleDelete}
                    index={i}
                    onEdit={handleEdit}
                    onView={handleView}
                  />
                </div>
              </Grid>
            ))}
          </Grid>
        ) : (
          <p className="no-recipes-txt">You have not added any recipes</p>
        )}
      </div>
    </div>
  );
}

export default MyRecipes;
