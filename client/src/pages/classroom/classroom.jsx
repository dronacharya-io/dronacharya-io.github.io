import React from "react";
import { useUserAuth } from "../../context/AuthContext";

export const Classroom = () => {
  const { user } = useUserAuth();

  return (
    <>
      <div id="abc">
        {user.userData.quizzesCreated.map((quiz, i) => {
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
