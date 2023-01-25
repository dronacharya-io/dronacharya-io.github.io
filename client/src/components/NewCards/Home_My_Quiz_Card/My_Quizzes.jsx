import React from 'react';
import "./My_Quizzes.css";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";

export const My_Quizzes = (props) => {
  const navigate = useNavigate();
  return (
    <div className='My-Quizzes-main-div' onClick={() => navigate("../quizSubmissions?id=" + props.id)} >
        <div className='My-Quizzes-img-div' >
            <Lottie   isClickToPauseDisabled={true}  options={props.image}  />
        </div>
        <div className='My-Quizzes-content-div' >
            <h4 className='My-Quizzes-content-div-h4' >{props.title}</h4>
            <h3 className='My-Quizzes-content-div-h3' >{props.subject}</h3>
        </div>
    </div>
  )
}
