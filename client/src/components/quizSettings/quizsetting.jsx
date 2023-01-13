import React, { useEffect, useState } from "react";
import "./Mobile_quizSettings.css";
import "./Desktop_quizSettings.css";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Box from "@mui/material/Box";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { Snackbar } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@mui/material/Checkbox";
import SettingsIcon from "@mui/icons-material/Settings";
import Lottie from "react-lottie";
import Loading from "../../lotties/mainloading.json";
import animationData from "../../lotties/spaceman.json";
import RocketData from "../../lotties/fillformalert.json";
import Sparkles from "../../lotties/stars.json";
import Zoom from "@mui/material/Zoom";
import spaceManTwo from "../../lotties/spaceman2.json";
import sunAnimation from "../../lotties/sun.json";
import { useUserAuth } from "../../context/AuthContext";
import Heading from "../HeadingText/heading";

const QuizSetting = (props) => {
  const { user } = useUserAuth();
  const [values, setValues] = useState();
  const [loading, setLoading] = useState(true);

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [alertStatus, setAlertStatus] = useState(false);

  useEffect(() => {
    setLoading(true);
    props.quizDetails ? setValues(props.quizDetails) : console.log("");
    setLoading(false);
    setTimeout(() => {
      setDrawerOpen(true);
      setAlertStatus(true);
    }, 10);
  }, []);

  const handleCancle = () =>{
    setDrawerOpen(false);
  }

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
    setValues({ ...values, creatorId: user?.userData._id });
    props.func(values);
    setDrawerOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const spaceMan = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const spaceRocket = {
    loop: true,
    autoplay: true,
    animationData: RocketData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const sparkles = {
    loop: true,
    autoplay: true,
    animationData: Sparkles,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const spaceman2 = {
    loop: true,
    autoplay: true,
    animationData: spaceManTwo,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const sun = {
    loop: true,
    autoplay: true,
    animationData: sunAnimation,
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
      {!loading ? (
        <div className="quiz-settings-main-container" >
          <div id="centerContent">
            <div className="quizSettingBtn-div" >
              <Button
                variant="outlined"
                onClick={() => {
                  setDrawerOpen(true);
                }}
                className="quizSettingBtn"
              >
                <SettingsIcon />
                Settings
              </Button>
            </div>
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
            <div className="quiz-settings-sweepable-drawer" >
             
              <SwipeableDrawer
                anchor="top"
                open={isDrawerOpen}
                onClose={() => {
                  setDrawerOpen(false);
                }}
                style={{ height:"300px" }}
                className="drawerBody"
              >
                <div className="quiz-settings-div-containing-vectors-and-form" >
                  
                  <div className="quiz-settings-div-containing-vectors" >
                      <div id="quiz-settings-img-div">
                        <div id="sparkles">
                          <Lottie
                            isClickToPauseDisabled={true}
                            options={sparkles}
                            height={900}
                            width={480}
                          />
                        </div>
                        <div id="img-div1">
                          <Zoom
                            in={true}
                            style={{ transitionDelay: true ? "800ms" : "0ms" }}
                          >
                            <div>
                              <Lottie
                                isClickToPauseDisabled={true}
                                options={sun}
                                height={200}
                                width={200}
                              />
                            </div>
                          </Zoom>
                        </div>

                        <div id="img-div2">
                          {/* <Zoom
                            in={true}
                            style={{ transitionDelay: true ? "600ms" : "0ms" }}
                          >
                            <div>
                              <Lottie
                                isClickToPauseDisabled={true}
                                options={spaceMan}
                                height={450}
                                width={500}
                              />
                            </div>
                          </Zoom> */}
                        </div>
                        <div id="img-div3">
                          <Zoom
                            in={true}
                            style={{ transitionDelay: true ? "600ms" : "0ms" }}
                          >
                            <div>
                              <Lottie
                                isClickToPauseDisabled={true}
                                options={spaceman2}
                                height={650}
                                width={500}
                              />
                            </div>
                          </Zoom>
                        </div>
                      </div>
                  </div>

                  <div className="quiz-settings-div-containing-form" >
                      <Box
                      p={2}
                      sx={{ width: "auto", height: "700px" }}
                      role="presentation"
                      textAlign="center"
                      className="tempClassName"
                    >
                      <Heading title={"QUIZZ DETAILS"} />
                      <Box
                        id="form"
                        component="form"
                        sx={{ "& .MuiTextField-root": { m: 0, width: "25ch" } }}
                        noValidate
                        autoComplete="off"
                      >
                        <div>
                          <Zoom
                            in={true}
                            style={{ transitionDelay: true ? "300ms" : "0ms" }}
                          >
                            <div>
                              <InputLabel id="inputLabel">Quiz name</InputLabel>
                              <input
                                style={{ width: "auto" }}
                                required
                                id="quizname"
                                label="Required"
                                name="quizname"
                                value={values?.quizname}
                                onChange={handleChange}
                              />
                            </div>
                          </Zoom>

                          <div style={{ position: "relative" }}>
                            <Zoom
                              in={true}
                              style={{ transitionDelay: true ? "300ms" : "0ms" }}
                            >
                              <div>
                                <InputLabel id="inputLabel">Subject</InputLabel>
                                <input
                                  required
                                  id="subject"
                                  label="Required"
                                  name="subject"
                                  value={values?.subject}
                                  onChange={handleChange}
                                />
                              </div>
                            </Zoom>
                            {/* <Zoom
                              in={true}
                              style={{ transitionDelay: true ? "300ms" : "0ms" }}
                            >
                              <div>
                                <InputLabel
                                  id="inputLabel"
                                  htmlFor="component-simple"
                                >
                                  Check if Test is MCQ type.
                                  <Checkbox
                                    name="isMcq"
                                    id="isMcq"
                                    type="checkbox"
                                    onChange={handleCheckbox}
                                    defaultChecked={values?.isMcq}
                                    color="success"
                                  />
                                </InputLabel>
                              </div>
                            </Zoom> */}
                            {/* <Zoom
                              in={true}
                              style={{ transitionDelay: true ? "300ms" : "0ms" }}
                            >
                              <div >
                                <InputLabel id="inputLabel">
                                  Time per Question
                                </InputLabel>
                                <input
                                  required
                                  type="number"
                                  id="timePerQuestion"
                                  name="timePerQuestion"
                                  label="Required"
                                  value={values?.timePerQuestion}
                                  onChange={handleChange}
                                />
                              </div>
                            </Zoom> */}
                          </div>
                          <div style={{ position: "relative" }}></div>
                          {/* <Zoom
                            in={true}
                            style={{ transitionDelay: true ? "300ms" : "0ms" }}
                          >
                            <div>
                              <article>
                                <InputLabel id="inputLabel">
                                  Positive marking
                                </InputLabel>
                                <input
                                  name="positiveMarking"
                                  id="positiveMarking"
                                  label="Required"
                                  type="number"
                                  min={1}
                                  value={values?.positiveMarking}
                                  onChange={handleChange}
                                />
                              </article>
                            </div>
                          </Zoom> */}
                          {/* <Zoom
                            in={true}
                            style={{ transitionDelay: true ? "300ms" : "0ms" }}
                          >
                            <div>
                              <article>
                                <InputLabel id="inputLabel">
                                  Is there a negative marking:{" "}
                                </InputLabel>
                                <Checkbox
                                  name="isNegative"
                                  id="isNegative"
                                  type="checkbox"
                                  defaultChecked={
                                    values?.isNegative ? values.isNegative : undefined
                                  }
                                  onChange={handleCheckbox}
                                />
                              </article>
                            </div>
                          </Zoom> */}
                          {/* <Zoom
                            in={true}
                            style={{ transitionDelay: true ? "300ms" : "0ms" }}
                          >
                            <div>
                              <article
                                id="checkbox"
                                style={{
                                  visibility: !values?.isNegative ? "hidden" : "",
                                }}
                              >
                                <InputLabel id="inputLabel">
                                  Specify negative marking
                                </InputLabel>
                                <input
                                  name="negativeMarking"
                                  id="negativeMarking"
                                  type="number"
                                  min={0}
                                  value={values?.negativeMarking}
                                  onChange={handleChange}
                                />
                              </article>
                            </div>
                          </Zoom> */}
                          <Zoom
                            in={true}
                            style={{ transitionDelay: true ? "300ms" : "0ms" }}
                          >
                            <div>
                              <article>
                                <InputLabel id="inputLabel">Start Date: </InputLabel>
                                <input
                                  name="startDate"
                                  id="startDate"
                                  type="date"
                                  min={curDate}
                                  value={values?.startDate}
                                  onChange={handleChange}
                                />
                              </article>
                            </div>
                          </Zoom>
                          <Zoom
                            in={true}
                            style={{ transitionDelay: true ? "300ms" : "0ms" }}
                          >
                            <div>
                              <article>
                                <InputLabel id="inputLabel">Start-Time: </InputLabel>
                                <input
                                  name="startTime"
                                  id="startTime"
                                  type="time"
                                  value={values?.startTime}
                                  onChange={handleChange}
                                />
                              </article>
                            </div>
                          </Zoom>
                          <Zoom
                            in={true}
                            style={{ transitionDelay: true ? "300ms" : "0ms" }}
                          >
                            <div>
                              <article>
                                <InputLabel id="inputLabel">Run-Time: </InputLabel>
                                <input
                                  name="runTime"
                                  id="runTime"
                                  type="time"
                                  value={values?.runTime}
                                  onChange={handleChange}
                                />
                              </article>
                            </div>
                          </Zoom>
                        </div>
                      </Box>
                      <Zoom
                            in={true}
                            style={{ transitionDelay: true ? "300ms" : "0ms" }}
                          >
                            <div id="quiz-settings-vector-addbtn-canclebtn">
                            <div id="rocket">
                                <Lottie
                                  isClickToPauseDisabled={true}
                                  options={spaceRocket}
                                  height={40}
                                  width={40}
                                />
                              </div>
                              <Button
                                id="addSettingButton"
                                variant="contained"
                                onClick={handleClick}
                              >
                                Add Settings
                              </Button>
                              <div>
                                <Button
                                  className="i-will-fill-later-btn"
                                  variant="contained"
                                  color="warning"
                                  onClick={handleCancle}
                                >
                                  I'll fill it later!
                                </Button>
                              </div>
                            </div>
                          </Zoom>
                    </Box>
                  </div>
                </div>
              </SwipeableDrawer>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div id="loading">
            <Lottie
              isClickToPauseDisabled={true}
              options={VectorLoading}
              height={170}
              width={170}
            />
          </div>
        </>
      )}
    </>
  );
};

export default QuizSetting;


{
  /*                  */
}