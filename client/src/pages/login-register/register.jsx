import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setRegisterData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (
      registerData.username &&
      registerData.email &&
      registerData.password === registerData.confirmPassword
    ) {
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axios.post("/auth/register", registerData);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/");
      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      }
    } else {
      alert("fill all values");
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
              <button id="switch" onClick={() => navigate("/login")}>
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
