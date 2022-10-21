import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import {Stack, Grid, Fab } from "@mui/material";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

const VIEW_RECIPE_URL = "/recipe/viewRecipe?id=";

function ViewRecipe() {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  console.log("id = ", id);
  const [recipeInfo, setrecipeInfo] = useState();
  const navigate = useNavigate();

  const getRecipe = async () => {
    const url = VIEW_RECIPE_URL + id;
    console.log("get url = ", url);
    try {
      const response = await axiosPrivate.get(url, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("response.data = ", response.data);
      const obj = await JSON.parse(response.data);
      console.log("response obj = ", obj);
      setrecipeInfo(obj);
      console.log("recipe info", obj);
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
      <Grid container rowSpacing={0} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
        <Grid
          item
          className="setGridMargin"
          xs={12}
          md={4}
          justifyItems="center"
        >
          <div className="center">
            <div
              className="recipe-title"
              style={{
                marginRight: "30px",
                marginBottom: "20px",
                wordWrap: "break-word",
              }}
            >
              {recipeInfo?.recipeName}
            </div>

            <div className="white-box">
              <img
                src={recipeInfo?.photo_url}
                style={{
                  borderRadius: 25,
                  width: "100%",
                  height: "295px",
                }}
              ></img>
            </div>

            <div style={{ marginBottom: 20 }}>
              {recipeInfo?.tags?.length ? (
                <Stack direction="row" alignItems="baseline">
                  {(recipeInfo?.tags).map((tag, i) => (
                    <div
                      className="tags"
                      style={{
                        height: "24px",
                        display: "inline-flex",
                        marginRight: "20px",
                        marginTop: "20px",
                      }}
                    >
                      <h6
                        className="tag-font"
                        style={{
                          alignItems: "center",
                          textAlign: "center",
                          display: "flex",
                        }}
                      >
                        {recipeInfo.tags[i]}
                      </h6>
                    </div>
                  ))}
                </Stack>
              ) : (
                <p
                  style={{
                    position: "absolute",
                    width: "67px",
                    height: "24px",
                    marginTop: "20px",
                  }}
                ></p>
              )}
            </div>

            <h5
              className="ingredients"
              style={{
                marginBottom: "10px",
                height: "27px",
                color: "#0671B7",
              }}
            >
              Cooking Time (in minutes): {recipeInfo?.cookingTime}
            </h5>
            <h5
              className="ingredients"
              style={{
                color: "#0671B7",
                width: "133px",
                height: "22px",
                marginTop: "30px",
              }}
            >
              Notes
            </h5>
            <div
              className="notes-box"
              style={{
                marginBottom: "20px",
              }}
            >
              <h6
                className="notes-font"
                style={{
                  marginLeft: "20px",
                  paddingTop: "20px",
                }}
              >
                {recipeInfo?.note}
              </h6>
            </div>
          </div>
        </Grid>

        <Grid
          item
          className="setGridMargin"
          xs={12}
          md={4}
          justifyItems="center"
        >
          <div className="center">
            <h5
              className="ingredients"
              style={{
                color: "#0671B7",
              }}
            >
              Ingredients
            </h5>
            <ul>
              {recipeInfo?.ingredients?.length ? (
                <div>
                  {" "}
                  {(recipeInfo?.ingredients).map((ingredient, i) => (
                    <Stack spacing={2} alignItems="center">
                      <div
                        className="ingredients-box"
                        style={{
                          marginRight: "20px",
                          marginBottom: "10px",
                        }}
                      >
                        <h6
                          className="ingredients-font"
                          style={{
                            paddingLeft: "20px",
                            paddingTop: "30px",
                            alignItems: "center",
                          }}
                        >
                          {recipeInfo.ingredients[i]}
                        </h6>
                      </div>
                    </Stack>
                  ))}
                </div>
              ) : (
                <p
                  style={{
                    position: "absolute",
                    left: "540px",
                    top: "223px",
                  }}
                >
                  {" "}
                  No ingredients
                </p>
              )}
            </ul>
          </div>
        </Grid>

        <Grid
          item
          className="setGridMargin"
          xs={12}
          md={4}
          justifyItems="center"
        >
          <div className="center">
            <div className="flex-end">
              <Fab color="primary" aria-label="edit" onClick={handleEdit}>
                <EditIcon />
              </Fab>
            </div>
            <h5
              className="steps"
              style={{
                width: "133px",
                height: "22px",
                color: "#0671B7",
              }}
            >
              Steps
            </h5>
            <ul>
              {recipeInfo?.method?.length ? (
                <div>
                  {(recipeInfo?.method).map((step, i) => (
                    <Stack spacing={2} alignItems="center">
                      <div
                        className="method-box"
                        style={{
                          marginRight: "20px",
                          marginBottom: "10px",
                        }}
                      >
                        <h6
                          className="method-font"
                          style={{
                            paddingLeft: "20px",
                            marginTop: "10px",
                            marginBottom: "10px",
                          }}
                        >
                          {recipeInfo.method[i]}
                        </h6>
                      </div>
                    </Stack>
                  ))}
                </div>
              ) : (
                <p> No steps</p>
              )}
            </ul>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default ViewRecipe;
