import "./createQuiz.css";
import axios from "axios";
import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { GoSettings } from "react-icons/go";
import QuizSettings from "../quizSettings/quizSettings";
import QuestionCard from "../questionBuilderCard/questionBuilderCard";
import QuestionVisualiserCard from "../questionVisualiserCard/questionVisualiserCard";

const CreateQuiz = (props) => {
  const [questions, setQuestions] = useState([]);
  const [settingsTab, setSettingsTab] = useState(false);

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
      await axios.post("/quizzes", quiz);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button id="settingsButton" onClick={() => Disable()}>
        <GoSettings className="icon" id="settings-icon" />
      </button>
      {settingsTab && <QuizSettings func={show} />}
      {!settingsTab && (
        <>
          <IoArrowBack className="back-icon-c" onClick={props.function} />
          <div>
            <QuestionCard addQuestion={addQuestion} />
          </div>
          <div>
            <button className="btn" onClick={handleCreate}>
              add quiz
            </button>
          </div>
          {questions.map((question) => {
            return (
              <>
                <div key={question.id}>
                  <QuestionVisualiserCard {...question} />
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
