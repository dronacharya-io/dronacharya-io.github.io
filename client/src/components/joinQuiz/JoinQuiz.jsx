import "./joinQuiz.css";
import React, { useState, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { useUserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Lottie from "react-lottie";
import Loading from "../../lotties/mainloading.json";
import LoginSignUpPopUp from "../PopUps/LoginSignUpPopUp.jsx";
import Tooltip from "@mui/material/Tooltip";
import mainDivVector from "../../lotties/join-quiz-main-div.json";
import {motion} from "framer-motion";

const JoinQuiz = () => {
  const navigate = useNavigate();

  var counter = 0;
  var submission = { submittedAns: undefined };
  var submissions = [];
  var score = 0;
  var Data = undefined;
  var quizDetails = undefined;
  var loading = true;
  var attendies = undefined;
  var index = undefined;
  var isFound = undefined;
  var positiveMarking = 0;
  var negativeMarking = 0;

  var { user, googleSignIn } = useUserAuth();
  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams.get("id"));

  useEffect(() => {
    loading = true;
    async function fetch() {
      try {
        console.log("called");
        const x = await axios.get(
          "https://dronacharya-api.onrender.com/api/quizzes/attemptQuiz/" + urlParams.get("id")
        );
        console.log(x);
        Data = x.data.questions;
        // setIswrittenType(x.data.questions[0].isWrittenType);
        var { _id, quizname, startDate, runTime } = x.data;
        console.log(Data);
        quizDetails = {
          id: _id,
          name: quizname,
          startDate: startDate,
          runTime: runTime,
        };
        attendies = x.data.attendies;
        positiveMarking = x.data.positiveMarking;
        negativeMarking = x.data.negativeMarking;
        console.log(quizDetails,"quizDetails");
        index = 0;
        const arr = x.data.attendies;
        const IsFound = arr.some((element) => {
          if (element.id === user?.userData?._id) {
            return true;
          }
          return false;
        });
        isFound = IsFound;
      } catch (err) {
        console.log(err);
      }
      Loading = false;
    }
    return () => {
      fetch();
    };
  }, []);

  const TakeAnswer = async () => {
    console.log(Data[index]);
    Data[index + 1] ? index = index + 1 : index = index;
    // setIswrittenType(Data[index].isWrittenType);
    handleSubmit();
    if (Data[index].correctAns === submissions[index].submittedAns) {
      score = score + positiveMarking;
      console.log("correct");
    }
    if (Data[index].correctAns !== submissions[index].submittedAns) {
      score = score - negativeMarking;
      console.log("wrong");
    }
    if (Data[index + 1]) {
      counter = index + 1;
    }
    if (!Data[index + 1]) {
      if (Data[index].correctAns === submissions[index].submittedAns) {
        score = score + positiveMarking;
        console.log("correct");
      }
      if (Data[index].correctAns !== submissions[index].submittedAns) {
        score = score - negativeMarking;
        console.log("wrong");
      }
      if (!isFound) {
        try {
          const url =
            "https://dronacharya-api.onrender.com/api/users/updateUser/" +
            user.userData._id.toString();
          console.log(url);
          const arr = user.userData.quizzesSubmitted;
          arr.push(quizDetails);
          console.log(arr);
          await axios.put(url, { quizzesSubmitted: arr });
          console.log({ quizzesSubmitted: arr });
        } catch (err) {
          console.log(err.message);
        }
        try {
          attendies.push({
            userId: user.userData._id,
            userName: user.displayName,
            userEmail: user.email,
            submissions: submissions,
            score: score,
          });
          await axios.put(
            "https://dronacharya-api.onrender.com/api/quizzes/updateQuiz/" +
              urlParams.get("id"),
            { attendies: attendies }
          );
        } catch (err) {
          console.log(err.message);
        }
        alert("Test Submitted!");
        navigate("../scorecard");
      } else {
        alert("Test already attempted!");
      }
    }
    console.log(score);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    submission = { submittedAns: value };
    document.getElementById("submittedAns").value("");
  };
  const Input = styled("input")({
    display: "none",
  });

  const handleSubmit = () => {
    const newSubmission = {
      ...submission,
      id: new Date().getTime().toString(),
      qid: Data[index].id,
    };
    submissions = [...submissions, newSubmission];
    submission = { submittedAns: undefined };

    console.log(submissions);
  };

  const VectorMainDiv = {
    loop: true,
    autoplay: true,
    animationData: mainDivVector,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }

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
        <>
          {loading ? (
            <div id="loading">
              <Lottie
                isClickToPauseDisabled={true}
                options={VectorLoading}
                height={170}
                width={170}
              />
            </div>
          ) : (
            <>
              <div id="joinQuizHeader">
                <Tooltip
                  title="I Quit this Quiz"
                  placement="top"
                  disableFocusListener
                  disableTouchListener
                  arrow
                  className="back-icon"
                >
                  <Button
                    className="back-icon"
                    variant="outlined"
                    onClick={() => navigate("../")}
                    >
                    <IoArrowBack/>
                  </Button>
                </Tooltip>
                <div id="navigationTab">
                  {Data.map((question, i) => {
                    const { id } = question;
                    return (
                      <>
                        <Tooltip
                          title={`Jump to Question ${i+1}`}
                          placement="top"
                          disableFocusListener
                          disableTouchListener
                          arrow
                          
                        >
                            <Button
                              className="questionLocator"
                              variant="outlined"
                              onClick={() => {
                                index = i;
                                // setIswrittenType(Data[i].isWrittenType);
                              }}
                            >
                              {i+1}
                            </Button>
                        </Tooltip>
                      </>
                    );
                  })}
                </div>
              </div>
                  <motion.div 
                    className="join-quiz-main-div"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                   >
                    <div className="join-quiz-question" >
                      <h1>{Data[index].Question}</h1>
                    </div>
                    <div id="options">
                      {Data[index].options.map((option, i) => {
                        return (
                          <>
                            <div className="option" key={i}>
                              <p>option {i + 1}</p>
                              <p>{option.value}</p>
                            </div>
                          </>
                        );
                      })}
                    </div>
                    <div id="answer">
                      <p>answer</p>
                      {/* {!IsWrittenType ? ( */}
                      <TextField
                        type="text"
                        id="submittedAns"
                        name="submittedAns"
                        onChange={handleChange}
                      />
                    </div>
                      <div className="vectorMainDiv" >
                        <Lottie
                          isClickToPauseDisabled={true}
                          options={VectorMainDiv}
                          height={170}
                          width={270}
                        />
                      </div>
                  </motion.div>
              <Button variant="outlined" onClick={() => TakeAnswer()}>
                Next
              </Button>
            </>
          )}
        </>
      ) : (
        <LoginSignUpPopUp />
      )}
    </>
  );
};

export default JoinQuiz;
