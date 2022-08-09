import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const QuizSubmissions = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams.get("id"));

  useEffect(() => {
    async function fetch() {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/quizzes/attemptQuiz/" + urlParams.get("id")
        );
        setData(res.data.attendies);
        console.log(data)
      } catch (err) {
        console.log(err.message);
      }
    }
    return () => {
      fetch();
    };
  }, []);

  return (
    <>
      {data?.map((attendie) => {
        return (
          <> 
            <button
              onClick={() =>
                navigate(
                  "../quizScore?quizId=" +
                    urlParams.get("id") +
                    "&userId=" +
                    attendie.userId
                )
              }
            >
              {attendie.score} 
            </button>
          </>
        );
      })}
    </>
  );
};

export default QuizSubmissions;
