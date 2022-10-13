import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Landing, About, SignIn, Footer, SignUp, AddRecipe, MyRecipes,ViewRecipe } from "./components";
import RequiredAuth from "./components/RequiredAuth";


function App () {
  
  return (
    <div className= "App">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/landingPage" element={<Landing />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>

          
          {/*protected routes*/}
          <Route element={<RequiredAuth />} >
            <Route path="/myRecipes" element={<MyRecipes />}></Route>
            <Route path="/addRecipe" element={<AddRecipe />}></Route>
            <Route path="/viewRecipe:id" element={<ViewRecipe />}></Route>
          </Route>

          {/*catch all*/}
          <Route path="*" element={<Landing />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
