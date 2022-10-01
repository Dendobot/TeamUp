import React from "react";
import Navigation from "../components/Navigation";
import RecipeBox from "../components/RecipeBox"


function MyRecipes() {

  return (
    <div >
      <Navigation/>
      <div className="center-horiz graph-parts">
      <RecipeBox/>
      <RecipeBox/>
      </div>
      
    
    </div>
  );
}

export default MyRecipes;