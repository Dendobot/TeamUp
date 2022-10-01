import React from "react";
import Navigation from "../components/Navigation";
//import BottomBar from "../components/BottomBar";
import { Button } from "@mui/material";

function ViewRecipe() {
    return (
      <div>
        <Navigation />
        <div className="secondary-color">
          <div className="recipe-header"> Chicken Butter Indian Style </div>
        </div>
        <div className ="edit-recipe-button" >
          <Button variant="contained">
            Edit Recipe
          </Button>
        </div>
        <h5 className="ingredients">Ingredients</h5>
        <h5 className="steps">Steps</h5>
        <h5 className="ingredients" style={{position: 'absolute',width: '125px',height: '27px', left: '294px',top: '517px'}}>Cooking Time (in minutes): 5</h5>
        <h5 className="ingredients" style={{color: '#0671B7', position: 'absolute', width: '133px', height: '22px', left: '103px',top: '571px'}}> Notes </h5>
        <div className ="white-box" style={{position: 'absolute', width: '346px', height:'289px', left: '88px', top:'219px'}}></div>
        <div className ="white-box"></div>
        
        <div className="steps-box"></div>
      </div>
    );
  }
  
  export default ViewRecipe;