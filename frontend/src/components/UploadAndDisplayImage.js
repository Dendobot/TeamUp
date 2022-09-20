import React, { useState } from "react";

const UploadAndDisplayImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div class="row">

    <div class="col-sm">
    
         <input
        className="uploade-photo"
        type="file"
        name="myImage"
        onChange={(event) => {
          setSelectedImage(event.target.files[0]);
        }}
      />
      {selectedImage && (
        <div>
        <br />
        <div onClick={()=>setSelectedImage(null)} className="uploade-photo">Remove</div>
        <br /><br /> 
        <img className="photo-box" alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage) } />
        </div>
      )}
     <p className="addRecHeadings"> Note</p>
      </div>
      <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div>
     
    </div>
  );
};

export default UploadAndDisplayImage;