import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import React from 'react';

//if user is logged in, render the children
//if user is not logged in, goto the signin route
const RequiredAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();


  return (
    auth?.user
      ? <Outlet />
      : <Navigate to='/signin' state={{ from: location }} replace />
  );
};

export default RequiredAuth;