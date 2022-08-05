import "./joinQuiz.css";
import React, { useState, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios";
import { useUserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

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

  const { user } = useUserAuth();
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
        const { data } = x;
        setData(data.questions);
        setQuizDetails({
          id: data._id,
          name: data.quizname,
          startDate: data.startDate,
        });
        setAttendies(data.attendies);
        console.log(quizDetails);
        const arr = x.data.attendies;
        const isFound = arr.some((element) => {
          if (element.id === user.userData._id) {
            return true;
          }
          return false;
        });
        if (isFound) {
          alert("quiz already attempted");
        }
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
    handleSubmit();
    if (Data[index].correctAns === submissions[index].submittedAns) {
      setScore(score + 1);
      console.log("correct");
    }
    if (Data[index + 1]) {
      setCounter(index + 1);
    }
    if (!Data[index + 1]) {
      if (Data[index].correctAns === submissions[index].submittedAns) {
        setScore(score + 1);
        console.log("correct");
      }
      try {
        const url =
          "http://localhost:8800/api/users/updateUser/" +
          user.userData._id.toString();
        console.log(url);
        const arr = user.userData.quizzesSubmitted;
        arr.push({
          ...quizDetails,
          submissions: submissions,
        });
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
        });
        await axios.put(
          "http://localhost:8800/api/quizzes/updateQuiz/" + urlParams.get("id"),
          { attendies: attendies }
        );
      } catch (err) {
        console.log(err.message);
      }
      alert("Test Submitted!");
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
      {loading ? (
        <p>loading</p>
      ) : (
        <>
          <IoArrowBack className="back-icon" onClick={() => navigate("../")} />
          <div>
            {Data.map((question, i) => {
              const { id } = question;
              return (
                <>
                  <button
                    className="questionLocator"
                    onClick={() => {
                      setIndex(i);
                    }}
                    id={id}
                  >
                    {i}
                  </button>
                </>
              );
            })}
          </div>
          <div id="question" key={Data[index].id}>
            <p>{Data[index].Question}</p>
          </div>
          <div id="options">
            {Data[index].options.map((option, i) => {
              return (
                <>
                  <div className="option" key={i}>
                    <p>{option.value}</p>
                  </div>
                </>
              );
            })}
          </div>
          <div id="answer">
            <p>answer</p>
            <input
              type="text"
              id="submittedAns"
              name="submittedAns"
              onChange={handleChange}
            />
          </div>
          <button onClick={() => TakeAnswer()}>Next</button>
        </>
      )}
    </>
  );
};

export default JoinQuiz;
