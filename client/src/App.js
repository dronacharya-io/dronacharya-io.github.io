import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loginpage } from "./pages/loginSignUpPage";
import { Home } from "./pages/home.js";
import { useState } from "react";

function App() {
  return (
    <div className="App">
      <div id="body">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Loginpage />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
