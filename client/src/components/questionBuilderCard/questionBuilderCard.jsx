import React, { useState } from "react";

const QuestionCard = (props) => {
  const [question, setQuestion] = useState({
    Question: undefined,
    options: [],
    correctAns: undefined,
  });
  const [option, setOption] = useState(undefined);
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
    if (options.includes(option.trim())) {
      alert(
        "`" +
          option +
          "`" +
          " and " +
          "`" +
          option.trim() +
          "`" +
          " look similar do you want to force add this as a new option"
      );
    } else {
      if (option !== undefined && option !== "") {
        setOptions([...options, option]);
        document.getElementById("option").value = null;
        setOption(undefined);
      }
    }
    console.log({ ...options });
  };

  const forceAdd = (e) => {
    if (option !== undefined && option !== "") {
      setOptions([...options, option]);
      document.getElementById("option").value = null;
      setOption(undefined);
    }
  };

  const handleOption = (e) => {
    e.preventDefault();
    setOption(e.target.value);
  };

  const removeOption = (index) => {
    const copy = option;
    const removeElement = copy.splice(index, 1);
    setOptions(copy);
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
      {options.map((option, i) => {
        return (
          <SingleOption
            key={i}
            {...option}
            {...i}
            removeOption={removeOption}
          />
        );
      })}
    </>
  );
};

const SingleOption = ({ option, i, removeOption }) => {
  return (
    <div className="option">
      <h4>{option}</h4>
      <button onClick={() => removeOption(i)}>remove</button>
    </div>
  );
};

export default QuestionCard;
