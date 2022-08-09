import React, { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function TableCard(props) {
  const [examinee] = useState({
    name: undefined,
    email : undefined,
    //score is yet to be added
  });


  const createData = (examinee) => { //add Score of the examinee here also
    return { examinee.name, examinee.excalories };
  }

  return (
    <div>

    </div>
  )
}

export default TableCard;