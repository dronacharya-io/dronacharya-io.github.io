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
import Heading from "../../components/HeadingText/heading";
import {motion} from "framer-motion";

export const Scorecard = () => {
  const { user, googleSignIn, x, setX } = useUserAuth();
  const [submissionsData, setSubmitionsData] = useState(user?.userData?.quizzesSubmitted);
  const [loading, setLoading] = useState(false);
  console.log(user);

  // useEffect(() => {
  //   setLoading(true);
  //   async function fetch() {
  //     try {
  //       //   const res = await axios.get(
  //       //     "https://dronacharya-api.onrender.com/api/users/getUser/" + user.userData._id
  //       //   );
  //       //   console.log(res);
  //       //   setSubmitionsData(res.data.quizzesSubmitted);
  //       setSubmitionsData(user.userData.quizzesSubmitted);
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //     setLoading(false);
  //   }
  //   return () => {
  //     fetch();
  //   };
  // }, [user, submissionsData]);

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
  
      {user ? (
        <div className="cards">
          {user?.userData?.quizzesSubmitted?.length < 1 ?
            (
              <div id="scoreCard__notFound-parentDiv">
                <div id="scoreCard__notfoundTest-space">
                  <Lottie
                    isClickToPauseDisabled={true}
                    options={Space}

                  />
                </div>
                <div id="scoreCard__notfoundTest-solarSystem">
                  <Lottie
                    isClickToPauseDisabled={true}
                    options={Solarsystem}
                  />
                </div>
                <div id="scoreCard__notfoundTest-astronaut">
                  <Lottie
                    isClickToPauseDisabled={true}
                    options={defaultOptions}

                  />
                </div>
                <div id="scoreCard__notfoundTest-text-div">
                  <h2 id="scoreCard__notfoundTest-text">
                    There is so much <span>Space</span> here because you have not
                    attempted any Quiz yet!
                  </h2>
                </div>
              </div>
            ) :
            (
              user?.userData?.quizzesSubmitted
                ?.map((quiz, i) => {
                  return (
                   
                    <motion.div        
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      
                      > 
                      <UserSubmissionCard
                        key={i}
                        quizName={quiz.name}
                        id={quiz.id}
                        runTime={quiz.runTime}
                        startDate={quiz.startDate}
                      />
                     </motion.div>
                    
                  );
                })
                .reverse()
            )
          }
        </div>
      ) : (<LoginSignUpPopUp />)
      }
    </>
  );
};

{/* */ }