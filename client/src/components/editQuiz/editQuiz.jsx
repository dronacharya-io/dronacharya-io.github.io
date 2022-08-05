// import "./editQuiz.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
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
  //   const [settingsTab, setSettingsTab] = useState(false);
  const [quizDetails, setQuizDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  //   const navigate = useNavigate();
  const { user } = useUserAuth();

  //   const Disable = () => {
  //     setSettingsTab(!settingsTab);
  //   };

  //   const addQuestion = (x) => {
  //     setQuestions([...questions, x]);
  //   };

  const [output, setOutput] = useState([]);
  //   const show = (x) => {
  //     setOutput(x);
  //     console.log(output);
  //     Disable();
  //   };

  useEffect(() => {
    setLoading(true);
    async function Fetch() {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/users/getUser/" + user.userData._id
        );
        setData(res.data);
      } catch (err) {
        setData(err);
      }
      setLoading(false);
    }

    return () => {
      Fetch();
    };
  }, []);

  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams.get("id"));
  useEffect(() => {
    setLoading(true);
    async function fetch() {
      try {
        console.log("called");
        const x = await axios.get(
          "http://localhost:8800/api/quizzes/attemptQuiz/" + urlParams.get("id")
        );
        console.log(x);
        const { data } = x;
        setQuestions(data.questions);
        console.log(questions);
        setQuizDetails({
          id: data._id,
          name: data.quizname,
          startDate: data.startDate,
        });
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

  //   const handleCreate = async (e) => {
  //     e.preventDefault();
  //     try {
  //       let quiz = output;
  //       quiz = { ...quiz, questions: questions };
  //       console.log(quiz);
  //       const res = await axios.put("http://localhost:8800/api/quizzes", quiz);
  //       const url =
  //         "http://localhost:8800/api/users/updateUser/" +
  //         user.userData._id.toString();
  //       console.log(url);
  //       const arr = user.userData.quizzesCreated;
  //       arr.push({
  //         id: res.data.details._id,
  //         name: res.data.details.quizname,
  //         startDate: res.data.details.startDate,
  //         startTime: res.data.details.startTime,
  //         runTime: res.data.details.runTime,
  //       });
  //       console.log(arr);
  //       await axios.put(url, { quizzesCreated: arr });
  //       console.log({ quizzesCreated: arr });
  //       const redirectURL = "../classroom";
  //       navigate(redirectURL);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  return (
    <>
      {/* <QuizSetting func={show} />
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
              onClick={handleCreate}
            >
              add quiz
            </Button>
          </Zoom>
        </div>
      )} */}
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
  );
};

export default EditQuiz;
