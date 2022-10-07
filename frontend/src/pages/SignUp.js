import React, { useState } from "react";
import {
  TextField,
  IconButton,
  Button,
  Snackbar,
  AlertTitle,
  InputAdornment,
} from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import EmailIcon from "@mui/icons-material/Email";
import Navigation from "../components/Navigation";
import { useFormik } from "formik";
import * as yup from "yup";

//for backEnd
import axios from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Alert from "@mui/material/Alert";

const REGISTER_URL = "/users/register";

const validationSchema = yup.object({
  name: yup.string("Enter your name").required("Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .matches(/([A-Z])/, "Must contain one Uppercase character")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is Required"),
});

function SignUp() {
  //redirecting to login if successfully registered
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const [open, setOpen] = useState(true);
  const handleClose = (event = React.SyntheticEvent | Event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      success: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      //axios to back end
      try {
        const response = await axios.post(
          REGISTER_URL,
          JSON.stringify({
            user: values.name,
            pwd: values.password,
            email: values.email,
          }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        formik.errors.success = "Signed up successfully!";
        setTimeout(() => {
          formik.errors.success = "";
          console.log(response?.data);
          console.log(response?.accessToken);
          console.log(JSON.stringify(response));
          navigate("/signin");
        }, 2000);
      } catch (err) {
        if (!err?.response) {
          formik.errors.confirmPassword = "No Server Response";
        } else if (err.response?.status === 409) {
          formik.errors.email = "This email is registered";
        } else if (err.response?.status === 444) {
          formik.errors.name = "This username is registered";
        } else {
          formik.errors.confirmPassword = "Registration Failed";
        }
      }
      //axios to back end
      console.log("you clicked the submit button");
      console.log("name = ", values.name);
      console.log("email = ", values.email);
      console.log("pwd = ", values.password);
      //alert(JSON.stringify(values));
    },
  });

  return (
    <div>
      <img
        className="top-lightimg "
        src={`https://file.rendit.io/n/PKdbhv0kawz00MsuG3et.png`}
        alt="sign up page"
      />
      <Navigation />
      <section class="vh-90">
        <div className="row d-flex justify-content-center align-items-center h-90">
          <div className="col-lg-12 col-xl-11">
            <div className="card-body p-md-5">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <h1 className="sign-up-text mb-5 mx-1 mt-4">Sign up</h1>

                  <form className="mx-1 mx-md-4" onSubmit={formik.handleSubmit}>
                    <span className="d-flex flex-column  mb-4">
                      <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Name"
                        className="secondary-color"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.name && Boolean(formik.errors.name)
                        }
                        // helperText={formik.touched.name && formik.errors.name}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FaceIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                      {Boolean(formik.errors.name) && formik.touched.name && (
                        <Alert severity="error" sx={{ marginTop: 2 }}>
                          {formik.errors.name}
                        </Alert>
                      )}
                    </span>
                    <span className="d-flex flex-column  mb-4">
                      <TextField
                        fullWidth
                        id="email"
                        label="Email"
                        className="secondary-color"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                      {Boolean(formik.errors.email) && formik.touched.email && (
                        <Alert severity="error" sx={{ marginTop: 2 }}>
                          {formik.errors.email}
                        </Alert>
                      )}
                    </span>
                    <span className="d-flex flex-column  mb-4">
                      <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        className="secondary-color"
                        type={showPassword ? "text" : "password"}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.password &&
                          Boolean(formik.errors.password)
                        }
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
                      />
                      {Boolean(formik.errors.password) &&
                        formik.touched.password && (
                          <Alert severity="error" sx={{ marginTop: 2 }}>
                            {formik.errors.password}
                          </Alert>
                        )}
                    </span>
                    <span className="d-flex flex-column  mb-4">
                      <TextField
                        fullWidth
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm password"
                        className="secondary-color"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.confirmPassword &&
                          Boolean(formik.errors.confirmPassword)
                        }
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfirmPassword}
                              >
                                {showConfirmPassword ? (
                                  <VisibilityIcon />
                                ) : (
                                  <VisibilityOffIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      {Boolean(formik.errors.confirmPassword) &&
                        formik.touched.confirmPassword && (
                          <Alert severity="error">
                            {formik.errors.confirmPassword}
                          </Alert>
                        )}
                      {Boolean(formik.errors.success) && (
                        <Snackbar
                          open={open}
                          autoHideDuration={2000}
                          onClose={handleClose}
                        >
                          <Alert
                            severity="success"
                            sx={{ marginTop: 2, width: 300 }}
                          >
                            <AlertTitle> Success </AlertTitle>
                            {formik.errors.success}
                          </Alert>
                        </Snackbar>
                      )}
                    </span>
                    <div class=" d-flex justify-content-center">
                      <Button variant="contained" size="large" type="submit">
                        Sign up
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <img
        className="tableimg"
        src={` https://file.rendit.io/n/a6hHW4KrHfZkHmZFUWbX.png`}
        alt="sign in page"
      />
      <div class="form-check d-flex justify-content-center mb-4">
        <label class="form-check-label" for="form2Example3">
          Already have an account?
          <Link className="underline" to="/signIn">
            {" "}
            Sign In
          </Link>
        </label>
      </div>
    </div>
  );
}

export default SignUp;
