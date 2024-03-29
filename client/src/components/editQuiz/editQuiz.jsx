import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import QuizSetting from "../quizSettings/quizsetting";
import QuestionCard from "../questionBuilderCard/questionBuilderCard";
import QuestionVisualiserCard from "../questionVisualiserCard/questionVisualiserCard";
import { useUserAuth } from "../../context/AuthContext";
import Button from "@mui/material/Button";
import Lottie from "react-lottie";
import Loading from "../../lotties/mainloading.json";
import "../questionBuilderCard/Css/Mobile_questionBuilderCard copy.css";
import "../questionBuilderCard/Css/Desktop_questionBuilderCard.css";
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

  const [output, setOutput] = useState();
  const show = (x) => {
    setOutput(x);
    console.log(output);
    Disable();
  };

  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams.get("quizId"));
  useEffect(() => {
    setLoading(true);
    async function fetch() {
      try {
        console.log("called");
        const x = await axios.get(
          "https://dronacharya-api.onrender.com/api/quizzes/attemptQuiz/" +
            urlParams.get("quizId")
        );
        console.log(x);
        setIsOwner(x.data.creatorId === urlParams.get("userId"));
        setQuestions(x.data.questions);
        console.log(questions);
        setQuizDetails(x.data);
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
        "https://dronacharya-api.onrender.com/api/quizzes/updateQuiz/" +
          urlParams.get("quizId"),
        quiz
      );
      const url =
        "https://dronacharya-api.onrender.com/api/users/updateUser/" +
        user.userData._id.toString();
      console.log(url);
      const arr = user.userData.quizzesCreated;
      const arr_m = arr.filter((quiz) => {
        if (quiz.id === res.data._id) {
          return {
            id: res.data._id,
            name: res.data.quizname,
            startDate: res.data.startDate,
            startTime: res.data.startTime,
            runTime: res.data.runTime,
          };
        }
        return quiz;
      });

      console.log(arr_m);
      await axios.put(url, { quizzesCreated: arr_m });
      console.log({ quizzesCreated: arr_m });
      const redirectURL = "../classroom";
      navigate(redirectURL);
    } catch (err) {
      console.log(err);
    }
  };

  const VectorLoading = {
    loop: true,
    autoplay: true,
    animationData: Loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      {!loading ? (
        <>
          <div>
            <QuizSetting func={show} quizDetails={quizDetails} />

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
      ) : (
        <>
          <div id="loading">
            <Lottie
              isClickToPauseDisabled={true}
              options={VectorLoading}
              height={170}
              width={170}
            />
          </div>
        </>
      )}
    </>
  );
};

export default EditQuiz;
