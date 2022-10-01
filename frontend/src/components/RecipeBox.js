import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';


function RecipeBox() {
  var recipe3Name = "My Recipe 3";
  var imgsrc = "https://www.simplyrecipes.com/thmb/8caxM88NgxZjz-T2aeRW3xjhzBg=/2000x1125/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__09__easy-pepperoni-pizza-lead-3-8f256746d649404baa36a44d271329bc.jpg";
  return (
    <div className="box right-table">

    <div className ="white-box" style={{ width: '346px', height:'289px',  padding:'23px'}}>
    <p>{recipe3Name}</p>
    <img src={imgsrc}style={{borderRadius: 25}} width="300" minHeight="250"  ></img>
    <IconButton aria-label="delete" size="large" color="primary">
      <DeleteIcon fontSize="inherit" />
      </IconButton>

      <IconButton aria-label="delete" size="large" color="primary">
      <EditIcon fontSize="inherit" />
      </IconButton>
    </div>
    
      
    </div>
    
  );
}

export default RecipeBox;
