import "./quiz.css";
import React, { useState } from "react";
import { useUserAuth } from "../../context/AuthContext";
import TypeAnimation from "react-type-animation";
import { useNavigate } from "react-router-dom";

export const Quiz = () => {
  const { user } = useUserAuth();

  const navigate = useNavigate();
  const [id, setId] = useState();

  const handleChange = (e) => {
    setId(e.target.value);
  };

  return (
    <>
      <TypeAnimation
        cursor={true}
        sequence={["namaste" + user.displayName]}
        wrapper="h2"
      />
      <div id="q-mainBody">
        <button className="Quiz" onClick={() => navigate("/createQuiz")}>
          Create a Quiz
        </button>
        <div>
          <input placeholder="quiz id" onChange={handleChange} />
          <button onClick={() => navigate("/joinQuiz/?id=" + id)}>
            submit
          </button>
        </div>
      </div>
    </>
  );
};
