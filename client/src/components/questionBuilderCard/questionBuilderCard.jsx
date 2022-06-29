import React, { useState } from "react";

const QuestionCard = (props) => {
  const [question, setQuestion] = useState({
    Question: undefined,
    optionA: undefined,
    optionB: undefined,
    optionC: undefined,
    optionD: undefined,
    correctAns: undefined,
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuestion({ ...question, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.Question && question.correctAns) {
      const newQuestion = { ...question, id: new Date().getTime().toString() };
      props.addQuestion(newQuestion);
      setQuestion({
        Question: undefined,
        optionA: undefined,
        optionB: undefined,
        optionC: undefined,
        optionD: undefined,
        correctAns: undefined,
      });
      document.getElementById("Question").value = "";
      document.getElementById("optionA").value = "";
      document.getElementById("optionB").value = "";
      document.getElementById("optionC").value = "";
      document.getElementById("optionD").value = "";
      document.getElementById("correctAns").value = "";
    }
  };

  return (
    <>
      <form className="form" id="form-c">
        <div className="form-control Question">
          <label htmlFor="Question">Question : </label>
          <input
            type="text"
            id="Question"
            name="Question"
            onChange={handleChange}
          />
        </div>
        <div className="form-control option">
          <label htmlFor="optionA">option A : </label>
          <input
            type="text"
            id="optionA"
            name="optionA"
            onChange={handleChange}
          />
        </div>
        <div className="form-control option">
          <label htmlFor="optionB">option B : </label>
          <input
            type="text"
            id="optionB"
            name="optionB"
            onChange={handleChange}
          />
        </div>
        <div className="form-control option">
          <label htmlFor="optionC">option C : </label>
          <input
            type="text"
            id="optionC"
            name="optionC"
            onChange={handleChange}
          />
        </div>
        <div className="form-control option">
          <label htmlFor="optionD">option D : </label>
          <input
            type="text"
            id="optionD"
            name="optionD"
            onChange={handleChange}
          />
        </div>
        <div className="form-control correctAns">
          <label htmlFor="correctAns">Correct Ans : </label>
          <input
            type="text"
            id="correctAns"
            name="correctAns"
            onChange={handleChange}
          />
        </div>
        <div id="submit-btn">
          <button type="submit" className="btn" onClick={handleSubmit}>
            add question
          </button>
        </div>
      </form>
    </>
  );
};

export default QuestionCard;
