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
    <>
      <ReactTypingEffect
        text={["Namaste, " + user.displayName]}
        cursorRenderer={(cursor) => <h1>{cursor}</h1>}
        speed={50}
        eraseSpeed={50}
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
                      style={
                        i === 0
                          ? {
                              color: "black",
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
    </>
  );
};
