import React from 'react';
import "./My_Quizzes.css";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";
import * as MyQuizAnimation from "../../../lotties/Quizzes/My quizzes lotties/index.js";

export const My_Quizzes = (props) => {
  const navigate = useNavigate();
  var {one , two, three, four, five, six, seven, eight, nine, ten, eleven, twelve} = MyQuizAnimation;
  var n = [one , two, three, four, five, six, seven, eight, nine, ten, eleven, twelve];
  
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData:n[props.image],
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className='My-Quizzes-main-div' onClick={() => navigate("../quizSubmissions?id=" + props.id)} >
        <div className='My-Quizzes-img-parent-div' >
          <div className='My-Quizzes-img-div' >
              <Lottie   isClickToPauseDisabled={true}  options={defaultOptions}  />
          </div>
        </div>
        <div className='My-Quizzes-content-div' >
            <h4 className='My-Quizzes-content-div-h4' >{props.title}</h4>
            <h3 className='My-Quizzes-content-div-h3' >{props.subject}</h3>
        </div>
    </div>
  )
}
