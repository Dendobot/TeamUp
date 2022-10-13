import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
//import BottomBar from "../components/BottomBar";
import { Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";

const VIEW_RECIPE_URL = "/recipe/viewRecipe?id=";

function ViewRecipe() {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  console.log("id = ", id)
  const [recipeInfo, setrecipeInfo] = useState();

  const getRecipe = async () => {
    const url = VIEW_RECIPE_URL + id
    console.log("get url = ", url)
    try {
      const response = await axiosPrivate.get(url,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

      console.log("response.data = ", response.data);
      const obj = await JSON.parse(response.data);
      console.log("response obj = ", obj);
      setrecipeInfo(obj)
      console.log("recipe info",obj)

    } catch (err) {
      alert("Failed to get recipe");
    }
  };


  useEffect(() => {
    getRecipe();
  }, [axiosPrivate]);

  return (
    <div className="secondary-color">
      <Navigation />
      
        <div className="recipe-header"> {recipeInfo?.recipeName} </div>
        <img src={recipeInfo?.photo_url}  style={{borderRadius: 25}} width="300" height="165"  ></img>
      <div className="edit-recipe-button">
        <Button variant="contained">Edit Recipe</Button>
      </div>
      <h5 className="ingredients">Ingredients {recipeInfo?.ingredients}</h5>
      <h5 className="steps">Steps {recipeInfo?.method}</h5>
      <h5
        className="ingredients"
        style={{
          position: "absolute",
          width: "125px",
          height: "27px",
          left: "294px",
          top: "517px",
        }}
      >
        Cooking Time (in minutes): {recipeInfo?.cookingTime}
      </h5>
      <h5
        className="ingredients"
        style={{
          color: "#0671B7",
          position: "absolute",
          width: "133px",
          height: "22px",
          left: "103px",
          top: "571px",
        }}
      >
        Notes {recipeInfo?.note}
      </h5>
      <div
        className="white-box"
        style={{
          position: "absolute",
          width: "346px",
          height: "289px",
          
        }}
      ></div>
      
      </div>
   
  );
}

export default ViewRecipe;
