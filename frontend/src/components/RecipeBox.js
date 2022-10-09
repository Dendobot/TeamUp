import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { createTheme } from '@mui/material/styles';

function RecipeBox(props) {
    const theme = createTheme({
        palette: {
          primary: {
            main: "#0671B7",
          },
          secondary: {
            main: '#7D8D98',
          },
        },
      });
      const index = props.index

      console.log("index:     ", index)

      

  //var imgsrc = "https://www.simplyrecipes.com/thmb/8caxM88NgxZjz-T2aeRW3xjhzBg=/2000x1125/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__09__easy-pepperoni-pizza-lead-3-8f256746d649404baa36a44d271329bc.jpg";
  return (
    <div className="box right-table">
    <div className ="white-box" style={{ width: '346px', height:'289px',  padding:'23px'}}>
    <p>{props.recipeName}</p>
    <img src={props.imgsrc}style={{borderRadius: 25}} width="300" height="165"   onClick={() => props.onView({index})}></img>
    <IconButton aria-label="delete" size="large" color="secondary" theme={theme} onClick={() => props.onDelete({index})}>
      <DeleteIcon fontSize="inherit" />
      </IconButton>

      <IconButton aria-label="delete" size="large" color="primary" onClick={() => props.onEdit({index})}>
      <EditIcon fontSize="inherit" />
      </IconButton>
    </div>
      
    </div>
    
  );
}

export default RecipeBox;
