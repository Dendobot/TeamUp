import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import React from 'react';
import axios from "../api/axios";
import { useEffect, useState } from "react";
//if user is logged in, render the children
//if user is not logged in, goto the signin route
const RequiredAuth = () => {


  const { auth, setAuth } = useAuth();
  const [user, setUser] = useState(true);

  const getUser = async () => {
    try {
      const response = await axios.get('/users/refresh', {
        withCredentials: true,
      });
      if (response?.data?.user) {
        setAuth({ user: response.data.user, pwd: "", email: "", accessToken: response.data.accessToken });
        console.log("found user with refresh token");
        setUser(response?.data?.user);
      }
      else {
        console.log("found user with refresh token");

      }
    } catch (err) {
      console.log("no found user with refresh token");
      setAuth({});
      setUser(null);
    }
  };

  useEffect(() => {
    if (!auth.user) {
      getUser();
    }
  }, []);

  const location = useLocation();

  if (user) {
    return <Outlet />;
  }
  else {
    return <Navigate to='/signin' state={{ from: location }} replace />;
  }

};

export default RequiredAuth;