import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TablePagination from '@mui/material/TablePagination';

function TableCard(props) {
  const [examinee, setExaminee] = useState({
    name: undefined,
    email : undefined,
    userID: undefined,
    score: 0
  })

  const urlParams = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  useEffect(()=>{
    setExaminee({
      name: props.name,
      email: props.email,
      userID:props.userID,
      score: props.score
    })
  },[])

  const createData = (name, email, userID, score) => { 
    return {  name , email, userID, score  }
  };

  const rows =[ 
    createData(examinee.name, 
      examinee.email,
      examinee.userID, 
      examinee.score)];

  return (
    <div>
  
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow stickyHeader >
                  <TableCell>Examinee</TableCell>
                  <TableCell align="right">ExaminEmail</TableCell>
                  <TableCell align="right">Examinee-score</TableCell>
                  <TableCell align="right">See Attemted Answers</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.score}</TableCell>
                    <TableCell align='right'>
                      <Button 
                        id=""
                        variant='outlined'
                        onClick={() =>
                          navigate(
                            "../quizScore?quizId=" +
                              urlParams.get("id") +
                              "&userId=" +
                              examinee.userID
                          )
                        }
                      >
                      Click
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      
    </div>
  )
}

export default TableCard;