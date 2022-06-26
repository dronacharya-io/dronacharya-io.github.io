import React, { useState } from "react";

const Register = (props) => {
  const [registerData, setRegisterData] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
  });

  const handleChange = (e) => {
    setRegisterData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (
      registerData.username &&
      registerData.email &&
      registerData.password === registerData.confirmPassword
    ) {
      dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/register", JSON.stringify(registerData));
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/home");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
    } else {
      alert("fill all values");
    }
  };

  return (
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
          <button type="submit" onClick={handleClick}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
