import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = (props) => {
  const [loginData, setLoginData] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginData({ ...loginData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loginData.username && loginData.password) {
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axios.post("/", loginData);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      }
      props.routeChange();
    } else {
      alert("fill all values");
    }
  };

  return (
    <div id="login">
      <h1 id="title-l">Sign in to Quiz.io</h1>
      <form>
        <div>
          <input
            placeholder="Username"
            type="text"
            id="username"
            required={true}
            name="username"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            placeholder="Password"
            type="password"
            id="password"
            required={true}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <button disabled={loading} type="submit" onClick={handleSubmit}>
            Login
          </button>
          {error && <span>{error.message}</span>}
        </div>
      </form>
    </div>
  );
};

export default Login;
