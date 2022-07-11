import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/AuthContext";
import { GoogleButton } from "react-google-button";
import "./loginSignUpPage.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();

  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/home");
    } catch (err) {
      setError(error.message);
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
              <button id="switch" onClick={() => navigate("/register")}>
                Sign Up
              </button>
            </div>
          </div>
          <div id="login">
            <h1 id="title-l">Sign in to Quiz.io</h1>
            <form>
              <div>
                <input
                  placeholder="Email"
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  placeholder="Password"
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <button className="buttons" onClick={handleClick}>
                  Login
                </button>
                {error && <span>{error.message}</span>}
                <div>
                  <GoogleButton
                    className="g-btn"
                    type="dark"
                    onClick={handleGoogleSignIn}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
