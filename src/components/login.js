import React, { useState } from "react";

const Login = () => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginData.username && loginData.password) {
      console.log(loginData);
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
            value={loginData.username}
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
            value={loginData.password}
            required={true}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
