import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/AuthContext";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUp } = useUserAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setRegisterData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signUp(
        registerData.username,
        registerData.email,
        registerData.password
      );
      navigate("/");
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div id="outerCover">
        <div id="mainFrame">
          <div id="content">
            <h1 id="heading">Hi There!</h1>
            <div id="switchmode">
              <p>New to community? Click the button below</p>
              <button id="switch" onClick={() => navigate("/")}>
                Sign In
              </button>
            </div>
          </div>
          <div id="register">
            <h1 id="title-r">Create Account</h1>
            <form>
              <div>
                <input
                  placeholder="Username"
                  type="text"
                  id="username"
                  name="username"
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  placeholder="Email"
                  type="text"
                  id="email"
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  placeholder="Password"
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  placeholder="Confirm Password"
                  type="Password"
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={handleChange}
                />
              </div>
              <div>
                <button
                  disabled={loading}
                  className="buttons"
                  type="submit"
                  onClick={handleClick}
                >
                  Sign Up
                </button>
                {error && <span>{error.message}</span>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
