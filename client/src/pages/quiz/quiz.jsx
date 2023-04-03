import "./Desktop_Quiz.css";
import "./Quiz_Mobile copy.css";
import React, { useState, useEffect, useRef } from "react";
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
import Books from "../../lotties/Quizzes/3d illustrators/pencil-case.png";
import quizimg from "../../lotties/Quizzes/3d illustrators/create-file.png";
import earthimg from "../../lotties/Quizzes/3d illustrators/earth.png";
import cam from "../../lotties/Quizzes/3d illustrators/crypto-camera.png";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

export const Quiz = (props) => {
  var { user, x, setX } = useUserAuth();
  console.log(props.theme)
  var [loading, setLoading] = useState(false);
  var submissionsData = user?.userData?.quizzesCreated;
  const navigate = useNavigate();
  const [id, setId] = useState();
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const handleChange = (e) => {
    setId(e.target.value);
  };

  const Fetch = async()=>{
      try {
        submissionsData = user?.userData?.quizzesCreated;
      } catch (err) {
        // setData(err);
      }
      setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    Fetch();
  }, [x]);
  



  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData:animationData,
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
    <>

    { windowSize.current[0] > 425 ? (
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
          
              </h2>
            </div>
            <h3 className="home-page-welcome-qoute">
              Welcome to <span id="home-page-welcome-qoute-span" >dronacharya.co</span>, where knowledge and test-taking go hand in hand! 
              Our platform is designed to enhance your learning experience by offering subject 
              notes and quizzes that recap what's been taught in College . We believe 
              that an interactive learning experience is key to retaining knowledge, and our 
              quizzes provide just that. We're dedicated to making education accessible and 
              empowering students to achieve their full potential. Although we're still in the testing phase and resources are limited to first-year students, we're working to expand and improve our offerings.
            </h3>
            <br/>
            <br/>
            <div className="quiz-third-container" >
        </div>
        <div className="quiz-third-containers-first-div" >
            <div className="quiz-main-materials-div" onClick={() => navigate("/exploreCourses")} >
              <div className="quiz-main-materials-div-child first-child" >
                <AttachFileIcon className="quiz-main-materials-div-child-icons quiz-icon-one" />
              </div>
              <p className="quiz-main-materials-divs-desc" >Notes</p>
            </div>
            <div className="quiz-main-materials-div " onClick={() => navigate("/videoLectures")} >
              <div className="quiz-main-materials-div-child  second-child" >
                <VideoLibraryIcon  className="quiz-main-materials-div-child-icons" />
              </div>
              <p className="quiz-main-materials-divs-desc" >Lectures</p>
            </div>
            <div className="quiz-main-materials-div"   >
             <div className="quiz-coming-soon-div" >
                <p className="quiz-coming-soon-desc"  >coming soon</p>
              </div>
              <div className="quiz-main-materials-div-child third-child " >
                <PostAddIcon  className="quiz-main-materials-div-child-icons" />
              </div>
              <p className="quiz-main-materials-divs-desc" style={{color:"gray"}} >Tutorial's</p>
            </div>
            <div className="quiz-main-materials-div" onClick={() => navigate("/timetable")} >
              <div className="quiz-main-materials-div-child  fourth-child " >
                <TouchAppIcon  className="quiz-main-materials-div-child-icons" />
              </div>
              <p className="quiz-main-materials-divs-desc" >Time table</p>
            </div>
          </div>
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
    ) : 
    (
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
              <div className="quiz-coming-soon-div" >
                <p className="quiz-coming-soon-desc"  >coming soon</p>
              </div>
              <div className="quiz-main-materials-div-child first-child" >
                <AttachFileIcon className="quiz-main-materials-div-child-icons quiz-icon-one" />
              </div>
              <p className="quiz-main-materials-divs-desc"  style={{color:"gray"}} >Notes</p>
            </div>
            <div className="quiz-main-materials-div " onClick={() => navigate("/videoLectures")} >
              <div className="quiz-main-materials-div-child  second-child" >
                <VideoLibraryIcon  className="quiz-main-materials-div-child-icons" />
              </div>
              <p className="quiz-main-materials-divs-desc" >Lectures</p>
            </div>
            <div className="quiz-main-materials-div"   >
             <div className="quiz-coming-soon-div" >
                <p className="quiz-coming-soon-desc"  >coming soon</p>
              </div>
              <div className="quiz-main-materials-div-child third-child " >
                <PostAddIcon  className="quiz-main-materials-div-child-icons" />
              </div>
              <p className="quiz-main-materials-divs-desc" style={{color:"gray"}} >Tutorial's</p>
            </div>
            <div className="quiz-main-materials-div" onClick={() => navigate("/timetable")} >
              <div className="quiz-main-materials-div-child  fourth-child " >
                <TouchAppIcon  className="quiz-main-materials-div-child-icons" />
              </div>
              <p className="quiz-main-materials-divs-desc" >Syllabus</p>  {/*syllabbus is Timetable page*/}
            </div>
          </div>
        </div>
          {
            user && submissionsData?.length > 0 && (
              <div className="quiz-fourth-container grandparent " >
                <div className="quiz-fourth-contaners-first-div" >
                  <div className="quiz-fourth-contaners-first-div-child-div-heading" >
                    <h2 className="quiz-fourth-contaners-first-div-child-div-heading-h2" >My Quizzes</h2>
                  </div>
                  <div className="quiz-fourth-contaners-first-div-child-div-view-more" onClick={()=>{navigate("/classroom")}} >
                    <div className="quiz-fourth-contaners-first-div-child-div-view-more-h4-div"  >
                      <h4 className="quiz-fourth-contaners-first-div-child-div-view-more-h4"  >{submissionsData?.length < 1 ? ("Create") : (" View All")}</h4>
                      <ArrowForwardIosIcon sx={{width:"15px"}} />
                    </div>
                  </div>
                </div>
                  <div className="parent" >
                    <div className="quiz-fourth-contaners-second-div" >
                      {
                        submissionsData?.slice(0,6)?.map((quiz,i)=>{
                          return(
                            <My_Quizzes id={quiz.id} image={i} title={quiz.name} subject={quiz.subject}/>
                          )
                        }).reverse()
                      }
                    </div>
                  </div>
              </div>
            )
          }

          <div className="quiz-fifth-container quiz-fifth-containers-four" onClick={() => navigate("/videoLectures")} >
          <div className="quiz-fifth-container-first-div" >
              <div className="quiz-fifth-container-first-div-icon" >
                <PlayCircleIcon/>
              </div>
              <div className="quiz-fifth-container-first-div-h4" >
                <h4>level 1</h4>
              </div>
              <div className="quiz-fifth-container-first-div-h2" >
                <h2>Video Lectures</h2>
              </div>
            </div>
            <div>
              <img className="quiz-image" src={cam} alt="quiz-img" />
            </div>
        </div>

          
        <div className="quiz-fifth-container quiz-fifth-containers-three">
            <div className="quiz-fifth-container-first-div" >
              <div className="quiz-coming-soon-div" >
                <p className="quiz-coming-soon-desc"  >coming soon</p>
              </div>
              <div className="quiz-fifth-container-first-div-icon"  >
                <TravelExploreOutlinedIcon  />
              </div>
              <div className="quiz-fifth-container-first-div-h4" >
                <h4>level 2</h4>
              </div>
              <div className="quiz-fifth-container-first-div-h2 third-h2-quiz" >
                <h2>Explore Courses</h2>
              </div>
            </div>
            <div>
              <img style={{filter: "grayscale(100%)"}} className="quiz-image image-three-quiz" src={earthimg} alt="img"/>
            </div>
        </div>
        <div onClick={() => navigate("/createQuiz")} className="quiz-fifth-container quiz-fifth-containers-one" >
            <div  className="quiz-fifth-container-first-div" >
              <div className="quiz-fifth-container-first-div-icon" >
                <AddBoxIcon />
              </div>
              <div className="quiz-fifth-container-first-div-h4" >
                <h4>level 3</h4>
              </div>
              <div className="quiz-fifth-container-first-div-h2" >
                <h2>Create Quiz</h2>
              </div>
            </div>
            <div >
              <img className="quiz-image" src={Books} alt="books-img" />
            </div>
        </div>
        <div className="quiz-fifth-container quiz-fifth-containers-two" onClick={() => navigate("/joinquizPage")} >
          <div className="quiz-fifth-container-first-div" >
              <div className="quiz-fifth-container-first-div-icon" >
                <CreateOutlinedIcon />
              </div>
              <div className="quiz-fifth-container-first-div-h4" >
                <h4>level 4</h4>
              </div>
              <div className="quiz-fifth-container-first-div-h2" >
                <h2>Join Quiz</h2>
              </div>
            </div>
            <div>
              <img className="quiz-image" src={quizimg} alt="quiz-img" />
            </div>
        </div>
    </div>
    )}
    </>
  );
};


