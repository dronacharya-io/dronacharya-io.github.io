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

export const Classroom = () => {
  var { user, x, setX } = useUserAuth();
  var [loading, setLoading] = useState(false);
  var submissionsData = user?.userData?.quizzesCreated;
  const navigate = useNavigate();

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
      <div className="cards">
        {submissionsData
          ?.map((quiz, i) => {
            return (
              <>
                <UserQuizCard
                  key={i}
                  id={quiz.id}
                  quizName={quiz.name}
                  runTime={quiz.runTime}
                  startDate={quiz.startDate}
                  x={x}
                  setX={setX}
                />
              </>
            );
          })
          .reverse()}
      </div>
    </>
  );
};
