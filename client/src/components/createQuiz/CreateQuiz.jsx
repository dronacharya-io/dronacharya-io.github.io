import "./createQuiz.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import QuizSetting from "../quizSettings/quizsetting";
import QuestionCard from "../questionBuilderCard/questionBuilderCard";
import QuestionVisualiserCard from "../questionVisualiserCard/questionVisualiserCard";
import { useUserAuth } from "../../context/AuthContext";
import Button from "@mui/material/Button";
import "../questionBuilderCard/Css/Mobile_questionBuilderCard copy.css";
import "../questionBuilderCard/Css/Desktop_questionBuilderCard.css";
import { useNavigate } from "react-router-dom";
import LoginSignUpPopUp from "../../components/PopUps/LoginSignUpPopUp";
import { motion } from "framer-motion";


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
      const res = await axios.post("https://dronacharya-api.onrender.com/api/quizzes", quiz);
      const url =
        "https://dronacharya-api.onrender.com/api/users/updateUser/" +
        user.userData._id.toString();
      console.log(url);
      const arr = user.userData.quizzesCreated;
      arr.push({
        id: res.data.details._id,
        name: res.data.details.quizname,
        startDate: res.data.details.startDate,
        startTime: res.data.details.startTime,
        runTime: res.data.details.runTime,
        subject: res.data.details.subject,
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
          <div>
            <QuestionCard addQuestion={addQuestion} />
          </div>
          {true && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01]
            }}
              className="create-quiz-create-quiz-btn-div"
            >
                <button
                  id="addQuizButton"
                  variant="outlined"
                  color="success"
                  onClick={handleCreate}
                >
                  Create Quiz
                </button>
              </motion.div>
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
