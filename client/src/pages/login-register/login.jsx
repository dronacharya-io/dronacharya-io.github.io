import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./loginSignUpPage.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
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
                  placeholder="Username"
                  type="text"
                  id="username"
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  placeholder="Password"
                  type="password"
                  id="password"
                  onChange={handleChange}
                />
              </div>
              <div>
                <button disabled={loading} onClick={handleClick}>
                  Login
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

export default Login;
