import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUserAuth } from "../../context/AuthContext";
import { UserSubmissionCard } from "./userSubmissionCard";
import LoginSignUpPopUp from "../../components/PopUps/LoginSignUpPopUp";
import Lottie from "react-lottie";
import notFound from "../../lotties/astwo.json";
import solarsystem from "../../lotties/solarsystem.json";
import "./scroreCard.css";
import space from "../../lotties/space.json";
import Loading from "../../lotties/mainloading.json";

export const Scorecard = () => {
  const { user, googleSignIn } = useUserAuth();
  const [submissionsData, setSubmitionsData] = useState(user?.userData?.quizzesSubmitted);
  const [loading, setLoading] = useState(false);
  console.log(user);

  useEffect(() => {
    setLoading(true);
    async function fetch() {
      try {
      //   const res = await axios.get(
      //     "https://dronacharya-api.onrender.com/api/users/getUser/" + user.userData._id
      //   );
      //   console.log(res);
      //   setSubmitionsData(res.data.quizzesSubmitted);
        setSubmitionsData(user.userData.quizzesSubmitted);
      } catch (err) {
        console.log(err.message);
      }
      setLoading(false);
    }
    return () => {
      fetch();
    };
  });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: notFound,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const Solarsystem = {
    loop: true,
    autoplay: true,
    animationData: solarsystem,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const Space = {
    loop: true,
    autoplay: true,
    animationData: space,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const VectorLoading = {
    loop: true,
    autoplay: true,
    animationData: Loading,
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
  );
};
