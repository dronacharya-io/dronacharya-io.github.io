import "./Desktop_Quiz.css";
import "./Quiz_Mobile.css";
import React, { useState } from "react";
import { useUserAuth } from "../../context/AuthContext";
import ReactTypingEffect from "react-typing-effect";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TextField from "@mui/material/TextField";
import Lottie from "react-lottie";
import animationData from "../../lotties/circle-animation.json";
import { styled } from "@mui/material/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import Earth from "../../components/ThreeJs Earth/Earth.jsx";
import { Canvas } from "@react-three/fiber"
import { Suspense } from 'react'

export const Quiz = (props) => {
  const { user } = useUserAuth();

  console.log(props.theme)
  const navigate = useNavigate();
  const [id, setId] = useState();

  const handleChange = (e) => {
    setId(e.target.value);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "#FF9800",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red",
      },
      "&:hover fieldset": {
        borderColor: "yellow",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#FF9800",
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "light" || "dark",
    },
  });

  return (
    <div className="bodyWithAnimation">
      <div className="quiz-content-div">
        <ReactTypingEffect
          className="typing"
          text={[
            user
              ? "Namaste, " +
                user.displayName?.slice(0, 1).toUpperCase() +
                user.displayName
                  ?.slice(1, user.displayName?.length)
                  .toLowerCase()
              : "Namaste, human",
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
            industry. borem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            PageMaker including versions of Lorem Ipsum.
          </div>
          <div id="quiz-buttons">
            <Button
              variant="outlined"
              className="CreateQuizButton"
              onClick={() => navigate("/createQuiz")}
            >

              Subject Notes
            </Button>
            <div className="quiz-textfield-joinbtn-parent-div" >
              <ThemeProvider theme={darkTheme}>
                <CssTextField
                  id="joinquiztextfeild"
                  placeholder="Paste a Test ID"
                  onChange={handleChange}
                  value={id}
                  InputLabel={{ className: "test" }}
                  label="Paste Test id here!"
                  focused
                />
              </ThemeProvider>

              <Button
                id="joinquizbutton"
                onClick={() => navigate("/joinQuiz/?id=" + id)}
              >
                Join
              </Button>
            </div>
          </div>
        </div>
      </div>
          <div className="quiz-animation-motion-parent-div">
            <motion.div 
              className="quiz-animation-motion-div"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01]
              }}
            >
                <Lottie isClickToPauseDisabled={true}  options={defaultOptions}  /> 
                
                {/* 
                  <Canvas >
                      <Suspense fallback={null}>
                        <Earth theme={props.theme} />
                      </Suspense>
                  </Canvas> */}
            </motion.div>
          </div>
    </div>
  );
};
