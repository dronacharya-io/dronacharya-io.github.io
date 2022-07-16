import "./quiz.css";
import React, { useState, useEffect } from "react";
import CreateQuiz from "../../components/createQuiz/CreateQuiz";
import JoinQuiz from "../../components/joinQuiz/JoinQuiz";
import axios from "axios";

export const Quiz = () => {
  const [createQuiz, setCreateQuiz] = useState(false);
  const [joinQuiz, setJoinQuiz] = useState(false);
  const [Data, setData] = useState([]);

  useEffect(() => {
    async function fetch() {
      try {
        const x = await axios.get(
          "http://localhost:8800/api/quizzes/attemptQuiz/62d27b197b51940c017aece7"
        );
        const { data } = x;
        setData(data.questions);
      } catch (err) {
        console.log(err);
      }
    }
    fetch();
  }, []);

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
