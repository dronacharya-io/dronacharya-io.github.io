import "./joinQuiz-mobile.css";
import "./joinQuiz-desktop.css";
import React, { useState, useEffect } from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from "axios";
import { styled } from "@mui/material/styles";
import { useUserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Lottie from "react-lottie";
import Loading from "../../lotties/mainloading.json";
import LoginSignUpPopUp from "../PopUps/LoginSignUpPopUp.jsx";
import mainDivVector from "../../lotties/join-quiz-main-div.json";
import { motion } from "framer-motion";
import Heading from "../HeadingText/heading.jsx";
import Zoom from "@mui/material/Zoom";
import ExitquizPopUp from "../PopUps/Warnning popup/exitquizPopUp";
import LinearProgress from '@mui/material/LinearProgress';

const JoinQuiz = () => {
  const navigate = useNavigate();
  const alphabets = ["A", "B", "C", "D", "E", "F", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  const [counter, setCounter] = useState(0);
  const [submission, setSubmission] = useState({ submittedAns: undefined });
  const [submissions, setSubmissions] = useState([]);
  const [score, setScore] = useState(0);
  const [Data, setData] = useState();
  const [quizDetails, setQuizDetails] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [attendies, setAttendies] = useState();
  const [index, setIndex] = useState();
  const [isFound, setIsFound] = useState();
  const [positiveMarking, setPositiveMarking] = useState(0);
  const [negativeMarking, setNegativeMarking] = useState(0);
  var [lastQuestion, setLastQuestion] = useState(false);
  var [selectedOption, setSelectedOption] = useState(undefined)
  const { user, googleSignIn } = useUserAuth();
  const urlParams = new URLSearchParams(window.location.search);
  const [lineWidth, setLineWidth] = useState("0")
  var totalLineWidth = `${lineWidth}px`
  console.log(urlParams.get("id"));

  useEffect(() => {
    setLoading(true);
    async function fetch() {
      try {
        console.log("called");
        const x = await axios.get(
          "https://dronacharya-api.onrender.com/api/quizzes/attemptQuiz/" + urlParams.get("id")
        );
        console.log(x);
        setData(x.data.questions);
        // setIswrittenType(x.data.questions[0].isWrittenType);
        var { _id, quizname, startDate, runTime, subject } = x.data;
        console.log(Data);
        setQuizDetails({
          id: _id,
          name: quizname,
          startDate: startDate,
          runTime: runTime,
          subject: subject,
        });
        setAttendies(x.data.attendies);
        setPositiveMarking(x.data.positiveMarking);
        setNegativeMarking(x.data.negativeMarking);
        console.log(quizDetails);
        setIndex(0);
        const arr = x.data.attendies;
        const IsFound = arr.some((element) => {
          if (element.id === user?.userData?._id) {
            return true;
          }
          return false;
        });
        setIsFound(IsFound);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
    return () => {
      fetch();
    };
  }, [user]);

  

  const TakeAnswer = async () => {
    console.log(Data[index]);
    Data[index + 1] ? setIndex(index + 1) : setIndex(index);
    // setIswrittenType(Data[index].isWrittenType);
    handleSubmit();
    if (Data[index].correctAns === Data[index].options[submissions[index].submittedAns]) {
      setScore(score + positiveMarking);
      console.log("correct");
    }
    if (Data[index].correctAns !== Data[index].options[submissions[index].submittedAns]) {
      setScore(score - negativeMarking);
      console.log("wrong");
    }
    if (Data[index + 1]) {
      setCounter(index + 1);
    }
    if (!Data[index + 1]) {
      if (Data[index].correctAns === Data[index].options[submissions[index].submittedAns]) {
        setScore(score + positiveMarking);
        console.log("correct");
      }
      if (Data[index].correctAns !== Data[index].options[submissions[index].submittedAns]) {
        setScore(score - negativeMarking);
        console.log("wrong");
      }
      if (!isFound) {
        try {
          const url =
            "https://dronacharya-api.onrender.com/api/users/updateUser/" +
            user.userData._id.toString();
          console.log(url);
          const arr = user.userData.quizzesSubmitted;
          arr.push(quizDetails);
          console.log(arr);
          await axios.put(url, { quizzesSubmitted: arr });
          console.log({ quizzesSubmitted: arr });
        } catch (err) {
          console.log(err.message);
        }
        try {
          attendies.push({
            userId: user.userData._id,
            userName: user.displayName,
            userEmail: user.email,
            submissions: submissions,
            score: score,
          });
          await axios.put(
            "https://dronacharya-api.onrender.com/api/quizzes/updateQuiz/" +
            urlParams.get("id"),
            { attendies: attendies }
          );
        } catch (err) {
          console.log(err.message);
        }
        alert("Test Submitted!");
        navigate("../scorecard");
      } else {
        alert("Test already attempted!");
      }
    }
    console.log(score);
  };

  const handleChange = (value) => {
    // const value = e.target.value;
    setSelectedOption(value);
    console.log('value', value);
    // document.getElementById("submittedAns").value("");
  };
  const Input = styled("input")({
    display: "none",
  });

  const handleSubmit = () => {
    const newSubmission = {
      submittedAns: selectedOption,
      id: new Date().getTime().toString(),
      qid: Data[index].id,
    };
    setSubmissions([...submissions, newSubmission]);
    setSelectedOption(undefined);

    console.log(submissions);
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
      {user ? (
        <>
          {loading ? (
            <div id="loading">
              <Lottie
                isClickToPauseDisabled={true}
                options={VectorLoading}
                height={170}
                width={170}
              />
            </div>
          ) : (
            <div className="join-quiz-first-container" >
              <div className="join-quiz-second-container">
                <ArrowBackIosIcon
                  className="join-quiz-arrowBack-icon"
                  onClick={()=>{}}
                />
              </div>
              <div className="join-quiz-third-container" >
                <div className="join-quiz-third-containers-first-div" >
                  <h2 className="join-quiz-question" >{`${Data[index].Question}`}</h2>
                </div>
                <div className="join-quiz-third-containers-second-div"  >
                  <h4 className="join-quiz-under-question-text" >Answer and get points</h4>
                </div>
              </div>
              <div className="join-quiz-fourth-container" >
                <div className="join-quiz-fourth-containers-first-div" >
                  <h4 className="join-quiz-step-navigator" ><span className="join-quiz-navigator-first-span" >Question  {index+1} </span><span className="join-quiz-navigator-second-span" >of {Data.length}</span></h4>
                </div>
                <div className="join-quiz-fourth-containers-second-div" style={{width:totalLineWidth}} >
                 
                </div>
                <div className="join-quiz-fifth-container" > 
                  {Data[index].options.map((option, j) => {
                      return (
                        <div className="join-quiz-fifth-containers-first-div" >
                          <div className="join-quiz-fifth-containers-first-divs-second-div"  >
                            <div  className="join-quiz-fifth-containers-first-divs-second-divs-first-div" >
                              <p className="join-quiz-option-number" >{alphabets[j]}</p>
                            </div>
                          </div>
                          <div className="join-quiz-fifth-containers-second-div" >
                            <h4 className="join-quiz-option-value" >{option.value}</h4>
                          </div>
                        </div>);
                    })}
                </div>
              </div>
              <div className="join-quiz-sixth-container" >
                <button className="join-quiz-next-btn" variant="outlined" onClick={() => TakeAnswer()}>
                  {Data?.length === index + 1 ? "Submit" : "Next"}
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <LoginSignUpPopUp />
      )}
    </>
  );
};

export default JoinQuiz;



// <div className="join-quiz-main-conatainer" >
//                   <div className="join-quiz-question-navigation-tab">
//                     {Data?.map((question, i) => {
//                       const { id } = question;
//                       return (
//                         <>
//                           <div
//                             variant="outlined"
//                             onClick={() => {
//                               setIndex(i);
//                               // setIswrittenType(Data[i].isWrittenType);
//                             }}
//                           >
//                             <h4 className="join-quiz-question-locator" >
//                               {i + 1}
//                             </h4>
//                           </div>
//                         </>
//                       );
//                     })}
//                   </div>

                
//                   <motion.div
//                     className="join-quiz-main-child-div"
//                     initial={{ y: 10, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     exit={{ y: -10, opacity: 0 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                       <h3 className="join-quiz-question-number" >Q.{index + 1}</h3>
//                       <h3 className="join-quiz-question-value" >{`${Data[index].Question.toUpperCase()}`}</h3>
                
//                       {Data[index].options.map((option, j) => {
//                         return (
//                           <>
//                             <p className="join-quiz-option-number" >{alphabets[j]}</p>
//                             <h4 className="join-quiz-option-value" >{option.value.toUpperCase()}</h4>
//                           </>);
//                       })}
//                     {/* <motion.div
//                       initial={{ y: 10, opacity: 0 }}
//                       animate={{ y: 0, opacity: 1 }}
//                       exit={{ y: -10, opacity: 0 }}
//                       transition={{ duration: 0.5 }}
//                       className="join-quiz-correct-answer">
//                       <h4 className="option-value-ans-join-quiz" >ANSWER</h4>
//                       <textarea
//                         type="text"
//                         className="submittedAns"
//                         name="submittedAns"
//                         onChange={handleChange}
//                       />
//                     </motion.div> */}
//                   </motion.div>
//                   <Button className="join-quiz-next-btn" variant="outlined" onClick={() => TakeAnswer()}>
//                     {Data?.length === index + 1 ? "Submit Quiz" : "Next Question"}
//                   </Button>
            
//             </div>