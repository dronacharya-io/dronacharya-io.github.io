import React, { useState } from "react";
import "./quizSettings.css";

const QuizSettings = (props) => {
  const [values, setValues] = useState({
    quizname: undefined,
    subject: undefined,
    isMcq: false,
    timePerQuestion: 15,
    isNegative: false,
    positiveMarking: 1,
    negativeMarking: 0,
    startDate: undefined,
    startTime: undefined,
    runTime: undefined,
  });

  const today = new Date();
  let month = "0" + (today.getMonth() + 1);
  if (month.length === 1) {
    month = "0" + month;
  }

  var curDate = today.getFullYear() + "-" + month + "-" + today.getDate();
  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleCheckbox = (e) => {
    if (e.target.id === "isNegative") {
      if (values.isNegative) {
        document.getElementById("checkbox").style.visibility = "hidden";
        setValues({ ...values, isNegative: !values.isNegative });
      } else {
        document.getElementById("checkbox").style.visibility = "visible";
        setValues({ ...values, isNegative: !values.isNegative });
      }
    } else {
      if (e.target.value === "on") {
        setValues({ ...values, [e.target.id]: true });
      } else {
        setValues({ ...values, [e.target.id]: false });
      }
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    props.func(values);
  };

  return (
    <>
      <article>
        <label>Quizname: </label>
        <input
          name="quizname"
          id="quizname"
          type="text"
          onChange={handleChange}
        />
      </article>
      <article>
        <label>Subject: </label>
        <input
          name="subject"
          id="subject"
          type="text"
          onChange={handleChange}
        />
      </article>
      <article>
        <label>Is the quiz MCQ type: </label>
        <input
          name="isMcq"
          id="isMcq"
          type="checkbox"
          onChange={handleCheckbox}
        />
      </article>
      <article>
        <label>Time per question: </label>
        <input
          name="timePerQuestion"
          id="timePerQuestion"
          type="number"
          onChange={handleChange}
        />
      </article>
      <article>
        <label>Positive Marking: </label>
        <input
          name="positiveMarking"
          id="positiveMarking"
          type="number"
          min={1}
          onChange={handleChange}
        />
      </article>
      <article>
        <label>Is there a negative marking: </label>
        <input
          name="isNegative"
          id="isNegative"
          type="checkbox"
          onChange={handleCheckbox}
        />
      </article>
      <article id="checkbox" style={{ visibility: "hidden" }}>
        <label>Negative Marking: </label>
        <input
          name="negativeMarking"
          id="negativeMarking"
          type="number"
          min={1}
          onChange={handleChange}
        />
      </article>
      <article>
        <label>Start Date: </label>
        <input
          name="startDate"
          id="startDate"
          type="date"
          min={curDate}
          onChange={handleChange}
        />
      </article>
      <article>
        <label>Start-Time: </label>
        <input
          name="startTime"
          id="startTime"
          type="time"
          onChange={handleChange}
        />
      </article>
      <article>
        <label>Run-Time: </label>
        <input
          name="runTime"
          id="runTime"
          type="time"
          onChange={handleChange}
        />
      </article>
      <button onClick={handleClick}>Apply</button>
    </>
  );
};

export default QuizSettings;
