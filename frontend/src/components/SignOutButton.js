import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axios from '../api/axios';
import { Button } from "@mui/material";

const LOGOUT_URL = 'users/logout';

const SignOutButton = () => {
  const { setAuth } = useContext(AuthContext);

  const navigate = useNavigate();



  const logout = async () => {
    // if used in more components, this should be in context 
    // axios to /logout endpoint 

    try { (navigate('/signIn')); }
    catch (err) { return; }
    console.log("logging out");
    try {
      const response = await axios.get(LOGOUT_URL, { withCredentials: true });
      if (response) {
        console.log("logged out");
      } else {
        console.log("No Server Response");
      }
    } catch (err) {
      if (!err?.response) {
        console.log("No Server Response");
      }
    }

    setAuth({});

  };

  return (
    <Button variant="outlined" size="large" type="submit" onClick={logout}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;