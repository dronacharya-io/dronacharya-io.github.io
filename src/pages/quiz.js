import "./quiz.css";
import React, { useState } from "react";
import CreateQuiz from "../components/CreateQuiz";
import JoinQuiz from "../components/JoinQuiz";
import Data from "./data";

export const Quiz = () => {
  const [createQuiz, setCreateQuiz] = useState(false);
  const [joinQuiz, setJoinQuiz] = useState(false);

  const Toggle = () => {
    setCreateQuiz(false);
    setJoinQuiz(false);
  };

  return (
    <>
      {!createQuiz && !joinQuiz && (
        <div id="q-mainBody">
          <button className="Quiz" onClick={() => setCreateQuiz(true)}>
            Create a Quiz
          </button>
          <button className="Quiz" onClick={() => setJoinQuiz(true)}>
            Join a Quiz
          </button>
        </div>
      )}
      {createQuiz && !joinQuiz && (
        <div id="q-mainBody">
          <div id="question-section">
            <CreateQuiz function={Toggle} />
          </div>
        </div>
      )}
      {joinQuiz && !createQuiz && (
        <div id="q-mainBody">
          <div id="attempt-section">
            <JoinQuiz function={Toggle} data={Data} />
          </div>
        </div>
      )}
    </>
  );
};
