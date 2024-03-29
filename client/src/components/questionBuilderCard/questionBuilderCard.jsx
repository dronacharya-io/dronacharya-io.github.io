import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Zoom from "@mui/material/Zoom";
import IconButton from "@mui/material/IconButton";
import "./Css/Mobile_questionBuilderCard copy.css";
import "./Css/Desktop_questionBuilderCard.css";
import Button from "@mui/material/Button";
import { Fab } from "@mui/material";
import { useIdleTimer } from 'react-idle-timer';
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import Space from "../../lotties/space.json";

const QuestionCard = (props) => {
  const [question, setQuestion] = useState({
    Question: undefined,
    correctAns: undefined,
  });

  const alphabets = ["A","B","C","D","E","F","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  const [optionNumber, setOptionNumber] = useState(-1);
  const [showElements, setShowElements] = useState(false);
  const [row, setRow] = useState("1");
  const AddQuestionText = "Add Question";
  const [option, setOption] = useState({ value: undefined });
  const [options, setOptions] = useState([]);
  // const [IsWrittenType, setIsWrittenType] = useState(false);
  
  const timeout = 300000; //idle timeout in mili-seconds
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
    setOptionNumber((preValue)=>{
      return(optionNumber+1)
    })
  };

  const handleOption = (e) => {
    e.preventDefault();
    setOption({ value: e.target.value });
  };

  const removeOption = (id) => {
    setOptions((options) => {
      return options.filter((option) => option.id !== id);
    });

    setOptionNumber(()=>{
      return optionNumber -1;
    })
  };
  const space = {
    loop: true,
    autoplay: true,
    animationData: Space,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };



  return (
    <div style={{padding:"2rem"}} > 
     <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="question-builder-card-main-div" 
        >
        <div className="question-builder-card-main-child-div" >
          <div className="question-builder-card-main-lottie-div" >
            <Lottie isClickToPauseDisabled={true}  options={space} />
          </div>
          <div className="question-builder-card-main-form-div" >
            <form className="form" id="form-c">
                  <div id="flex-main-container" >
                      <div className="text-area-container" >
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
                    <div className="flex-option-ca-Container" >
                        <div className="option-plus-addButton" >
                          <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                            duration: 0.8,
                            delay: 0.5,
                            ease: [0, 0.71, 0.2, 1.01]
                          }}
                          >
                            <textarea
                              type="text"
                              id="option"
                              name="option"
                              className="options"
                              placeholder="Options.."
                              rows={1}
                              onChange={handleOption}
                            />
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                            duration: 0.8,
                            delay: 0.5,
                            ease: [0, 0.71, 0.2, 1.01]
                          }}
                          onClick={addOption}
                          id="AddOptionButton"
                          >
                              <AddIcon />
                          </motion.div>
                        </div>
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                            duration: 0.8,
                            delay: 0.5,
                            ease: [0, 0.71, 0.2, 1.01]
                            }}
                            className="form-control correctAns">
                            <textarea
                              type="text"
                              id="correctAns"
                              name="correctAns"
                              placeholder="Correct answer..."
                              onChange={handleChange}
                              rows={1}
                            />
                          </motion.div>
                      </div>
                      <div className="add-btn-div" >
                            <motion.div
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                duration: 0.8,
                                delay: 0.5,
                                ease: [0, 0.71, 0.2, 1.01]
                              }}
                            >
                                <Button
                                  onClick={handleSubmit}
                                  size="medium"
                                  variant="outlined"
                                  type="submit"
                                  id="addQuestionButton"
                                  aria-label="add"
                                >
                                  Add
                                </Button>
                            </motion.div>
                        </div>
                      <div id="optionDiv" >
                          <List options={options} removeOption={removeOption} optionNumber={alphabets[optionNumber]}/>
                      </div>
                  </div>
                  <div>
                  </div>
              </form>
          </div>
        </div>
     </motion.div>
    </div>
  );
};

const List = ({ options, removeOption, optionNumber }) => {

  const alphabets = ["A","B","C","D","E","F","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  return (
    <>
      {options.map((option, i) => {
        return (
            <SingleOption
              key={option.id}
              option={option}
              removeOption={removeOption}
              optionNumber={alphabets[i]}
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

export default QuestionCard;


{
{/* 

<div className="question-builder-card-main-child-div" >
            
        </div>

*/}
}