import React, {useState } from "react";
import { CardMedia, Stack, IconButton, Button } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";

const ImageUploadPreviewComponent = () => {
  const [file, setFile] = useState([]);

  function uploadMultipleFiles(e) {
    let ImagesArray = Object.entries(e.target.files).map((e) =>
      URL.createObjectURL(e[1])
    );
    console.log(ImagesArray);
    setFile([...file, ...ImagesArray]);
    console.log("file", file);
  }

  function uploadFiles(e) {
    e.preventDefault();
    console.log(file);
  }

  function deleteFile(e) {
    const s = file.filter((item, index) => index !== e);
    setFile(s);
    console.log(s);
  }

  return (
    <form>
      <div className="form-group preview">
        {file.length > 0 &&
          file.map((item, index) => {
            return (
              <div key={item}>
                <CardMedia
                  component="img"
                  sx={{ width: "346px", height: "173px", marginBottom: "10px" }}
                  src={item}
                  alt=""
                />
                <div class=" d-flex justify-content-center">
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteFile(index)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            );
          })}
      </div>
      <Stack direction="row" alignItems="center" spacing={2}>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <input
            hidden
            type="file"
            accept="image/*"
            disabled={file.length === 5}
            className="form-control"
            onChange={uploadMultipleFiles}
            multiple
          />

          <PhotoCamera />
        </IconButton>
        <p>Click Icon to Upload</p>
      </Stack>
      <button
        type="button"
        className="btn btn-primary btn-block"
        onClick={uploadFiles}
      >
        Upload
      </button>
    </form>
  );
};
export default ImageUploadPreviewComponent;
