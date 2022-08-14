import React,{ useEffect, useState } from "react";
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "./quizSubmission.css";


const QuizSubmissions = () => {
  const [data, setData] = useState();
  


  const navigate = useNavigate();

  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams.get("id"));

  useEffect(() => {
    async function fetch() {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/quizzes/attemptQuiz/" + urlParams.get("id")
        );
        console.log(res.data.attendies);
        setData(res.data.attendies);

        console.log(data);
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
      <>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table" >
                <TableHead>
                  <TableRow>
                    <TableCell>Examinee</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Score</TableCell>
                    <TableCell align="right">See Attempted Answers</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.map((row) => (
                    <TableRow
                      hover 
                      role="checkbox"
                      key={row.userName}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.userName}
                      </TableCell>
                      <TableCell align="right">{row.userEmail}</TableCell>
                      <TableCell align="right">{row.score}</TableCell>
                      <TableCell align='right'>
                        <Button 
                          id="navButton"
                          variant='outlined'
                          onClick={() =>
                            navigate(
                              "../quizScore?quizId=" +
                                urlParams.get("id") +
                                "&userId=" +
                                row.userId)
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
      </>
    </>
  );
};

export default QuizSubmissions;
