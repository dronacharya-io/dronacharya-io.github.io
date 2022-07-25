import React from "react";
import { useUserAuth } from "../../context/AuthContext";
import UserQuizCard from "./userQuizCard";

export const Classroom = () => {
  const { user } = useUserAuth();

  return (
      <div className="cards">
        {user.userData.quizzesCreated.map((quiz, i) => {
          return (
              <div>
                <UserQuizCard key={i} quizName={quiz.name} runTime={quiz.runTime} startDate={quiz.startDate}/>
              </div>
          );
        })}
      </div> 
  );
};
