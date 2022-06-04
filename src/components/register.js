import React, { useState } from "react";

const Register = (props) => {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      registerData.username &&
      registerData.email &&
      registerData.password === registerData.confirmPassword
    ) {
      props.routeChange();
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
            required={true}
            value={registerData.username}
            name="username"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            placeholder="Email"
            type="text"
            id="email"
            required={true}
            value={registerData.email}
            name="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            placeholder="Password"
            type="password"
            id="password"
            required={true}
            value={registerData.password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            placeholder="Confirm Password"
            type="Password"
            id="confirmPassword"
            required={true}
            value={registerData.confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
