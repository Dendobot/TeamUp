import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, About, SignIn, Footer , SignUp, AddRecipe} from "./components";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/landingPage" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/addRecipe" element={<AddRecipe />}></Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
