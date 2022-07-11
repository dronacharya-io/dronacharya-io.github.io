import "./joinQuiz.css";
import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";

const JoinQuiz = (props) => {
  const [counter, setCounter] = useState(0);
  const [submission, setSubmission] = useState({ submittedAns: undefined });
  const [submissions, setSubmissions] = useState([]);
  const [score, setScore] = useState(0);

  const TakeAnswer = () => {
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

  const { Question, optionA, optionB, optionC, optionD } = props.data[counter];

  return (
    <>
      <IoArrowBack className="back-icon" onClick={props.function} />
      <div id="question">
        <p>{Question}</p>
      </div>
      <div id="options">
        <div className="option">
          <p>{optionA}</p>
        </div>
        <div className="option">
          <p>{optionB}</p>
        </div>
        <div className="option">
          <p>{optionC}</p>
        </div>
        <div className="option">
          <p>{optionD}</p>
        </div>
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
