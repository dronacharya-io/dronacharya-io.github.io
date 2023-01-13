import "./joinQuiz-mobile.css";
import "./joinQuiz-desktop.css";
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
import mainDivVector from "../../lotties/join-quiz-main-div.json";
import { motion } from "framer-motion";
import Heading from "../HeadingText/heading.jsx";
import { TextareaAutosize } from "@mui/material";

const JoinQuiz = () => {
  const navigate = useNavigate();
  const alphabets = ["A","B","C","D","E","F","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  const [counter, setCounter] = useState(0);
  const [submission, setSubmission] = useState({ submittedAns: undefined });
  const [submissions, setSubmissions] = useState([]);
  const [score, setScore] = useState(0);
  const [Data, setData] = useState();
  const [quizDetails, setQuizDetails] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [attendies, setAttendies] = useState();
  const [index, setIndex] = useState();
  const [isFound, setIsFound] = useState();
  const [positiveMarking, setPositiveMarking] = useState(0);
  const [negativeMarking, setNegativeMarking] = useState(0);

  const { user, googleSignIn } = useUserAuth();
  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams.get("id"));

  useEffect(() => {
    setLoading(true);
    async function fetch() {
      try {
        console.log("called");
        const x = await axios.get(
          "https://dronacharya-api.onrender.com/api/quizzes/attemptQuiz/" + urlParams.get("id")
        );
        console.log(x);
        setData(x.data.questions);
        // setIswrittenType(x.data.questions[0].isWrittenType);
        var { _id, quizname, startDate, runTime, subject } = x.data;
        console.log(Data);
        setQuizDetails({
          id: _id,
          name: quizname,
          startDate: startDate,
          runTime: runTime,
          subject: subject,
        });
        setAttendies(x.data.attendies);
        setPositiveMarking(x.data.positiveMarking);
        setNegativeMarking(x.data.negativeMarking);
        console.log(quizDetails);
        setIndex(0);
        const arr = x.data.attendies;
        const IsFound = arr.some((element) => {
          if (element.id === user?.userData?._id) {
            return true;
          }
          return false;
        });
        setIsFound(IsFound);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
    return () => {
      fetch();
    };
  }, [user]);

  const TakeAnswer = async () => {
    console.log(Data[index]);
    Data[index + 1] ? setIndex(index + 1) : setIndex(index);
    // setIswrittenType(Data[index].isWrittenType);
    handleSubmit();
    if (Data[index].correctAns === submissions[index].submittedAns) {
      setScore(score + positiveMarking);
      console.log("correct");
    }
    if (Data[index].correctAns !== submissions[index].submittedAns) {
      setScore(score - negativeMarking);
      console.log("wrong");
    }
    if (Data[index + 1]) {
      setCounter(index + 1);
    }
    if (!Data[index + 1]) {
      if (Data[index].correctAns === submissions[index].submittedAns) {
        setScore(score + positiveMarking);
        console.log("correct");
      }
      if (Data[index].correctAns !== submissions[index].submittedAns) {
        setScore(score - negativeMarking);
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
    setSubmission({ submittedAns: value });
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
    setSubmissions([...submissions, newSubmission]);
    setSubmission({ submittedAns: undefined });

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
                
                <div id="navigationTab">
                  {Data.map((question, i) => {
                    const { id } = question;
                    return (
                      <>
                          <Button
                            className="questionLocator"
                            variant="outlined"
                            onClick={() => {
                              setIndex(i);
                              // setIswrittenType(Data[i].isWrittenType);
                            }}
                          >
                            {i + 1}
                          </Button>
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
                  <div className="join-quiz-question-number-div" >
                    <h3 style={{margin:"0", boxShadow:'none'}} className="join-quiz-question" >Q.{index+1}</h3>
                  </div>
                  <div className="join-quiz-question-number-div" >
                    <h3 style={{margin:"0", boxShadow:'none'}} className="join-quiz-question" >{`${Data[index].Question.toUpperCase()}`}</h3>
                  </div>
                </div>
                <div id="optionDiv">
                  {Data[index].options.map((option, i) => {
                    return (
                      <>
                        <div className="join-quiz-option-div" >
                          <div className="join-quiz-option-number" id="join-quiz-option-number" >
                            <p>{alphabets[i]}</p>
                          </div>
                          <div className="join-quiz-option" key={i}>
                            <h4 className="option-value" id="join-quiz-option-value" >{option.value.toUpperCase()}</h4>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
                <div className="join-quiz-correct-answer">
                  <h4>ANSWER</h4>
                  {/* {!IsWrittenType ? ( */}
                  <textarea
                    type="text"
                    id="submittedAns"
                    name="submittedAns"
                    onChange={handleChange}
                  />
                  {/* ) : (
                        <label htmlFor="icon-button-file">
                          <Input accept="image/*" id="icon-button-file" type="file" />
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="label"
                          >
                            <input hidden accept="image/*" type="file" />
                            <PhotoCamera
                              id="submittedAns"
                              name="submittedAns"
                              onChange={handleChange}
                            />
                          </IconButton>
                        </label>
                      )} */}
                </div>
                <div className="vectorMainDiv" >
                  {/* <Lottie
                    isClickToPauseDisabled={true}
                    options={VectorMainDiv}
                    height={170}
                    width={270}
                  /> */}
                </div>
              </motion.div>
              <Button className="classroom-getstarted-btn" variant="outlined" onClick={() => TakeAnswer()}>
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