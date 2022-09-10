import React from "react";
import {RegButton} from "../components/RegButton"
import { TextField } from "@mui/material";


function SignIn() {
  return (
      <div >
        <img className= "topLightimg" src={`https://file.rendit.io/n/PKdbhv0kawz00MsuG3et.png`}alt="sign in page"/>
        <section class="vh-90">
      <div className="row d-flex justify-content-center align-items-center h-90">
        <div className="col-lg-12 col-xl-11">
          <div className=" text-black" >
            <div className="card-body p-md-5">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <h1 className="signUpText mb-5 mx-1 mt-4">Sign in</h1>
  
                  <form className="mx-1 mx-md-4">
  
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <TextField className = "secondarColor" fullWidth id="outlined-basic" label = "Name" variant="outlined" size = "normal"/>
                      </div>
                    </div>
  
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                      <TextField className = "secondarColor" fullWidth id="outlined-basic" label = "Password" variant="outlined" size = "normal"/>
                      </div>
                    </div>

                    <div class=" d-flex justify-content-center">
                    <RegButton text = 'Sign in' button_type = 'sign-up-button mb-4'/>
                    </div>
  
                  </form>
    
                </div>
              </div>
            </div>
          </div>
        </div>
      
    </div>
  </section>
    <div class="form-check d-flex justify-content-center mb-5">
                        <label class="form-check-label" for="form2Example3">
                        Don't have an account?  <a class = "underline" href="../signup">Sign up here</a>
                        </label>
                      </div>
  <img className= "tableimg" src={` https://file.rendit.io/n/a6hHW4KrHfZkHmZFUWbX.png`}alt="sign in page"/>
      </div>
    );
}

export default SignIn;