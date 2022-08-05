import React, { useEffect, useState } from "react";
import "./quizSettings.css";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Box from "@mui/material/Box";
import { Drawer } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@mui/material/Checkbox";


const QuizSetting = (props) => {
  const [values, setValues] = useState({
    quizname: undefined,
    subject: undefined,
    isMcq: true,
    timePerQuestion: 15,
    isNegative: false,
    positiveMarking: 1,
    negativeMarking: 0,
    startDate: undefined,
    startTime: undefined,
    runTime: undefined,
  });
  const [height, setHeight] = useState("800px");
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDrawerOpen(true);
    }, 1000);
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
  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          setDrawerOpen(true);
          setHeight("600px");
        }}
      >
        Quiz Settings
      </Button>
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
          <Box
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
                  onChange={handleChange}
                />

                <InputLabel htmlFor="component-simple">
                  Check if* Quiz is MCQ type.
                  <Checkbox
                    name="isMcq"
                    id="isMcq"
                    type="checkbox"
                    onChange={handleCheckbox}
                    defaultChecked
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
                  placeholder="Time Per Questiont"
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
                  onChange={handleChange}
                />
              </article>
              <article>
                <label>Is there a negative marking: </label>
                <input
                  name="isNegative"
                  id="isNegative"
                  type="checkbox"
                  onChange={handleCheckbox}
                />
              </article>
              <article id="checkbox" style={{ visibility: "hidden" }}>
                <label>Negative Marking: </label>
                <input
                  name="negativeMarking"
                  id="negativeMarking"
                  type="number"
                  min={1}
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
                  onChange={handleChange}
                />
              </article>
              <article>
                <label>Start-Time: </label>
                <input
                  name="startTime"
                  id="startTime"
                  type="time"
                  onChange={handleChange}
                />
              </article>
              <article>
                <label>Run-Time: </label>
                <input
                  name="runTime"
                  id="runTime"
                  type="time"
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
    </>
  );
};

export default QuizSetting;
