import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "./quizSubmission.css";
import Lottie from "react-lottie";
import NoAttendies from "../../lotties/man.json";
import Loading from "../../lotties/mainloading.json";
import { useUserAuth } from "../../context/AuthContext";
import Heading from "../../components/HeadingText/heading";

const QuizSubmissions = () => {
  const [data, setData] = useState([]);
  const { user } = useUserAuth();
  var [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const urlParams = new URLSearchParams(window.location.search);
  console.log('id', urlParams.get("id"));


  async function Fetch() {
    console.log('fetching...');
    try {
      const res = await axios.get(
        "https://dronacharya-api.onrender.com/api/quizzes/attemptQuiz/" + urlParams.get("id")
      );
      console.log(res.data.attendies);
      setData(res.data.attendies);
      // x = res.data.attendies;
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
    // setLoading(false);
    // loading = false;
  }

  useEffect(() => {
    Fetch();
  }, []);


  const noAttendies = {
    loop: true,
    autoplay: true,
    animationData: NoAttendies,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const VectorLoading = {
    loop: true,
    autoplay: true,
    animationData: Loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
    <Heading title={ "QUIZ ATTENDIES"} />
      {/* {loading ? (
        <div id="loading">
          <Lottie
            isClickToPauseDisabled={true}
            options={VectorLoading}
            height={170}
            width={170}
          />
        </div>
      ) : ( */}

      { data.length < 1 ? (
        <div>
          <Lottie   isClickToPauseDisabled={true}  options={noAttendies}  />
          <h2> Looks like no one has <span>attended</span> your <span>quiz</span> yet. </h2>
        </div>) : (
        <div className="quiz-submissions-page-div-submission" >
        <Paper sx={{ width: "100%", overflow: "hidden", }} elevation={3}>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              stickyHeader
              aria-label="sticky table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Examinee</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Score</TableCell>
                  <TableCell align="right">See Attempted Answers</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow
                    hover
                    role="checkbox"
                    key={row.userName}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.userName}
                    </TableCell>
                    <TableCell align="right">{row.userEmail}</TableCell>
                    <TableCell align="right">{row.score}</TableCell>
                    <TableCell align="right">
                      <Button
                        id="navButton"
                        variant="outlined"
                        onClick={() =>
                          navigate(
                            "../quizScore?quizId=" +
                            urlParams.get("id") +
                            "&userId=" +
                            row.userId
                          )
                        }
                      >
                        Answers
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
      ) }
    </>
  );
};

export default QuizSubmissions;
