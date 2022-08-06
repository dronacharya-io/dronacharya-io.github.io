import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUserAuth } from "../../context/AuthContext";
import { UserSubmissionCard } from "./userSubmissionCard";

export const Scorecard = () => {
  const { user, googleSignIn } = useUserAuth();
  const [submissionsData, setSubmitionsData] = useState([]);
  console.log(user);

  useEffect(() => {
    async function fetch() {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/users/getUser/" + user.userData._id
        );
        console.log(res);
        setSubmitionsData(res.data.quizzesSubmitted);
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
      {user ? (
        <>
          <h1>Scorecard</h1>
          <div className="cards">
            {submissionsData
              ?.map((quiz, i) => {
                return (
                  <>
                    <UserSubmissionCard
                      key={i}
                      quizName={quiz.name}
                      id={quiz.id}
                      runTime={quiz.runTime}
                      startDate={quiz.startDate}
                    />
                  </>
                );
              })
              .reverse()}
          </div>
        </>
      ) : (
        <button onClick={() => googleSignIn()}>Login</button>
      )}
    </>
  );
};
