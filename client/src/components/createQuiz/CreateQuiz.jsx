import "./createQuiz.css";
import axios from "axios";
import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import QuizSettings from "../quizSettings/quizSettings";
import QuestionCard from "../questionBuilderCard/questionBuilderCard";
import QuestionVisualiserCard from "../questionVisualiserCard/questionVisualiserCard";
import { useUserAuth } from "../../context/AuthContext";
import Button from "@mui/material/Button";
import "../questionBuilderCard/Css/questionBuilderCard.css";
import Zoom from "@mui/material/Zoom";
import SettingsIcon from "@mui/icons-material/Settings";

const CreateQuiz = (props) => {
  const [button, setButton] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [settingsTab, setSettingsTab] = useState(false);

  const { user } = useUserAuth();

  const Disable = () => {
    setSettingsTab(!settingsTab);
  };

  const addQuestion = (x) => {
    setQuestions([...questions, x]);
  };

  const [output, setOutput] = useState([]);
  const show = (x) => {
    setOutput(x);
    console.log(output);
    Disable();
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      let quiz = output;
      quiz = { ...quiz, questions: questions };
      console.log(quiz);
      const res = await axios.post("http://localhost:8800/api/quizzes", quiz);
      const url =
        "http://localhost:8800/api/users/updateUser/" +
        user.userData._id.toString();
      console.log(url);
      const arr = user.userData.quizzesCreated;
      arr.push({
        id: res.data.details._id,
        name: res.data.details.quizname,
        startDate: res.data.details.startDate,
        startTime: res.data.details.startTime,
        runTime: res.data.details.runTime,
      });
      console.log(arr);
      await axios.put(url, { quizzesCreated: arr });
      console.log({ quizzesCreated: arr });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<SettingsIcon className="icon" id="settings-icon" />}
        id="settingsButton"
        onClick={() => Disable()}
      >
        Quiz Settings
      </Button>
      {settingsTab && <QuizSettings func={show} />}
      {!settingsTab && (
        <>
          <IoArrowBack className="back-icon-c" onClick={props.function} />
          <div>
            <QuestionCard setButton={setButton} addQuestion={addQuestion} />
          </div>
          {button && (
            <div>
              <Zoom in={true}>
                <Button
                  id="addQuizButton"
                  variant="contained"
                  color="success"
                  onClick={handleCreate}
                >
                  add quiz
                </Button>
              </Zoom>
            </div>
          )}
          {questions.map((question) => {
            return (
              <>
                <div key={question.id}>
                  <QuestionVisualiserCard question={question} />
                </div>
              </>
            );
          })}
        </>
      )}
    </>
  );
};

export default CreateQuiz;
