import React from "react";
import Navigation from "../components/Navigation";
import RecipeBox from "../components/RecipeBox";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IconButton } from "@mui/material";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect } from "react";

function MyRecipes() {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  useEffect(() => {
    const getRecipeInfo = async () => {
      try {
        const response = await axiosPrivate.get("/recipe/viewRecipes", {
          headers: { "Content-Type": "application/json" },
        });

        console.log("response = ", response);
        console.log("response.data = ", response.data);
      } catch (err) {
        alert("Fail");
      }
    };

    const recipeInfo = getRecipeInfo();
    console.log("recipeInfo = ", recipeInfo);
  }, [axiosPrivate]);

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <Navigation />
      <a href="../addRecipe">
        <IconButton
          aria-label="add"
          sx={{
            fontSize: 80,
            float: "right",
            left: 1480,
            top: 700,
            position: "fixed",
          }}
          color="primary"
        >
          <AddCircleIcon fontSize="inherit">add_circle</AddCircleIcon>
        </IconButton>
      </a>
      <div className="center-horiz graph-parts">
        <RecipeBox />
        <RecipeBox />
        <RecipeBox />
        <RecipeBox />
        <RecipeBox />
        <RecipeBox />
        <RecipeBox />
        <RecipeBox />
        <RecipeBox />
        <RecipeBox />
        <RecipeBox />
      </div>
    </div>
  );
}

export default MyRecipes;
