import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import React from 'react';

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