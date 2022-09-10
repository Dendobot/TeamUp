import { render } from "@testing-library/react";
import React from "react";

export class RegButton extends React.Component {
  render() {
    return (
      <>
        <div className={this.props.button_type} type="submit"> <h5> {this.props.text}</h5></div>
        
      </>
    );
  }
}