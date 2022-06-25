import "./loginSignUpPage.css";
import React, { useState } from "react";
import Login from "../components/login";
import Register from "../components/register";
import { useNavigate } from "react-router-dom";

export const Loginpage = (props) => {
  const [toggle, setToggle] = useState(true);

  let navigate = useNavigate();

  const routeChange = () => {
    const path = "/home";
    navigate(path);
  };

  const Switch = () => {
    setToggle(!toggle);
    if (toggle) {
      document.getElementById("heading").innerHTML = "Hi There!";
      document.getElementById("switch").innerHTML = "Sign In";
    } else {
      document.getElementById("heading").innerHTML = "Welcome Back!";
      document.getElementById("switch").innerHTML = "Sign Up";
    }
  };

  return (
    <>
      <div id="outerCover">
        <div id="mainFrame">
          <div id="content">
            <h1 id="heading">Welcome Back!</h1>
            <div id="switchmode">
              <p>New to community? Click the button below</p>
              <button id="switch" onClick={() => Switch()}>
                Sign Up
              </button>
            </div>
          </div>
          {toggle && <Login routeChange={routeChange} />}
          {!toggle && <Register routeChange={routeChange} />}
        </div>
      </div>
    </>
  );
};

