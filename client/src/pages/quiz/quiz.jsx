import "./quiz.css";
import React, { useState, useEffect } from "react";
import CreateQuiz from "../../components/createQuiz/CreateQuiz";
import JoinQuiz from "../../components/joinQuiz/JoinQuiz";
import axios from "axios";
import { useUserAuth } from "../../context/AuthContext";
import TypeAnimation from "react-type-animation";

export const Quiz = () => {
  const { user } = useUserAuth();

  const [createQuiz, setCreateQuiz] = useState(false);
  const [joinQuiz, setJoinQuiz] = useState(false);
  const [Data, setData] = useState([]);
  const [quizDetails, setQuizDetails] = useState(undefined);
  const [quizCode, setQuizCode] = useState(false);
  const [id, setId] = useState();

  const handleChange = (e) => {
    setId(e.target.value);
  };

  const fetch = async () => {
    try {
      const x = await axios.get(
        "http://localhost:8800/api/quizzes/attemptQuiz/" + id
      );
      const { data } = x;
      setData(data.questions);
      setQuizDetails({
        id: data._id,
        name: data.quizname,
        startDate: data.startDate,
      });
      console.log(quizDetails);
      setQuizCode(false);
      setJoinQuiz(true);
    } catch (err) {
      console.log(err);
    }
  };

  const Toggle = () => {
    setCreateQuiz(false);
    setJoinQuiz(false);
  };

  return (
    <>
      {!createQuiz && !joinQuiz && !quizCode && (
        <>
          <TypeAnimation
            cursor={true}
            sequence={["namaste" + user.displayName]}
            wrapper="h2"
          />
          <div id="q-mainBody">
            <button className="Quiz" onClick={() => setCreateQuiz(true)}>
              Create a Quiz
            </button>
            <button
              className="Quiz"
              onClick={() => {
                setQuizCode(true);
                console.log("called");
              }}
            >
              Join a Quiz
            </button>
          </div>
        </>
      )}
      {createQuiz && !joinQuiz && !quizCode && (
        <div id="q-mainBody">
          <div id="question-section">
            <CreateQuiz function={Toggle} />
          </div>
        </div>
      )}
      {joinQuiz && !createQuiz && !quizCode && (
        <div id="q-mainBody">
          <div id="attempt-section">
            <JoinQuiz function={Toggle} data={Data} quizDetails={quizDetails} />
          </div>
        </div>
      )}
      {!createQuiz && !joinQuiz && quizCode && (
        <div>
          <input placeholder="quiz id" onChange={handleChange} />
          <button onClick={fetch}>submit</button>
        </div>
      )}
    </>
  );
};
