import "./classroom.css";
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

  return (
    <div className="cards">
      {!loading ? (
        data.quizzesCreated.length > 0 ? (
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
              );
            })
            .reverse()
        ) : (
          <div>
            <div style={{ position: "relative", top: "5rem", right: "2rem" }}>
              <img
                style={{ width: "400px", height: "400px" }}
                src={NoQuizzesLogo}
              />
            </div>
            <div style={{ position: "relative", right: "2rem", top: "2rem" }}>
              <p className="para">
                Looks like you haven't created any
                <span> Quiz</span> yet.
              </p>
              <Zoom in={true}>
                <div>
                  <Button
                    id="joinQuizButton"
                    variant="contained"
                    style={{
                      backgroundColor: "#ffb74d",
                      marginTop: "4rem",
                      left: "20px",
                      width: "150px",
                      height: "40px",
                      letterSpacing: "2px",
                    }}
                    onClick={() => navigate("/")}
                  >
                    Get Started
                  </Button>
                </div>
              </Zoom>
            </div>
          </div>
        )
      ) : (
        <>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </>
      )}
    </div>
  );
};
