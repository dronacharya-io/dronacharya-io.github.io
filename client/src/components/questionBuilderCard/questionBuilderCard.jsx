import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Zoom from "@mui/material/Zoom";
import IconButton from "@mui/material/IconButton";
import "./Css/questionBuilderCard.css";
import Button from "@mui/material/Button";
import { Fab } from "@mui/material";
import { useIdleTimer } from 'react-idle-timer';

const QuestionCard = (props) => {
  const [question, setQuestion] = useState({
    Question: undefined,
    correctAns: undefined,
  });

  const [showElements, setShowElements] = useState(false);
  const [row, setRow] = useState("1");
  const AddQuestionText = "Add Question";
  const [option, setOption] = useState({ value: undefined });
  const [options, setOptions] = useState([]);
  // const [IsWrittenType, setIsWrittenType] = useState(false);
  
  const timeout = 120000; //2 minutes 
  const [remaining, setRemaining] = useState(timeout);
  const [elapsed, setElapsed] = useState(0);
  const [lastActive, setLastActive] = useState(+new Date());
  const [isIdle, setIsIdle] = useState(false);

  const handleOnActive = () => setIsIdle(false);
  const handleOnIdle = () => setIsIdle(true);

  const {
    getRemainingTime,
    getLastActiveTime,
    getElapsedTime
  } = useIdleTimer({
    timeout,
    onActive: handleOnActive,
    onIdle: handleOnIdle
  })

  useEffect(() => {
    setRemaining(getRemainingTime())
    setLastActive(getLastActiveTime())
    setElapsed(getElapsedTime())

    setInterval(() => {
      setRemaining(getRemainingTime())
      setLastActive(getLastActiveTime())
      setElapsed(getElapsedTime())
    }, 1000)
  }, [])
  
  
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuestion({ ...question, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuestion({
      ...question,
      options: options,
      // isWrittenType: IsWrittenType,
    });
    if (
      question.Question &&
      question.correctAns &&
      question.options
      // || (question.Question && question.isWrittenType)
    ) {
      const newQuestion = { ...question, id: new Date().getTime().toString() };
      props.addQuestion(newQuestion);
      setQuestion({
        Question: undefined,
        correctAns: undefined,
        // isWrittenType: false,
      });
      setOptions([]);

      document.getElementById("Question").value = "";
      document.getElementById("correctAns").value = "";
      // setIsWrittenType(false);
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
    <div id="ParentDiv">
      <form className="form" id="form-c">
        <div className="form-control Question">
          <textarea
            onClick={() => {
              setRow("2");
              setShowElements(true);
            }}
            type="text"
            id="Question"
            name="Question"
            placeholder={`Take a Question...`}
            rows={ isIdle ? "1" : row}
            onChange={handleChange}
          />
        </div>
        { isIdle ? false  :  showElements && (
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
              {/* <Zoom in={true}>
                <div>
                  <InputLabel>
                    Is answer written Type
                    <Checkbox
                      value={IsWrittenType}
                      onClick={() => setIsWrittenType(!IsWrittenType)}
                      id="IsWrittenType"
                    />
                  </InputLabel>
                </div>
              </Zoom> */}
              {/* {!IsWrittenType ? (
                <> */}
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
              {/* </> */}
              {/* ) : (
                <></>
              )} */}
            </div>
            {/* {!IsWrittenType ? (
              <> */}
            <List options={options} removeOption={removeOption} />
            <div className="form-control correctAns">
              <textarea
                type="text"
                id="correctAns"
                name="correctAns"
                placeholder="Type correct answer..."
                onChange={handleChange}
                rows={1}
              />
            </div>
          </div>
        )}
      </form>
    </div>
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

export default QuestionCard;
