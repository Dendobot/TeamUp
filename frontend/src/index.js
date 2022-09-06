import React from "react";
import ReactDOM from "react-dom";
import "./styleSheet.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Home,
  About,
  SignIn
} from "./components";


ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/home" element={<Home />} > </Route>
      <Route path="/about" element={<About />} > </Route>
      <Route path="/signin" element={<SignIn />} > </Route>
      
    </Routes>
  </Router>,

  document.getElementById("root")
);


