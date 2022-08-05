import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

const QuizScore = () => {
  const [report, setReport] = useState();

  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams.get("quizId"));
  useEffect(() => {
    async function fetch() {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/quizzes/attemptQuiz/" +
            urlParams.get("quizId")
        );
        var data = res.data.attendies.filter((x) => {
          return x.userId === urlParams.get("userId");
        });
        setReport(data);
        console.log(report);
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
      {report?.map((unit) => {
        return <p>{unit.submissions.id}</p>;
      })}
    </>
  );
};

export default QuizScore;
