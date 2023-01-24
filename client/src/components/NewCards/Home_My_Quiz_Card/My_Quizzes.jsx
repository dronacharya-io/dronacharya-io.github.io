import React from 'react';
import "./My_Quizzes.css";
import Lottie from "react-lottie";

export const My_Quizzes = (props) => {

  return (
    <div className='My-Quizzes-main-div' >
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
