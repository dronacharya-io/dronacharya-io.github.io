import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loginpage } from "./pages/loginSignUpPage";
import { Home } from "./pages/home.js";
import { useState } from "react";

function App() {
  const [user, setUser] = useState([]);

  const PullData = (data) => {
    setUser(data);
    console.log(user);
  };

  return (
    <div className="App">
      <div id="body">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Loginpage PullData={PullData} />} />
            <Route path="/home" element={<Home />} {...user} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
