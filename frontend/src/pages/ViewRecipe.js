import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
//import BottomBar from "../components/BottomBar";
import { Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";

const VIEW_RECIPE_URL = "/recipe/viewRecipe/";

function ViewRecipe() {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  console.log("id = ", id)
  const [recipeInfo, setrecipeInfo] = useState();

  const getRecipe = async () => {
    const url = VIEW_RECIPE_URL + id
    console.log("get url = ", url)
    try {
      const response = await axiosPrivate.get(url, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("response.data = ", response.data);
      const obj = await JSON.parse(response.data);
      console.log("response obj = ", obj);
      setrecipeInfo(obj)

    } catch (err) {
      alert("Failed to get recipe");
    }
  };


  useEffect(() => {
    getRecipe();
  }, [axiosPrivate]);

  return (
    <div>
      <Navigation />
      <div className="secondary-color">
        <div className="recipe-header"> {recipeInfo?.recipeName} </div>
      </div>
      <div className="edit-recipe-button">
        <Button variant="contained">Edit Recipe</Button>
      </div>
      <h5 className="ingredients">Ingredients</h5>
      <h5 className="steps">Steps</h5>
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
        {" "}
        Notes{" "}
      </h5>
      <div
        className="white-box"
        style={{
          position: "absolute",
          width: "346px",
          height: "289px",
          left: "88px",
          top: "219px",
        }}
      > {recipeInfo?.photo}</div>
      <div className="white-box"> {recipeInfo?.note} </div>

      <div className="steps-box"> {recipeInfo?.method} </div>
    </div>
  );
}

export default ViewRecipe;
