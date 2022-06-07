import "./joinQuiz.css";
import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";

const JoinQuiz = (props) => {
  const [counter, setCounter] = useState(0);
  const [submission, setSubmission] = useState({ submittedAns: "" });
  const TakeAnswer = () => {
    if (counter < 4) {
      setCounter(counter + 1);
    } else {
      alert("Test Submitted!");
    }
  };

  return (
    <>
      <IoArrowBack className="back-icon" onClick={props.function} />
      <div id="question">
        <p>{props.data[counter].question}</p>
      </div>
      <div id="options">
        <div className="option">
          <p>{props.data[counter].optionA}</p>
        </div>
        <div className="option">
          <p>{props.data[counter].optionB}</p>
        </div>
        <div className="option">
          <p>{props.data[counter].optionC}</p>
        </div>
        <div className="option">
          <p>{props.data[counter].optionD}</p>
        </div>
      </div>
      <button onClick={() => TakeAnswer()}>Next</button>
    </>
  );
};

export default JoinQuiz;
