
import React from "react";
import {RegButton} from "../components/RegButton"

function SignUp() {
  return (
    <div>
      <img className= "topLightimg" src={`https://file.rendit.io/n/PKdbhv0kawz00MsuG3et.png`}alt="sign up page"/>
      <section class="vh-90">
    <div className="row d-flex justify-content-center align-items-center h-90">
      <div className="col-lg-12 col-xl-11">
        <div className=" text-black" >
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <h1 className="signUpText mb-5 mx-1 mt-4">Sign up</h1>

                <form className="mx-1 mx-md-4">

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <label className="form-label" for="form3Example1c">Name</label>
                      <input type="email" id="form3Example2c" className="form-control secondarColor" />
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <label className="form-label" for="form3Example1c">Email</label>
                      <input type="email" id="form3Example2c" className="form-control secondarColor" />
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <label className="form-label" for="form3Example4c">Password</label>
                      <input type="password" id="form3Example3c" className="form-control secondarColor" />
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <label className="form-label" for="form3Example4cd">Repeat your password</label>
                      <input type="password" id="form3Example3cd" className="form-control secondarColor" />
                    </div>
                  </div>
                  <div class=" d-flex justify-content-center">
                  <RegButton text = 'Sign up'/>
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
                      Already have an account?  <a class = "underline" href="../signin">Log in here</a>
                      </label>
                    </div>
<img className= "tableimg" src={` https://file.rendit.io/n/a6hHW4KrHfZkHmZFUWbX.png`}alt="sign up page"/>
    </div>
  );
}

export default SignUp;