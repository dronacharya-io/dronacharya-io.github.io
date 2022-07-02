import React, { useState } from "react";

const QuestionCard = (props) => {
  const [question, setQuestion] = useState({
    Question: undefined,
    options: [],
    correctAns: undefined,
  });
  const [option, setOption] = useState(undefined);
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
        options: [],
        correctAns: undefined,
      });
      document.getElementById("Question").value = "";
      document.getElementsById("option").value = "";
      document.getElementById("correctAns").value = "";
    }
  };

  let i = 1;
  const addOption = (e) => {
    e.preventDefault();
    setQuestion({
      ...question,
      options: [...question.options, ([i] = option)],
    });
    console.log(question.options);
    i++;
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
        {question.options.map((option, i) => {
          return <p key={i}>{option}</p>;
        })}
        <div className="form-control option">
          <label htmlFor="option">option: </label>
          <input
            type="text"
            id="option"
            name="option"
            className="options"
            onChange={(e) => setOption(e.target.value)}
          />
          <button onClick={addOption} className="btn">
            +
          </button>
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
