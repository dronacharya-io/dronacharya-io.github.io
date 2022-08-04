import "./quiz.css";
import React, { useState } from "react";
import { useUserAuth } from "../../context/AuthContext";
import ReactTypingEffect from "react-typing-effect";
import { useNavigate } from "react-router-dom";

export const Quiz = () => {
  const { user } = useUserAuth();

  const navigate = useNavigate();
  const [id, setId] = useState();

  const handleChange = (e) => {
    setId(e.target.value);
  };

  return (
    <div className="body">
      <ReactTypingEffect
        className="typing"
        text={[user ? "Namaste, " + user.displayName : "Namaste"]}
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
