import "./quiz.css";
import React, { useState } from "react";
import { useUserAuth } from "../../context/AuthContext";
import ReactTypingEffect from "react-typing-effect";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";

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
        text={[
          user
            ? "Namaste, " +
              user.displayName?.slice(0, 1).toUpperCase() +
              user.displayName?.slice(1, user.displayName?.length).toLowerCase()
            : "Namaste",
        ]}
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
      <div id="centerContent">
        <div id="homePageText">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type
          PageMaker including versions of Lorem Ipsum.
        </div>
        <div id="q-mainBody">
          <Button
            variant="contained"
            id="CreateQuizButton"
            onClick={() => navigate("/createQuiz")}
          >
            <AddBoxIcon
              style={{ position: "relative", right: "1rem", height: "28px" }}
            />
            Create Test
          </Button>

          <TextField
            id="joinquiztextfield"
            placeholder="Enter a code"
            onChange={handleChange}
          />

          <Button
            id="joinquizbutton"
            onClick={() => navigate("/joinQuiz/?id=" + id)}
          >
            Join
          </Button>
        </div>
      </div>
    </div>
  );
};
