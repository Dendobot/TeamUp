import React from "react";
import Navigation from "../components/Navigation";
import RecipeBox from "../components/RecipeBox"
import Icon from '@mui/material/Icon';
import { IconButton } from '@mui/material';

function MyRecipes() {

  return (
    
    
    <div >
      <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
  />
      <Navigation/>
      <div className="center-horiz graph-parts">
      
      <IconButton aria-label="add">
      <Icon color="primary" fontSize='large' sx={{  float: 'right'}} >add_circle</Icon>
      </IconButton>
      <RecipeBox/>
      <RecipeBox/>
      <RecipeBox/>
      <RecipeBox/>
      <RecipeBox/>
      <RecipeBox/>
      <RecipeBox/>
      <RecipeBox/>
      <RecipeBox/>
      <RecipeBox/>
      <RecipeBox/>
      
      </div>
     
      
    </div>
    
  );
}

export default MyRecipes;