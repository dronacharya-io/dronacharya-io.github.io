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
import animationData from "../../lotties/study-online";
import secondAnimationData from "../../lotties/Designerboyready";
import thirdAnimationData from "../../lotties/67928-studyly";
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

  const welcome = {
    loop:true,
    autoplay:true,
    animationData: secondAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const tAnimationData = {
    loop:true,
    autoplay:true,
    animationData: thirdAnimationData,
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
            <div className="home-page-sanskrit-shloka-div" >
              <h2 className="home-page-sanskrit-shloka" >
                  "गुरुर्ब्रह्मा ग्रुरुर्विष्णुः गुरुर्देवो महेश्वरः। <br/>
                  गुरुः साक्षात् परं ब्रह्म तस्मै श्री गुरवे नमः।।"
              </h2>
            </div>
            <h3 className="home-page-sanskrit-shloka-hindi">
              "गुरु ब्रह्मा है, गुरु विष्णु है, और गुरु ही भगवान शंकर है। गुरु हि साक्षात् परब्रह्म है, उन सद्गुरु को प्रणाम करता हूँ।"
            </h3>
            <br/>
            <br/>
          </div>
          <div id="quiz-buttons">
          <Button
              variant="outlined"
              className="CreateQuizButton"
              onClick={() => navigate("/exploreCourses")}
            >

              Explore Courses
            </Button>
            <Button
              variant="outlined"
              className="CreateQuizButton"
              onClick={() => navigate("/createQuiz")}
            >

              Create Quiz
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
                Join Quiz
              </Button>

            </div>

   
          </div>


        </div>
      </div>
          <div className="quiz-animation-motion-parent-div">
            <motion.div 
              id="quiz-animation-motion-div-id"
              className="quiz-animation-motion-div"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01]
              }}
            > 
              <div className='quiz-animation-img-one' >
                <Lottie   isClickToPauseDisabled={true}  options={welcome}  />
              </div>


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
