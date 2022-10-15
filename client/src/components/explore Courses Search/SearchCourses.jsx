import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "./SearchCourse.css";

const SearchCourses = ( props ) => {
    const [open, setOpen] = React.useState(false);
    const [collgeName, setCollegeName] = React.useState('')
    const [standard, setStandard] = React.useState('')
    const [language, setLanguage] = React.useState('')
    const [age, setAge] = React.useState('');
  


    const handleChangeCollege = (event) => {
      setCollegeName(event.target.value);
    }

    const handleChangeClass = (event) => {
      setStandard(event.target.value);
    }

    const handleChangeLanguage = (event) => {
      setLanguage(event.target.value);
    }


  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason !== 'backdropClick') {
        setOpen(false);
      }
    };

  return (
    <div>
        <Button variant='outlined' className="Search-course-component-main-botton" onClick={handleClickOpen}>Let's go</Button>
        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Fill the form</DialogTitle>
        <DialogContent>
            <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-dialog-select-label">College</InputLabel>
                <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={collgeName}
                onChange={handleChangeCollege}
                input={<OutlinedInput label="College" />}
                >
                <MenuItem value={'VBPC'}>V.B.P.C.</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-dialog-select-label">Class</InputLabel>
                <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={standard}
                onChange={handleChangeClass}
                input={<OutlinedInput label="Class" />}
                >

                <MenuItem value={'firstYear'}>1st Year</MenuItem>
                </Select>
            </FormControl>
            
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-dialog-select-label">Language</InputLabel>
                <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={language}
                onChange={handleChangeLanguage}
                input={<OutlinedInput label="Language" />}
                >

                <MenuItem value={'hindi'}>Hindi</MenuItem>
                <MenuItem value={'english'}>English</MenuItem>
                </Select>
            </FormControl>
            </Box>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
        </Dialog>
    </div>
  )
}

export default SearchCourses