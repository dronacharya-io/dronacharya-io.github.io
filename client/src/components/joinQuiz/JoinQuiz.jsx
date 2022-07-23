import "./joinQuiz.css";
import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios";
import { useUserAuth } from "../../context/AuthContext";

const JoinQuiz = (props) => {
  const [counter, setCounter] = useState(0);
  const [submission, setSubmission] = useState({ submittedAns: undefined });
  const [submissions, setSubmissions] = useState([]);
  const [score, setScore] = useState(0);

  const { user } = useUserAuth();

  const TakeAnswer = async () => {
    handleSubmit();
    let { correctAns } = props.data[counter];
    let { submittedAns } = submissions[counter];
    if (correctAns === submittedAns) {
      setScore(score + 1);
      console.log("correct");
    }
    if (props.data[counter + 1]) {
      setCounter(counter + 1);
    }
    if (!props.data[counter + 1]) {
      let { correctAns } = props.data[counter];
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
          if (element.id === props.quizDetails._id) {
            return true;
          }
          return false;
        });
        if (isFound) {
          alert("quiz already attempted");
        } else {
          arr.push({
            id: props.quizDetails._id,
            name: props.quizDetails.quizname,
            startDate: props.quizDetails.startDate,
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

  const { id, Question, options } = props.data[counter];

  return (
    <>
      <IoArrowBack className="back-icon" onClick={props.function} />
      <div id="question" key={id}>
        <p>{Question}</p>
      </div>
      <div id="options">
        {options.map((option, i) => {
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
  );
};

export default JoinQuiz;
