import React, { useState } from "react";

const QuestionCard = (props) => {
  const [question, setQuestion] = useState({
    Question: undefined,
    options: [],
    correctAns: undefined,
  });
  const [option, setOption] = useState({ value: undefined });
  const [options, setOptions] = useState([]);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuestion({ ...question, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setQuestion({ ...question, options: options });
    if (question.Question && question.correctAns && question.options) {
      const newQuestion = { ...question, id: new Date().getTime().toString() };
      props.addQuestion(newQuestion);
      setQuestion({
        Question: undefined,
        options: [],
        correctAns: undefined,
      });
      document.getElementById("Question").value = "";
      document.getElementById("correctAns").value = "";
    }
  };

  const addOption = (e) => {
    e.preventDefault();
    if (option.value !== undefined && option.value !== "") {
      const newOption = { ...option, id: new Date().getTime().toString() };
      setOptions([...options, newOption]);
      document.getElementById("option").value = null;
      setOption(undefined);
    }
  };

  const handleOption = (e) => {
    e.preventDefault();
    setOption({ value: e.target.value });
  };

  const removeOption = (id) => {
    setOptions((options) => {
      return options.filter((option) => option.id !== id);
    });
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
        <List options={options} removeOption={removeOption} />
        <div className="form-control option">
          <label htmlFor="option">option: </label>
          <input
            type="text"
            id="option"
            name="option"
            className="options"
            onChange={handleOption}
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

const List = ({ options, removeOption }) => {
  return (
    <>
      {options.map((option) => {
        return (
          <SingleOption
            key={option.id}
            option={option}
            removeOption={removeOption}
          />
        );
      })}
    </>
  );
};

const SingleOption = (props) => {
  const { id, value } = props.option;
  return (
    <div className="option">
      <h4>{value}</h4>
      <button onClick={() => props.removeOption(id)}>remove</button>
    </div>
  );
};

export default QuestionCard;
