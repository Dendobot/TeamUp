import React, { useState } from "react";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import FaceIcon from "@mui/icons-material/Face";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Navigation from "../components/Navigation";
import { useFormik } from "formik";
import { Button, IconButton } from "@mui/material";

//backend
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
const LOGIN_URL = "/users/auth";

function SignIn() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          LOGIN_URL,
          JSON.stringify({ email: values.email, pwd: values.password }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(response?.data);
        const accessToken = response?.data?.accessToken;
        const user = response?.data?.user;
        console.log("User: " + user);
        alert("Logged In");
        setAuth({
          user: user,
          pwd: values.password,
          email: values.email,
          accessToken,
        });
        navigate(from, { replace: true });
      } catch (err) {
        console.log("error = ", err.response?.status);
        if (!err?.response) {
          formik.errors.password = "No Server Response";
        } else if (err.response?.status === 400) {
          formik.errors.password = "Missing Username or Password";
        } else if (err.response?.status === 401) {
          formik.errors.password = "Invalid username or Password";
        } else {
          formik.errors.password = "Login Failed";
        }
      }

      //axios to back end
      console.log("you clicked the submit button");
      console.log("email = ", values.email);
      console.log("pwd = ", values.password);
      //alert(JSON.stringify(values));
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="vh-100 overflow position-relative">
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
                      <span className="d-flex flex-column  mb-4">
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
                      </span>

                      <span className="d-flex flex-column  mb-4">
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
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                >
                                  {showPassword ? (
                                    <VisibilityIcon />
                                  ) : (
                                    <VisibilityOffIcon />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          variant="outlined"
                          size="normal"
                        />
                        {Boolean(formik.errors.password) &&
                          formik.touched.password && (
                            <div style={{ color: "#d32f2f" }}>
                              {formik.errors.password}
                            </div>
                          )}
                      </span>
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
          <Link className="underline" to="/signup">
            Sign Up
          </Link>
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

export default SignIn;
