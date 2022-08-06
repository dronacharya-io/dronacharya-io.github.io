import React, {useEffect, useState} from "react";
import axios from "axios";
import { useUserAuth } from "../../context/AuthContext";
import { UserQuizCard, CardSkeleton } from "../classroom/userQuizCard";

export const Scorecard = () => {
  const { user } = useUserAuth();
  const [submissionsData,setSubmitionsData] = useState([]) ;
  console.log(user)
  
  
  useEffect(() => {
    async function fetch() {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/users/getUser/" + user.userData.quizzesSubmitted
        );
        console.log(res);
        setSubmitionsData(res.data);
      }catch (err) {
        console.log(err.message);
      }
    }
    return () => {
      fetch();
    };
  }, []);

  

  return (
    <>
      <h1>Scorecard</h1>
      <div className="cards">
        {submissionsData?.map((quiz, i) => {
          return (
            <>
               <UserQuizCard
                key={i}
                quizName={quiz.name}
                id={quiz.id}
                runTime={quiz.runTime}
                startDate={quiz.startDate}
               
                />
            </>
          );
        }).reverse()}
      </div>
    </>
  );
};
