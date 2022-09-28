import React, { useEffect, useState } from "react";
import {
  TextField,
  InputAdornment,
  CardMedia,
  Stack,
  Button,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

import PhotoCamera from "@mui/icons-material/PhotoCamera";

import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import DeleteIcon from "@mui/icons-material/Delete";

const UploadAndDisplayImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [rows, setRows] = useState([
    {
      id: 1,
      item: "",
    },
  ]);

  const generateRow = () => {
    return {
      id: rows.length + 1,
      item: "",
    };
  };

  const handleDeleteRow = (event, id) => {
    setRows((rows) => {
      rows[id - 1].item = "";
      for (let i = id - 1; i < rows.length; i++) {
        rows[i].id--;
      }
    });

    setRows((prevRows) => {
      return [...rows.slice(0, id - 1), ...rows.slice(id)];
    });
  };

  const handleChange = (e, id) => {
    let value = e.target.value;

    if (id === rows.length) {
      if (value !== "") {
        setRows((prevRows) => [...prevRows, generateRow()]);
      }
    } else if (id + 1 === rows.length) {
      if (value === "") {
        handleDeleteRow(e, id + 1);
      }
    }
    setRows((prevRows) => {
      return prevRows.map((row, index) =>
        index === id - 1 ? { ...row, size: value } : row
      );
    });
  };

  /*const handleSave = () => {
    let arr = [];
    if (rows[rows.length - 1].item === "") {
      arr = rows.slice(0, -1);
    } else {
      arr = rows;
    }

    let items = [];
    for (let i = 0; i < arr.length; i++) {
      items.push(arr[i].item);
    }

    window.sessionStorage.setItem("list", JSON.stringify(items));
  };*/

  const generateTable = () => {
    return (
      <Table>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <TextField
                  label="Add Ingredient"
                  className="bg-color"
                  id="outlined-basic"
                  variant="outlined"
                  value={row.size}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          onClick={(e) => handleChange(e, row.id)}
                          aria-label="add to ingredient list"
                        >
                          <AddCircleRoundedIcon color="primary" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {row.id === rows.length ? (
                  <></>
                ) : (
                  <IconButton onClick={(e) => handleDeleteRow(e, row.id)}>
                    <DeleteIcon />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  const [tableData, setTableData] = useState(generateTable());

  useEffect(() => {
    setTableData(generateTable());
  }, [rows]);

  useEffect(() => {
    if (window.sessionStorage.getItem("list")) {
      let sizes_arr = window.sessionStorage.getItem("list").split(",");
      sizes_arr.push("");
      let rows_arr = [];
      for (let i = 0; i < sizes_arr.length; i++) {
        rows_arr.push({
          id: i + 1,
          size: sizes_arr[i],
        });
      }

      setRows(rows_arr);
      setTableData(generateTable());
    }
  }, []);
  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
      <Grid className="setGridMargin" xs={3.8}>
        <div className="left">
          <h2 classname="common-font-color">Add a recipe</h2>
          <p className="recipeTitle"> Recipe Title</p>
          <TextField
            size="small"
            className="bg-color"
            label=" "
            id="filled-basic"
            variant="outlined"
          />
          <p className="recipeTitle"> Add Photo</p>
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={(event) => {
                  setSelectedImage(event.target.files[0]);
                }}
              />
              <PhotoCamera />
            </IconButton>
            <p>Click Icon to Upload</p>
          </Stack>
          {selectedImage && (
            <div>
              <CardMedia
                component="img"
                sx={{ width: "346px", height: "173px", marginBottom: "10px" }}
                src={URL.createObjectURL(selectedImage)}
                alt="Live from space album cover"
              />
              <div class=" d-flex justify-content-center">
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={() => setSelectedImage(null)}
              >
                Remove
              </Button>
              </div>
            </div>
          )}
          <p className="recipeTitle"> Cooking Time (In Minutes)</p>
          <TextField
            className="bg-color"
            id="outlined-basic"
            label=" "
            variant="outlined"
            size="small"
            sx={{ width: "120px" }}
          />
          <p className="recipeTitle"> Note</p>
          <TextField
            className="bg-color"
            id="outlined-basic"
            label=" "
            variant="outlined"
            size="small"
            multiline
            minRows={"7"}
            sx={{ width: "346px", marginBottom: "20px" }}
          />
        </div>
      </Grid>
      <Grid className="setGridMargin" xs={4}>
        <div className="left">
          <p className="recipeTitle">Ingredients</p>
          <TableContainer>{tableData}</TableContainer>
        </div>
      </Grid>
      <Grid className="setGridMargin" xs={3.5}>
        <div className="left">
          <p className="recipeTitle"> Add Steps</p>
          <TextField
            className="bg-color"
            id="outlined-basic"
            label=" "
            variant="outlined"
            size="small"
            multiline
            minRows={"19"}
            sx={{ width: "346px", marginBottom: "20px" }}
          />
          <Button
            variant="contained"
            size="small"
            type="submit"
            sx={{ marginLeft: "190px" }}
          >
            Save Changes
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default UploadAndDisplayImage;
