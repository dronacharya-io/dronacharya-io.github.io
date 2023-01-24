import "./Desktop_Quiz.css";
import "./Quiz_Mobile copy.css";
import React, { useState } from "react";
import { useUserAuth } from "../../context/AuthContext";
import ReactTypingEffect from "react-typing-effect";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TextField from "@mui/material/TextField";
import Lottie from "react-lottie";
import animationData from "../../lotties/18123-developer";
import secondAnimationData from "../../lotties/Designerboyready";
import thirdAnimationData from "../../lotties/67928-studyly";
import { styled } from "@mui/material/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import Earth from "../../components/ThreeJs Earth/Earth.jsx";
import { Canvas } from "@react-three/fiber"
import { Suspense } from 'react'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import PostAddIcon from '@mui/icons-material/PostAdd';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { My_Quizzes } from "../../components/NewCards/Home_My_Quiz_Card/My_Quizzes";
import * as MyQuizAnimation from "../../lotties/Quizzes/My quizzes lotties/index.js";
import Books from "../../lotties/Quizzes/3d illustrators/pencil-case.png";
import quizimg from "../../lotties/Quizzes/3d illustrators/faq-file.png";
import earthimg from "../../lotties/Quizzes/3d illustrators/earth.png";
import cam from "../../lotties/Quizzes/3d illustrators/crypto-camera.png";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';

export const Quiz = (props) => {
  const { user } = useUserAuth();
  console.log(props.theme)
  const navigate = useNavigate();
  const [id, setId] = useState();
  var {one , two} = MyQuizAnimation;
  const handleChange = (e) => {
    setId(e.target.value);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: one,
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
    <div className="quiz-main-container" >
      <div className="quiz-second-contaier" >
          <div className="quiz-second-containers-first-div" >
            <ReactTypingEffect
              className="quiz-second-containers-first-div-typing-effect"
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
                            id="span"
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
          </div>
      </div>
      <div className="quiz-third-container" >
        <div className="quiz-third-containers-first-div" >
            <div className="quiz-main-materials-div" >
              <div className="quiz-main-materials-div-child first-child" >
                <AttachFileIcon className="quiz-main-materials-div-child-icons quiz-icon-one" />
              </div>
              <p className="quiz-main-materials-divs-desc" >Materials</p>
            </div>
            <div className="quiz-main-materials-div " >
              <div className="quiz-main-materials-div-child  second-child" >
                <TextSnippetIcon  className="quiz-main-materials-div-child-icons" />
              </div>
              <p className="quiz-main-materials-divs-desc" >Assignments</p>
            </div>
            <div className="quiz-main-materials-div" >
              <div className="quiz-main-materials-div-child third-child " >
                <PostAddIcon  className="quiz-main-materials-div-child-icons" />
              </div>
              <p className="quiz-main-materials-divs-desc" >Quizzes</p>
            </div>
            <div className="quiz-main-materials-div" >
              <div className="quiz-main-materials-div-child  fourth-child " >
                <TouchAppIcon  className="quiz-main-materials-div-child-icons" />
              </div>
              <p className="quiz-main-materials-divs-desc" >Time table</p>
            </div>
          </div>
        </div>
        <div className="quiz-fourth-container grandparent " >
          <div className="quiz-fourth-contaners-first-div" >
            <div className="quiz-fourth-contaners-first-div-child-div-heading" >
              <h2 className="quiz-fourth-contaners-first-div-child-div-heading-h2" >My Quizzes</h2>
            </div>
            <div className="quiz-fourth-contaners-first-div-child-div-view-more" >
              <div className="quiz-fourth-contaners-first-div-child-div-view-more-h4-div" >
                <h4 className="quiz-fourth-contaners-first-div-child-div-view-more-h4" >View All</h4>
              </div>
              <div className="quiz-fourth-contaners-first-div-child-div-view-more-icon-div" >
                <ArrowForwardIosIcon sx={{width:"15px"}} />
              </div>
            </div>
          </div>
            <div className="parent" >
              <div className="quiz-fourth-contaners-second-div" >
                <My_Quizzes image={defaultOptions} title={"Quiz Name"} subject={"Subject"}/>
                <My_Quizzes image={defaultOptions} title={"Quiz Name"} subject={"Subject"}/>
              </div>
            </div>
        </div>
        <div className="quiz-fifth-container quiz-fifth-containers-one" >
            <div onClick={() => navigate("/createQuiz")} className="quiz-fifth-container-first-div" >
              <div className="quiz-fifth-container-first-div-icon" >
                <AddBoxIcon />
              </div>
              <div className="quiz-fifth-container-first-div-h4" >
                <h4>level 1</h4>
              </div>
              <div className="quiz-fifth-container-first-div-h2" >
                <h2>Create Quiz</h2>
              </div>
            </div>
            <div>
              <img className="quiz-image" src={Books} />
            </div>
        </div>
        <div className="quiz-fifth-container quiz-fifth-containers-two">
          <div className="quiz-fifth-container-first-div" >
              <div className="quiz-fifth-container-first-div-icon" >
                <CreateOutlinedIcon />
              </div>
              <div className="quiz-fifth-container-first-div-h4" >
                <h4>level 2</h4>
              </div>
              <div className="quiz-fifth-container-first-div-h2" >
                <h2>Join Quiz</h2>
              </div>
            </div>
            <div>
              <img className="quiz-image" src={quizimg} />
            </div>
        </div>
        <div onClick={() => navigate("/exploreCourses")} className="quiz-fifth-container quiz-fifth-containers-three">
            <div className="quiz-fifth-container-first-div" >
              <div className="quiz-fifth-container-first-div-icon" >
                <TravelExploreOutlinedIcon />
              </div>
              <div className="quiz-fifth-container-first-div-h4" >
                <h4>level 3</h4>
              </div>
              <div className="quiz-fifth-container-first-div-h2 third-h2-quiz" >
                <h2>Explore Courses</h2>
              </div>
            </div>
            <div>
              <img className="quiz-image image-three-quiz" src={earthimg} />
            </div>
        </div>
    </div>
  );
};


// <div className="bodyWithAnimation">
//       <div className="quiz-content-div">
//         <ReactTypingEffect
//           className="typing"
//           text={[
//             user
//               ? "Namaste, " +
//                 user.displayName?.slice(0, 1).toUpperCase() +
//                 user.displayName
//                   ?.slice(1, user.displayName?.length)
//                   .toLowerCase()
//               : "Namaste, human",
//           ]}
//           cursorRenderer={(cursor) => <h1>{cursor}</h1>}
//           speed={100}
//           eraseSpeed={100}
//           displayTextRenderer={(text, i) => {
//             return (
//               <h1>
//                 {text
//                   .split(" ")
//                   .filter((char, i) => {
//                     return i < 2;
//                   })
//                   .map((char, i) => {
//                     const key = `${i}`;
//                     return (
//                       <span
//                         key={key}
//                         className={i === 0 ? "namaste" : ""}
//                         style={
//                           i === 0
//                             ? {
//                                 fontFamily: "Dancing Script",
//                               }
//                             : { fontFamily: "Dancing Script" }
//                         }
//                       >
//                         {char + " "}
//                       </span>
//                     );
//                   })}
//               </h1>
//             );
//           }}
//         />
//         <div id="centerContent">
//           <div id="homePageText">
            
//             <br/>
//             <br/>
//           </div>
//           <div id="quiz-buttons">
//           <Button
//               variant="outlined"
//               className="CreateQuizButton"
//               onClick={() => navigate("/exploreCourses")}
//             >

//               Explore Courses
//             </Button>
//             <Button
//               variant="outlined"
//               className="CreateQuizButton"
//               onClick={() => navigate("/createQuiz")}
//             >

//               Create Quiz
//             </Button>
 
//             <div className="quiz-textfield-joinbtn-parent-div" >
//               <ThemeProvider theme={darkTheme}>
//                 <CssTextField
//                   id="joinquiztextfeild"
//                   placeholder="Paste a Test ID"
//                   onChange={handleChange}
//                   value={id}
//                   InputLabel={{ className: "test" }}
//                   label="Paste Test id here!"
//                   focused
//                 />
//               </ThemeProvider>

//               <Button
//                 id="joinquizbutton"
//                 onClick={() => navigate("/joinQuiz/?id=" + id)}
//               >
//                 Join Quiz
//               </Button>

//             </div>

   
//           </div>


//         </div>
//       </div>
//           <div className="quiz-animation-motion-parent-div">
//             <motion.div 
//               id="quiz-animation-motion-div-id"
//               className="quiz-animation-motion-div"
//               initial={{ opacity: 0, scale: 0.5 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{
//                 duration: 0.8,
//                 delay: 0.5,
//                 ease: [0, 0.71, 0.2, 1.01]
//               }}
//             > 
//               <div className='quiz-animation-img-one' >
//                 <Lottie   isClickToPauseDisabled={true}  options={welcome}  />
//               </div>


//                 {/* 
//                   <Canvas >
//                       <Suspense fallback={null}>
//                         <Earth theme={props.theme} />
//                       </Suspense>
//                   </Canvas> */}
//             </motion.div>
//           </div>
//     </div>