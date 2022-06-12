import "./joinQuiz.css";
import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";

const JoinQuiz = (props) => {
  const [counter, setCounter] = useState(0);
  const [submission, setSubmission] = useState("");
  const [submissions, setSubmissions] = useState([]);

  const TakeAnswer = () => {
    handleSubmit();
    if (props.data[counter + 1]) {
      setCounter(counter + 1);
    } else {
      alert("Test Submitted!");
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSubmission({ value });
  };

  const handleSubmit = () => {
    const newSubmission = {
      ...submission,
      id: new Date().getTime().toString(),
    };
    setSubmissions([...submissions, newSubmission]);
    setSubmission("");

    console.log(submissions);
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
      <div id="answer">
        <p>answer</p>
        <input
          type="text"
          id="submittedAns"
          name="submittedAns"
          value={submission}
          onChange={handleChange}
        />
      </div>
      <button onClick={() => TakeAnswer()}>Next</button>
    </>
  );
};

export default JoinQuiz;
