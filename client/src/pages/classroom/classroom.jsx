import "./Mobile_classroom.css";
import "./Desktop_classroom.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUserAuth } from "../../context/AuthContext";
import { UserQuizCard, CardSkeleton } from "./userQuizCard";
import Button from "@mui/material/Button";
import Zoom from "@mui/material/Zoom";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../../lotties/notfound.json";
import LoginSignUpPopUp from "../../components/PopUps/LoginSignUpPopUp"
import { UserSubmissionCard } from "../scorecard/userSubmissionCard";
import Newcard from "../../components/NewCards/Newcard";
import Heading from "../../components/HeadingText/heading";

export const Classroom = () => {
  var { user, x, setX } = useUserAuth();
  var [loading, setLoading] = useState(false);
  var submissionsData = user?.userData?.quizzesCreated;
  const navigate = useNavigate();
  console.log(submissionsData, "submissions data recent")
  useEffect(() => {
    setLoading(true);
    async function Fetch() {
      try {
        submissionsData = user?.userData?.quizzesCreated;
      } catch (err) {
        // setData(err);
      }
      setLoading(false);
    }

    return () => {
      Fetch();
      console.log('x', x)
    };
  }, [x]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <Heading title={ submissionsData?.length < 1 ? 'CREATE YOUR FIRST QUIZ' : 'QUIZZES CREATED'} />
      {user ?
        (
          <div className="cards">
            {submissionsData?.length < 1 ? 
              (
                <div className="classroom-lottie-text-btn-parent-div" >
                <div className="classroom-lottie-div" >
                  <Lottie isClickToPauseDisabled={true}  options={defaultOptions}  />
                </div>
                <div>
                  <p className="para">
                    Looks like you haven't created any
                    <span style={{color : "#ffb74d"}} > Quiz</span> yet.
                  </p>
                  <Zoom in={true}>
                      <Button
                        className="classroom-getstarted-btn"
                        variant="outlined"
                        onClick={() => navigate("/createQuiz")}
                      >
                        Create Your First Quiz
                      </Button>
                  </Zoom>
                </div>
              </div>
              ) : (
                
                submissionsData
              ?.map((quiz, i) => {
                return (
                  <>
                    <Newcard
                      key={i}
                      id={quiz.id}
                      quizName={quiz.name}
                      runTime={quiz.runTime}
                      startDate={quiz.startDate}
                      subject={quiz.subject}
                      x={x}
                      setX={setX}
                    />
                  </>
              );
            })
            .reverse()
              )
            }
          </div>
        ) : (<LoginSignUpPopUp/>)
      }
    </>
  );
};

{
  /*
     */
}