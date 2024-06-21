
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from "./Home.js";
import AddRecipe from "./AddRecipe.js"
import Recipe from "./Recipe.js"
import Navbar from "./Navbar.js"

function App() {

  
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        
          <Route index element={<Home />}/>
          <Route path="/addrecipe" element={<AddRecipe />}/>
          <Route path="/recipe/:slug" element={<Recipe />}/>
         
        

      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
