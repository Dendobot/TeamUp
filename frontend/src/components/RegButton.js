import { render } from "@testing-library/react";
import React from "react";

export class RegButton extends React.Component {
  render() {
    return (
      <>
        <div className='sign-up-button mb-4' type="submit"> <h5> {this.props.text}</h5></div>
        
      </>
    );
  }
}