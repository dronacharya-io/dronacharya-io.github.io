import "./quiz.css";
import React, { useState } from "react";
import CreateQuiz from "../components/CreateQuiz";
import JoinQuiz from "../components/JoinQuiz";

export const Quiz = () => {
  const [createQuiz, setCreateQuiz] = useState(false);
  const [joinQuiz, setJoinQuiz] = useState(false);

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
            <CreateQuiz />
          </div>
        </div>
      )}
      {joinQuiz && !createQuiz && (
        <div id="q-mainBody">
          <div id="attempt-section">
            <JoinQuiz />
          </div>
        </div>
      )}
    </>
  );
};
