import "./joinQuiz.css";
import React, { useState, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios";
import { useUserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import LoginSignUpPopUp from "../PopUps/LoginSignUpPopUp.jsx";

const JoinQuiz = () => {
  const navigate = useNavigate();

  const [counter, setCounter] = useState(0);
  const [submission, setSubmission] = useState({ submittedAns: undefined });
  const [submissions, setSubmissions] = useState([]);
  const [score, setScore] = useState(0);
  const [Data, setData] = useState();
  const [quizDetails, setQuizDetails] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [attendies, setAttendies] = useState();
  const [index, setIndex] = useState(0);
  const [isFound, setIsFound] = useState(Data[0].isWrittenType);
  const [IsWrittenType, setIswrittenType] = useState(true);
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
          "http://localhost:8800/api/quizzes/attemptQuiz/" + urlParams.get("id")
        );
        console.log(x);
        setData(x.data.questions);
        setIswrittenType(Data[0].isWrittenType);
        var { _id, quizname, startDate, runTime } = x;
        console.log(Data);
        setQuizDetails({
          id: _id,
          name: quizname,
          startDate: startDate,
          runTime: runTime,
        });
        setAttendies(x.data.attendies);
        setPositiveMarking(x.data.positiveMarking);
        setNegativeMarking(x.data.negativeMarking);
        console.log(quizDetails);
        const arr = x.data.attendies;
        const IsFound = arr.some((element) => {
          if (element.id === user?.userData._id) {
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
  }, []);

  const TakeAnswer = async () => {
    Data[index + 1] ? setIndex(index + 1) : setIndex(index);
    setIswrittenType(Data[index].isWrittenType);
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
            "http://localhost:8800/api/users/updateUser/" +
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
            submissions: submissions,
            score: score,
          });
          await axios.put(
            "http://localhost:8800/api/quizzes/updateQuiz/" +
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
    document.getElementById("submittedAns").val("");
  };

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

  return (
    <>
      {user ? (
        <>
          {loading ? (
            <p>loading</p>
          ) : (
            <>
              <div id="joinQuizHeader">
                <IoArrowBack
                  className="back-icon"
                  onClick={() => navigate("../")}
                />
                <div id="navigationTab">
                  {Data.map((question, i) => {
                    const { id } = question;
                    return (
                      <>
                        <Button
                          variant="outlined"
                          className="questionLocator"
                          onClick={() => {
                            setIndex(i);
                            setIswrittenType(Data[i].isWrittenType);
                          }}
                          id={id}
                        >
                          {i}
                        </Button>
                      </>
                    );
                  })}
                </div>
              </div>
              <TextField
                id="question"
                key={Data[index].id}
                value={Data[index].Question}
              />
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
                {!IsWrittenType ? (
                  <TextField
                    type="text"
                    id="submittedAns"
                    name="submittedAns"
                    onChange={handleChange}
                  />
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                  >
                    <input hidden accept="image/*" type="file" />
                    <PhotoCamera />
                  </IconButton>
                )}
              </div>
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
