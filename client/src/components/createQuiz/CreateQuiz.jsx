import "./createQuiz.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import QuizSetting from "../quizSettings/quizsetting";
import QuestionCard from "../questionBuilderCard/questionBuilderCard";
import QuestionVisualiserCard from "../questionVisualiserCard/questionVisualiserCard";
import { useUserAuth } from "../../context/AuthContext";
import Button from "@mui/material/Button";
import "../questionBuilderCard/Css/questionBuilderCard.css";
import Zoom from "@mui/material/Zoom";
import { useNavigate } from "react-router-dom";
import LoginSignUpPopUp from "../../components/PopUps/LoginSignUpPopUp";

const CreateQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [settingsTab, setSettingsTab] = useState(false);

  const navigate = useNavigate();
  const { user, googleSignIn } = useUserAuth();

  const Disable = () => {
    setSettingsTab(!settingsTab);
  };

  const addQuestion = (x) => {
    setQuestions([...questions, x]);
  };

  const editQuestion = (x) => {
    setQuestions(
      questions.map((question) => {
        if (question.id === x.id) {
          return x;
        } else {
          return question;
        }
      })
    );
  };

  const [output, setOutput] = useState([]);
  const show = (x) => {
    setOutput(x);
    console.log(output);
    Disable();
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!user) {
      googleSignIn();
    }
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
      const redirectURL = "../classroom";
      navigate(redirectURL);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {user ? (
        <div>
          <QuizSetting func={show} />

          <IoArrowBack
            className="back-icon-c"
            onClick={() => navigate("../")}
          />
          <div>
            <QuestionCard addQuestion={addQuestion} />
          </div>
          {true && (
            <div>
              <Zoom in={true}>
                <Button
                  id="addQuizButton"
                  variant="outlined"
                  color="success"
                  onClick={handleCreate}
                >
                  Add Test
                </Button>
              </Zoom>
            </div>
          )}
          {questions.map((question) => {
            return (
              <>
                <div key={question.id}>
                  <QuestionVisualiserCard
                    question={question}
                    editQuestion={editQuestion}
                  />
                </div>
              </>
            );
          })}
        </div>
      ) : (
        <LoginSignUpPopUp />
      )}
    </>
  );
};

export default CreateQuiz;
