import "./quiz.css";
import React, { useState } from "react";
import { useUserAuth } from "../../context/AuthContext";
import ReactTypingEffect from "react-typing-effect";
import { useNavigate } from "react-router-dom";
import { fontFamily } from "@mui/system";

export const Quiz = () => {
  const { user } = useUserAuth();

  const navigate = useNavigate();
  const [id, setId] = useState();

  const handleChange = (e) => {
    setId(e.target.value);
  };

  return (
<<<<<<< Updated upstream
    <div className="body">
      <ReactTypingEffect
        className="typing"
        text={["Namaste, " + user.displayName]}
        cursorRenderer={(cursor) => <h1>{cursor}</h1>}
        speed={100}
        eraseSpeed={100}
        displayTextRenderer={(text, i) => {
          return (
            <h1>
              {text
                .split(" ")
                .filter((char, i) => {
                  return i < 2;
                })
                .map((char, i) => {
                  const key = `${i}`;
                  return (
                    <span
                      key={key}
                      className={i === 0 ? "namaste" : ""}
                      style={
                        i === 0
                          ? {
                              fontFamily: "Dancing Script",
                            }
                          : { fontFamily: "Dancing Script" }
                      }
                    >
                      {char + " "}
                    </span>
                  );
                })}
            </h1>
          );
        }}
=======
    <>
      <TypeAnimation
        cursor={true}
        sequence={["namaste" + user.displayName]}
        wrapper="h2"
>>>>>>> Stashed changes
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
    </div>
  );
};
