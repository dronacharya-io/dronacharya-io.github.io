import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import TableHead from '@mui/material/TableHead';
import TableCard from "./QuizSubmisionTable/TableCard";

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
            <TableCard name={attendie.userName} score={attendie.score} email={attendie.userEmail} userID={attendie.userId} />
          </>
        );
      })}
      
    </>
  );
};

export default QuizSubmissions;
