import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUserAuth } from "../../context/AuthContext";
import { UserQuizCard, CardSkeleton } from "./userQuizCard";
import NoQuizzesLogo from "../../pages/images/noqiuzzes.png";
import Button from "@mui/material/Button";
import Zoom from "@mui/material/Zoom";
import { useNavigate } from "react-router-dom";

export const Classroom = () => {
  const { user } = useUserAuth();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    quizzesCreated: [{ quiz: { quizName: "null", startDate: 0, runTime: 0 } }],
  });
   
  const navigate = useNavigate();  

  useEffect(() => {
    setLoading(true);
    async function Fetch() {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/users/getUser/" + user.userData._id
        );
        setData(res.data);
      } catch (err) {
        setData(err);
      }
      setLoading(false);
    }

    return () => {
      Fetch();
    };
  }, []);


// if(data.quizzesCreated.length === 0){
//   setNoQuizzes(true);
//   console.log(noQuizzes);
// }
 

  return (
    <div className="cards">
      {loading ? (
        <>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </>
      ) : data.quizzesCreated.length > 0  ? (
        data.quizzesCreated
          ?.map((quiz, i) => {
            return (
              <div>
                <UserQuizCard
                  key={i}
                  id={quiz.id}
                  loading={loading}
                  quizName={quiz.name}
                  runTime={quiz.runTime}
                  startDate={quiz.startDate}
                />
              </div>
            ) ;
          })
          .reverse()
      ) :
          <div>
           <div style={{position:"relative", top:"12rem", left:"20rem"}}>
            <img style={{width:"400px", height:"400px"}} src={NoQuizzesLogo} />
           </div>
           <div style={{position:"relative", right:"15rem",bottom:"12rem" }} >
            <h2 style={{color: "#0d47a1", marginTop:"5rem"}} >Looks like you have'nt created any<span style={{color:"#DBBE01"}} > Quiz</span> yet.</h2>
            <Zoom in={true}>
            <Button
                  id="addQuizButton"
                  variant="contained"
                  style={{backgroundColor:"#DBBE01",marginTop:"4rem", width:"150px", height:"40px",letterSpacing:'2px'}}
                  onClick={() => navigate("/createQuiz")}
                >
                  Create Quiz
                </Button>
            </Zoom>
           </div>
          </div> 
      }
    </div>
  );
};
