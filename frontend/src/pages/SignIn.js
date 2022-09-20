import React, { useState } from "react";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import FaceIcon from "@mui/icons-material/Face";
import LockIcon from "@mui/icons-material/Lock";
import Navigation from "../components/Navigation";
import { useFormik } from "formik";
import { Button } from "@mui/material";

function SignUp() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      //axios to back end
      console.log("you clicked the submit button");
      console.log("email = ", values.email);
      console.log("pwd = ", values.password);
      //alert(JSON.stringify(values));
    },
  });

  const [showPassword, setShowPassword] = useState(false);


  return (
    <div>
      <img
        className="top-lightimg "
        src={`https://file.rendit.io/n/PKdbhv0kawz00MsuG3et.png`}
        alt="sign in page"
      />
      <Navigation />

      <section class="vh-90">
        <div className="row d-flex justify-content-center align-items-center h-90">
          <div className="col-lg-12 col-xl-11">
            <div className=" text-black">
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <h1 className="sign-up-text mb-5 mx-1 mt-4">Sign in</h1>
                    <form
                      className="mx-1 mx-md-4"
                      onSubmit={formik.handleSubmit}
                    >
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <TextField
                            className="secondary-color"
                            fullWidth
                            label="Email"
                            id="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <FaceIcon />
                                </InputAdornment>
                              ),
                            }}
                            variant="outlined"
                            size="normal"
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <TextField
                            className="secondary-color"
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                              <LockIcon />
                                </InputAdornment>
                              ),
                            }}
                            variant="outlined"
                            size="normal"
                          />
                        </div>
                      </div>
                      <div class=" d-flex justify-content-center">
                        <Button variant="contained" size="large" type="submit">
                          Sign in
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="form-check d-flex justify-content-center mb-4">
        <label class="form-check-label" for="form2Example3">
          Don't have an account?
          <a class="underline" href="../signup">
            Sign up here
          </a>
        </label>
      </div>
      <img
        className="tableimg"
        src={` https://file.rendit.io/n/a6hHW4KrHfZkHmZFUWbX.png`}
        alt="sign in page"
      />
    </div>
  );
}

export default SignUp;
