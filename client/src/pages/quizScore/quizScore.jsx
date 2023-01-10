import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

const QuizScore = () => {
  const [report, setReport] = useState();

  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams.get("quizId"));

  async function fetch() {
    try {
      const res = await axios.get(
        "https://dronacharya-api.onrender.com/api/quizzes/attemptQuiz/" +
        urlParams.get("quizId")
      );
      setReport(
        res.data.attendies.filter((x) => {
          return x.userId === urlParams.get("userId");
        })
      );
      console.log(report);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      {report?.map((unit) => {
        return (
          <>
            {unit.submissions.map((submission) => {
              return (
                <>
                  <p>{submission.submittedAns}</p>
                </>
              );
            })}
          </>
        );
      })}
    </>
  );
};

export default QuizScore;
