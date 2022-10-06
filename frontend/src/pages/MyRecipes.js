import React from "react";
import Navigation from "../components/Navigation";
import RecipeBox from "../components/RecipeBox";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IconButton } from "@mui/material";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";

function MyRecipes() {
  const axiosPrivate = useAxiosPrivate();
  const [recipeNames, setRecipesNames] = useState();
  const [recipeIDs, setRecipeIDs] = useState();
  const [ans, setAns] = React.useState();

  
    const getRecipeInfo = async () => {
      try {
        const response = await axiosPrivate.get("/recipe/viewRecipes", {
          headers: { "Content-Type": "application/json" },
        });

        console.log("response = ", response);
        console.log("response.data = ", response.data);
        const obj = await JSON.parse(response.data);
        console.log("obj = ", obj.recipeInfo);

        let r = [];
        let d = [];
        for (let i = 0; i < obj.recipeInfo.length; i++) {
          r.push(obj.recipeInfo[i].recipeName);
          d.push(obj.recipeInfo[i].recipeId);
        }

        setRecipesNames(r);
        setRecipeIDs(d);
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
  console.log(recipeIDs)
  console.log(ans)
  

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
      {recipeNames?.length
        ? (
          <ul>
            {recipeNames.map((users, i) =>
            <RecipeBox recipeName= {recipeNames[i]}/>
              )}
          </ul>
        ) : <p>No users to display</p>

      }
        
      </div>
    </div>
  );
}

export default MyRecipes;
