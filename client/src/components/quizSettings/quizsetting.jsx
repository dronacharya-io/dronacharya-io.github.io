import React, { useEffect, useState } from "react";
import "./quizSettings.css";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Box from "@mui/material/Box";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Snackbar } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@mui/material/Checkbox";
import SettingsIcon from "@mui/icons-material/Settings";


const QuizSetting = (props) => {
  const [values, setValues] = useState({
    quizname: props.quizDetails?.quizname,
    subject: props.quizDetails?.subject,
    isMcq: props.quizDetails?.isMcq,
    timePerQuestion: props.quizDetails?.timePerQuestion,
    isNegative: props.quizDetails?.isNegative,
    positiveMarking: props.quizDetails?.positiveMarking,
    negativeMarking: props.quizDetails?.negativeMarking,
    startDate: props.quizDetails?.startDate,
    startTime: props.quizDetails?.startTime,
    runTime: props.quizDetails?.runTime,
  });

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [alertStatus, setAlertStatus] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDrawerOpen(true);
      setAlertStatus(true);
    }, 100);
  }, []);

  const today = new Date();
  let month = "0" + (today.getMonth() + 1);
  if (month.length === 1) {
    month = "0" + month;
  }

  var curDate = today.getFullYear() + "-" + month + "-" + today.getDate();
  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleCheckbox = (e) => {
    if (e.target.id === "isNegative") {
      if (values.isNegative) {
        document.getElementById("checkbox").style.visibility = "hidden";
        setValues({ ...values, isNegative: !values.isNegative });
      } else {
        document.getElementById("checkbox").style.visibility = "visible";
        setValues({ ...values, isNegative: !values.isNegative });
      }
    } else {
      if (e.target.value === "on") {
        setValues({ ...values, [e.target.id]: true });
      } else {
        setValues({ ...values, [e.target.id]: false });
      }
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    props.func(values);
    setDrawerOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <>
      <div id="centerContent">
        <Button
          variant="contained"
          onClick={() => {
            setDrawerOpen(true);
          }}
          id="quizSettingButton"
        >
          <SettingsIcon />
          Settings
        </Button>

        <Snackbar
          open={alertStatus}
          autoHideDuration={300000}
          onClose={() => {
            setAlertStatus(false);
          }}
        >
          <Alert
            id="alert"
            onClose={() => {
              setAlertStatus(false);
            }}
            severity="warning"
            sx={{ width: "100%" }}
          >
            Please fill details regarding your test.
          </Alert>
        </Snackbar>

        <SwipeableDrawer
          anchor="top"
          open={isDrawerOpen}
          onClose={() => {
            setDrawerOpen(false);
          }}
        >
          <Box
            p={2}
            sx={{ width: "auto", height: "600px" }}
            role="presentation"
            textAlign="center"
            id="background"
          >
          <div id="img-div">
            

          </div>
            <Box
              id="form"
              component="form"
              sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
              noValidate
              autoComplete="off"
            >
              <div>
                <InputLabel htmlFor="component-simple">Quiz name</InputLabel>
                <TextField
                  style={{ width: "50rem" }}
                  required
                  id="quizname"
                  label="Quiz name"
                  placeholder="Quizname"
                  name="quizname"
                  value={values.quizname}
                  onChange={handleChange}
                />

                <div style={{ position: "relative" }}>
                  <InputLabel htmlFor="component-simple">Subject</InputLabel>

                  <TextField
                    required
                    id="subject"
                    label="Subject"
                    placeholder="subject"
                    name="subject"
                    value={values.subject}
                    onChange={handleChange}
                  />

                  <InputLabel htmlFor="component-simple">
                    Check if* Quiz is MCQ type.
                    <Checkbox
                      name="isMcq"
                      id="isMcq"
                      type="checkbox"
                      onChange={handleCheckbox}
                      defaultChecked={values.isMcq}
                      color="success"
                    />
                  </InputLabel>
                  <InputLabel htmlFor="component-simple">
                    Specify Time per question
                  </InputLabel>
                  <TextField
                    required
                    type="number"
                    id="timePerQuestion"
                    name="timePerQuestion"
                    label="Time Per Question"
                    value={values.timePerQuestion}
                    onChange={handleChange}
                  />
                </div>
                <div style={{ position: "relative" }}></div>
                <article>
                  <label>Positive Marking: </label>
                  <input
                    name="positiveMarking"
                    id="positiveMarking"
                    type="number"
                    min={1}
                    value={values.positiveMarking}
                    onChange={handleChange}
                  />
                </article>
                <article>
                  <label>Is there a negative marking: </label>
                  <input
                    name="isNegative"
                    id="isNegative"
                    type="checkbox"
                    defaultChecked={values.isNegative}
                    onChange={handleCheckbox}
                  />
                </article>
                <article
                  id="checkbox"
                  style={{ visibility: !values.isNegative ? "hidden" : "" }}
                >
                  <label>Negative Marking: </label>
                  <input
                    name="negativeMarking"
                    id="negativeMarking"
                    type="number"
                    min={0}
                    value={values.negativeMarking}
                    onChange={handleChange}
                  />
                </article>
                <article>
                  <label>Start Date: </label>
                  <input
                    name="startDate"
                    id="startDate"
                    type="date"
                    min={curDate}
                    value={values.startDate}
                    onChange={handleChange}
                  />
                </article>
                <article>
                  <label>Start-Time: </label>
                  <input
                    name="startTime"
                    id="startTime"
                    type="time"
                    value={values.startTime}
                    onChange={handleChange}
                  />
                </article>
                <article>
                  <label>Run-Time: </label>
                  <input
                    name="runTime"
                    id="runTime"
                    type="time"
                    value={values.runTime}
                    onChange={handleChange}
                  />
                </article>
                <Button variant="contained" onClick={handleClick}>
                  "Add Settings"
                </Button>
              </div>
            </Box>
          </Box>
        </SwipeableDrawer>
      </div>
    </>
  );
};

export default QuizSetting;
