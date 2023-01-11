import React, { useState } from "react";
import "./questionVisualiserCard-desktop.css"
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Zoom from "@mui/material/Zoom";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Fab } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import { motion } from "framer-motion";

const QuestionVisualiserCard = (props) => {
  const { id, Question, options, correctAns } = props.question;
  const [question, setQuestion] = useState({
    Question: Question,
    correctAns: correctAns,
    options: options,
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
    setQuestion({
      ...question,
      options: Options,
    });
    console.log(question);
    if (
      question.Question &&
      question.correctAns &&
      question.options
      // || (question.Question && question.isWrittenType)
    ) {
      const newQuestion = {
        ...question,
        id: id,
      };
      props.editQuestion(newQuestion);
    }
    setShowElements(false);
    setRow(1)
  };

  const addOption = (e) => {
    e.preventDefault();
    if (option.value !== undefined && option.value !== "") {
      const newOption = { ...option, id: new Date().getTime().toString() };
      console.log(newOption);
      setOptions([...Options, newOption]);
      console.log(Options);
      setQuestion({ ...question, options: Options });
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
      <div id="ParentDiv" >
        <div  className={showElements ? `question-vis-card-main-div` : ""} >

        <form className="form" id="form-c">
            <div id="flex-main-container" >
              <div className="text-area-container" >
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
              </div>
            {showElements && (
              <div>
                <div className="flex-option-ca-Container" >
                  <div className="option-plus-addButton" >
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
                </div>
                
                <div  id="optionDiv" >
                  <List options={Options} removeOption={removeOption} />
                </div>
                <div className="add-btn-div" >
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

              </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

const List = ({ options, removeOption, optionNumber }) => {
  return (
    <>
      {options?.map((option) => {
        return (
            <SingleOption
              key={option.id}
              option={option}
              removeOption={removeOption}
              optionNumber={optionNumber}
            />
        );
      })}
    </>
  );
};

const SingleOption = (props) => {
  const { id, value } = props.option;
  return (
    <motion.div 
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
    duration: 0.8,
    delay: 0,
    ease: [0, 0.71, 0.2, 1.01]
    }}>
      <div className="option-number" >
        <p>{props.optionNumber}</p>
      </div>
      <div className="options-individual">

        <h4 className="option-value" >{value}</h4>
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
    </motion.div>
  );
};


export default QuestionVisualiserCard;


{
  
}