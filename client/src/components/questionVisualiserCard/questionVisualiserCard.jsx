import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Zoom from "@mui/material/Zoom";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Fab } from "@mui/material";

const QuestionVisualiserCard = (props) => {
  const { id, Question, options, correctAns } = props.question;
  const [question, setQuestion] = useState({
    Question: Question,
    correctAns: correctAns,
  });

  const [showElements, setShowElements] = useState(false);
  const [row, setRow] = useState("1");
  const AddQuestionText = "Save Question";
  const [option, setOption] = useState({ value: undefined });
  const [Options, setOptions] = useState(options);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuestion({ ...question, [name]: value });
    console.log(question);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuestion({ ...question, options: Options });
    console.log(question);
    if (question.Question && question.correctAns && question.options) {
      const newQuestion = {
        ...question,
        id: id,
      };
      props.editQuestion(newQuestion);
    }
  };

  const addOption = (e) => {
    e.preventDefault();
    if (option.value !== undefined && option.value !== "") {
      const newOption = { ...option, id: new Date().getTime().toString() };
      console.log(newOption);
      setOptions([...Options, newOption]);
      console.log(Options);
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
      <div id="ParentDiv">
        <form className="form" id="form-c">
          <div className="form-control Question">
            <textarea
              onClick={() => {
                setRow("2");
                setShowElements(true);
                console.log(question);
              }}
              type="text"
              id="Question"
              name="Question"
              value={question.Question}
              rows={row}
              onChange={handleChange}
            />
          </div>
          {showElements && (
            <div>
              <Zoom in={true}>
                <Button
                  onClick={handleSubmit}
                  size="medium"
                  variant="contained"
                  type="submit"
                  id="addQuestionButton"
                  aria-label="add"
                >
                  {`${AddQuestionText}`}
                </Button>
              </Zoom>
              <div>
                <Zoom in={true}>
                  <textarea
                    type="text"
                    id="option"
                    name="option"
                    className="options"
                    placeholder="Options.."
                    rows={1}
                    onChange={handleOption}
                  />
                </Zoom>
                <Zoom
                  in={true}
                  style={{ transitionDelay: true ? "250ms" : "0ms" }}
                >
                  <Fab
                    color="primary"
                    size="small"
                    onClick={addOption}
                    id="AddOptionButton"
                  >
                    <AddIcon />
                  </Fab>
                </Zoom>
              </div>
              <List options={Options} removeOption={removeOption} />
              <div className="form-control correctAns">
                <textarea
                  type="text"
                  id="correctAns"
                  name="correctAns"
                  value={question.correctAns}
                  onChange={handleChange}
                  rows={1}
                />
              </div>
            </div>
          )}
        </form>
      </div>
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
      <Zoom in={true}>
        <IconButton
          className="DeleteButton"
          onClick={() => props.removeOption(id)}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </Zoom>
    </div>
  );
};

export default QuestionVisualiserCard;
