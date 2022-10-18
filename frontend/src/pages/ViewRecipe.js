import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { Button, Stack, Grid } from "@mui/material";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {useParams } from "react-router-dom";
import { useNavigate} from "react-router-dom";

const VIEW_RECIPE_URL = "/recipe/viewRecipe?id=";

function ViewRecipe() {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  console.log("id = ", id)
  const [recipeInfo, setrecipeInfo] = useState();
  const navigate = useNavigate();

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

  const handleEdit = async (index) => {
    navigate("/editRecipe".concat(id));
  };


  return (
    <div className="secondary-color min-vh-100 overflow">
      <Navigation />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <div className="secondary-color">
            <div className="recipe-title"
                 style={{
                  marginTop:"100px",
                  marginLeft: "80px",
                  marginBottom: "20px",
                  wordWrap: "break-word"
                 }}
            > {recipeInfo?.recipeName} </div>
          </div>

          <div
            className="white-box"
            style={{marginLeft:"80px"}}> 
            <img src={recipeInfo?.photo_url}  
            style={{
              borderRadius: 25, 
              width: "346px",
              height: "295px",
              }}></img> 
          </div>
          
          <ul style={{marginLeft:"40px"}}>
            {recipeInfo?.tags?.length ? (
              <div> {(recipeInfo?.tags).map((tag, i) => (
                <div 
                  className = "tags" 
                  style={{
                    height: "24px",
                    marginRight: "20px",
                    marginTop: "20px",
                    display: "inline-flex",
                    flexGrow:"1",
                    alignSelf: "flex-start"
                }}>
                  <h6 
                    className = "tag-font" 
                      style={{
                        alignItems:"center", 
                        textAlign:"center",
                        display: "flex"}}>{recipeInfo.tags[i]}</h6>
                </div>
              ))}
              </div>
            ) : (<p 
                  style={{
                    position: "absolute",
                    width: "67px",
                    height: "24px",
                    marginTop:"20px",
                  }}></p>)}
            </ul>

            <h5
              className="ingredients"
              style={{

                height: "27px",
                color: "#0671B7",
                marginLeft: "80px"
              }} >Cooking Time (in minutes): {recipeInfo?.cookingTime}
            </h5>
            <h5
              className="ingredients"
              style={{
                color: "#0671B7",
                width: "133px",
                height: "22px",
                marginLeft: "80px",
                marginTop: "30px"
              }}>Notes
            </h5>
            <div 
              className="notes-box" 
              style={{
                marginLeft:"80px",
                marginBottom:"20px"
              }}> <h6 
                    className = "notes-font" 
                    style={{
                      marginLeft: "20px",
                      paddingTop:"20px"}}>{recipeInfo?.note}</h6> 
            </div>



        </Grid>

        <Grid item xs={4}>
          <div>
            <h5 
              className="ingredients" 
              style={{
                marginTop:"120px", 
                marginLeft:"30px",
                color: "#0671B7",}}>Ingredients</h5>
            <ul>
              {recipeInfo?.ingredients?.length ? (
                <div> {(recipeInfo?.ingredients).map((ingredient, i) => (
                  <Stack spacing={2} alignItems="center" >
                    <div 
                      className="ingredients-box"
                      style={{
                        display: "block",
                        marginBottom: "10px",
                        marginRight: "80px"
                    }}> 
                      <h6 
                        className = "ingredients-font" 
                        style={{
                          paddingLeft: "20px", 
                          paddingTop: "30px", 
                          alignItems:"center"}}>{recipeInfo.ingredients[i]}</h6>
                    </div>
                  </Stack>
                ))}
                </div>
              ) : ( <p 
                      style={{
                        position: "absolute",
                        left: "540px",
                        top: "223px"}}> No ingredients</p>)}
            </ul>
          </div>
        </Grid>

        <Grid item xs={4}>
          <div 
            className="edit-recipe-button">
            <Button variant="contained" sx={{marginTop: "20px", marginLeft:"145px"}} onClick={handleEdit}>Edit Recipe</Button>
          </div>
          <h5 className="steps" 
              style={{
                marginTop:"60px", 
                marginLeft:"30px",
                width: "133px", 
                height: "22px", 
                color: "#0671B7",}}>Steps</h5>
          <ul>
            {recipeInfo?.method?.length ? (
              <div> {(recipeInfo?.method).map((step, i) => (
                <Stack spacing={2} alignItems="center" >
                  <div 
                    className = "method-box"
                    style={{
                      marginBottom: "10px",
                      marginRight:"80px",
                    }}>
                      <h6 
                        className = "method-font" 
                        style={{
                          paddingLeft: "20px", 
                          marginTop: "10px", marginBottom: "10px"}}>{recipeInfo.method[i]}</h6>
                    </div>
                </Stack>
              ))}
              </div>
            ) : ( <p> No steps</p>)}
          </ul>
        </Grid>
      </Grid>
    </div>
  );
  }

  export default ViewRecipe;

