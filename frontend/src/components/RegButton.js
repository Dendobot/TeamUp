
import { Button } from "@mui/material";
import React from "react";

export class RegButton extends React.Component {
  render() {
    return (
      <>
        <Button variant="contained" size = "large"> {this.props.text} </Button>   
      </>
    );
  }
}