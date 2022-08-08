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

const EditQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [settingsTab, setSettingsTab] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quizDetails, setQuizDetails] = useState();
  const [isOwner, setIsOwner] = useState(false);

  const navigate = useNavigate();
  const { user } = useUserAuth();

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

  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams.get("id"));
  useEffect(() => {
    setLoading(true);
    async function fetch() {
      try {
        console.log("called");
        const x = await axios.get(
          "http://localhost:8800/api/quizzes/attemptQuiz/" +
            urlParams.get("quizId")
        );
        console.log(x);
        const data = x.data;
        setIsOwner(data.creatorId === urlParams.get("userId"));
        setQuestions(data.questions);
        console.log(questions);
        setQuizDetails(data);
        console.log(quizDetails);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
    return () => {
      fetch();
    };
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      let quiz = output;
      quiz = { ...quiz, questions: questions };
      console.log(quiz);
      const res = await axios.put(
        "http://localhost:8800/api/quizzes/updateQuiz/" +
          urlParams.get("quizId"),
        quiz
      );
      const url =
        "http://localhost:8800/api/users/updateUser/" +
        user.userData._id.toString();
      console.log(url);
      const arr = user.userData.quizzesCreated;
      arr.push({
        id: res?.data.details._id,
        name: res?.data.details.quizname,
        startDate: res?.data.details.startDate,
        startTime: res?.data.details.startTime,
        runTime: res?.data.details.runTime,
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
      <div>
        <QuizSetting func={show} quizDetails={quizDetails} />

        <IoArrowBack className="back-icon-c" onClick={() => navigate("../")} />
        <div>
          <QuestionCard addQuestion={addQuestion} />
        </div>
        {true && (
          <div>
            <Zoom in={true}>
              <Button
                id="addQuizButton"
                variant="contained"
                color="success"
                onClick={handleSave}
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
                <QuestionVisualiserCard
                  question={question}
                  editQuestion={editQuestion}
                />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default EditQuiz;
