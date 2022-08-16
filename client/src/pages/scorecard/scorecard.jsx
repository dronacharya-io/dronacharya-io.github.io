import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUserAuth } from "../../context/AuthContext";
import { UserSubmissionCard } from "./userSubmissionCard";
import LoginSignUpPopUp from "../../components/PopUps/LoginSignUpPopUp";
import Lottie from "react-lottie";
import notFound from "../../lotties/astwo.json";


export const Scorecard = () => {
  const { user, googleSignIn } = useUserAuth();
  const [submissionsData, setSubmitionsData] = useState([]);
  console.log(user);

  useEffect(() => {
    async function fetch() {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/users/getUser/" + user.userData._id
        );
        console.log(res);
        setSubmitionsData(res.data.quizzesSubmitted);
      } catch (err) {
        console.log(err.message);
      }
    }
    return () => {
      fetch();
    };
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: notFound,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };


  return (
    <>
      {user ? (
        submissionsData.length > 0 ? (
          <>
          <div className="cards">
            {submissionsData
              ?.map((quiz, i) => {
                return (
                  <>
                    <UserSubmissionCard
                      key={i}
                      quizName={quiz.name}
                      id={quiz.id}
                      runTime={quiz.runTime}
                      startDate={quiz.startDate}
                    />
                  </>
                );
              })
              .reverse()}
          </div>
        </>
        ) : (
          <div>
              <Lottie isClickToPauseDisabled={true}  options={defaultOptions} height={675} width={675} />
          </div>
        )
      ) : (
        <LoginSignUpPopUp/>
      )}
    </>
  );
};
