import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Landing, About, SignIn, Footer, SignUp, AddRecipe, Recipes, ViewRecipe } from "./components";
import RequiredAuth from "./components/RequiredAuth";


function App () {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/landingPage" element={<Landing />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>

          <Route path="/addRecipe" element={<AddRecipe />}></Route>
          <Route path="/viewRecipe" element={<ViewRecipe />}></Route>

          {/*protected routes*/}
          <Route element={<RequiredAuth />} >
            <Route path="/Recipes" element={<Recipes />}></Route>
          </Route>

          {/*catch all*/}
          <Route path='*' element={<Landing />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
