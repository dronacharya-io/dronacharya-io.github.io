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

export const Classroom = () => {
  const { user } = useUserAuth();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    quizzesCreated: [{ quiz: { quizName: "null", startDate: 0, runTime: 0 } }],
  });

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    async function Fetch() {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/users/getUser/" + user.userData._id
        );
        setData(res.data);
      } catch (err) {
        setData(err);
      }
      setLoading(false);
    }

    return () => {
      Fetch();
    };
  }, []);

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
      {user ? (
        <div className="cards">
          {!loading ? (
            data.quizzesCreated.length > 0 ? (
              data.quizzesCreated
                ?.map((quiz, i) => {
                  return (
                    <div>
                      <UserQuizCard
                        key={i}
                        id={quiz.id}
                        loading={loading}
                        quizName={quiz.name}
                        runTime={quiz.runTime}
                        startDate={quiz.startDate}
                      />
                    </div>
                  );
                })
                .reverse()
            ) : (
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
                        onClick={() => navigate("/")}
                      >
                        Get Started
                      </Button>
                  </Zoom>
                </div>
              </div>
            )
          ) : (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton /> 
            </>
          )}
        </div>
      ) : (
          <LoginSignUpPopUp/>
      )}
    </>
  );
};
