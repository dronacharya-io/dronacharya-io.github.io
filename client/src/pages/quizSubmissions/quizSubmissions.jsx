import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const QuizSubmissions = () => {
  const [data, setData] = useState();

  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams.get("id"));

  useEffect(() => {
    async function fetch() {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/quizzes/attemptQuiz/" + urlParams.get("id")
        );
        setData(res.data.attendies);
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
            <p>{attendie.userName}</p>
          </>
        );
      })}
    </>
  );
};

export default QuizSubmissions;
