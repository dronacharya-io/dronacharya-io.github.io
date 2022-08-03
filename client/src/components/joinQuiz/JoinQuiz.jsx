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

  const { user } = useUserAuth();
  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams.get("id"));

  useEffect(() => {
    setLoading(true);
    async function fetch() {
      try {
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
        console.log(quizDetails);
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
    handleSubmit();
    let { correctAns } = Data[counter];
    let { submittedAns } = submissions[counter];
    if (correctAns === submittedAns) {
      setScore(score + 1);
      console.log("correct");
    }
    if (Data[counter + 1]) {
      setCounter(counter + 1);
    }
    if (!Data[counter + 1]) {
      let { correctAns } = Data[counter];
      let { submittedAns } = submissions[counter];
      if (correctAns === submittedAns) {
        setScore(score + 1);
        console.log("correct");
      }
      try {
        const url =
          "http://localhost:8800/api/users/updateUser/" +
          user.userData._id.toString();
        console.log(url);
        const arr = user.userData.quizzesSubmitted;
        const isFound = arr.some((element) => {
          if (element.id === quizDetails._id) {
            return true;
          }
          return false;
        });
        if (isFound) {
          alert("quiz already attempted");
        } else {
          arr.push({
            id: quizDetails._id,
            name: quizDetails.quizname,
            startDate: quizDetails.startDate,
            submissions: submissions,
          });
          console.log(arr);
          await axios.put(url, { quizzesSubmitted: arr });
          console.log({ quizzesSubmitted: arr });
        }
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
          <div id="question" key={Data[counter].id}>
            <p>{Data[counter].Question}</p>
          </div>
          <div id="options">
            {Data[counter].options.map((option, i) => {
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
