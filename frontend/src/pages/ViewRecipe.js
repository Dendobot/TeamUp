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

  /*return (
    <div className="secondary-color">
      <Navigation />
      
        <div className="recipe-header"> {recipeInfo?.recipeName} </div>
        <img src={recipeInfo?.photo_url}  style={{borderRadius: 25}} width="300" height="165" left="88" top="219" ></img>
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

export default ViewRecipe; */

  return (
    <div>
      <Navigation />
      <div className="secondary-color">
        <div className="recipe-title"> {recipeInfo?.recipeName} </div>
      </div>
      <div className="edit-recipe-button" style= {{position: "absolute", left: "83.86%", right: "5.69%", top: "14.56%", bottom: "81.26%",}}>
        <Button variant="contained">Edit Recipe</Button>
      </div>
      <div>
        <h5 className="ingredients" style={{position:"absolute", left:"564px", top:"184px"}}>Ingredients</h5>
        <div>
          <ul>
            {recipeInfo?.ingredients?.length ? (
              <div> {(recipeInfo?.tags).map((ingredient, i) => (
                <div 
                  className="ingredients-box"
                  style={{
                    left: "540px",
                    top: "223px",
                    display: "block",
                    marginBottom: "10px"
                }}> 
                  <h6 className = "tag-font" style={{paddingLeft: "20px", paddingTop: "20px"}}>{recipeInfo.ingredients[i]}</h6>
                </div>
              ))}
            </div>
            ) : ( <p 
                    style={{
                      position: "absolute",
                      left: "540px",
                      top: "223px"}}> No ingredients</p>)}
          </ul>
        </div>
      </div>
      <h5 className="steps" style={{position: "absolute", width: "133px", height: "22px", left: "1071px", top: "184px",}}>Steps</h5>
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
      > <img src={recipeInfo?.photo_url}  style={{
        borderRadius: 25, 
        width: "346px",
        height: "289px",
        left: "88px",
        top: "219px",
        }}  ></img> 

          <div>
            <ul>
            {recipeInfo?.tags?.length ? (
              <div> {(recipeInfo?.tags).map((tag, i) => (
                <div className = "tags" style={{
                  width: "67px",
                  height: "24px",
                  left: "92px",
                  top: "520px",
                  marginRight: "20px",
                  marginTop: "20px",
                  display: "inline-block"
                }}>
                  <h6 className = "tag-font">{recipeInfo.tags[i]}</h6>
                </div>
              ))}
              </div>
            ) : (<p 
                  style={{
                    position: "absolute",
                    width: "67px",
                    height: "24px",
                    left: "92px",
                    top: "520px",
                  }}>No tags</p>)}
            </ul>
        </div>
      </div>
      
      <div 
        className="white-box" 
        style={{
            position: "absolute",
            left: "88px",
            top: "601px"
        }}> {recipeInfo?.note} </div>

      <div 
        className="steps-box"
        style={{
            position: "absolute",
            left: "1059px",
            top: "220px"
        }}> {recipeInfo?.method} </div>



    </div>
  );
  }

  export default ViewRecipe;

