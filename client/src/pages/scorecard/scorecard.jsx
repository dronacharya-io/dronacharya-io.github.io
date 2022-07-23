import React from "react";
import axios from "axios";
import { useUserAuth } from "../../context/AuthContext";

export const Scorecard = () => {
  const { user } = useUserAuth();
  const submissionsData = user.userData.quizzesSubmitted;
  console.log(submissionsData);

  return (
    <>
      <div id="abc">
        <h1>Scorecard</h1>
        {submissionsData.map((quiz, i) => {
          return (
            <>
              <p key={i}>{quiz.name}</p>
            </>
          );
        })}
      </div>
    </>
  );
};
