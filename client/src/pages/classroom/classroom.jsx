import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUserAuth } from "../../context/AuthContext";
import { UserQuizCard, CardSkeleton } from "./userQuizCard";

export const Classroom = () => {
  const { user } = useUserAuth();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    quizzesCreated: [{ quiz: { quizName: "null", startDate: 0, runTime: 0 } }],
  });

  useEffect(() => {
    setLoading(true);
    async function Fetch() {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/users/getUser/" + user.userData._id
        );
        console.log(res);
        setData(res.data);
      } catch (err) {
        setData(err);
      }
      setTimeout(()=>{setLoading(false)},1000);
    }

    return () => {
      Fetch();
    };
  }, []);

  return (
    <div className="cards">
      {loading ? (
        <>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </>
      ) : (
        data.quizzesCreated?.map((quiz, i) => {
          return (
            <div>
              <UserQuizCard
                key={i}
                loading={loading}
                quizName={quiz.name}
                runTime={quiz.runTime}
                startDate={quiz.startDate}
              />
            </div>
          );
        })
      )}
    </div>
  );
};
