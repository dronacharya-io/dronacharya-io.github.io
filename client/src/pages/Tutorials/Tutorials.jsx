import React, { useState } from 'react';
import "./Tutorials.css";
import { VideoLectureCards } from '../../components/cards/Video Lecture Cards/videoLectureCards';
import { useUserAuth } from "../../context/AuthContext";
import LoginSignUpPopUp from "../../components/PopUps/LoginSignUpPopUp"; 
import TutorialCard from '../../components/cards/Tutorial Cards/tutorialCards';
import { Tutorials } from './TutorialData';

const Tutorial = (porps) => {
  
  const { user } = useUserAuth();
  var [SelectedSubject, setSelectedSubject] = useState("");
  var [isTrue, setIsTrue] = useState(false);
  const available_Subjects = ["Maths"];

  var subjectCode = (props) =>{
    switch(props){
      case 'Maths':
        return setSelectedSubject(2001);
      case 'Mechanics':
        return setSelectedSubject(2005);
      case 'Physics':
        return setSelectedSubject(2002);
      default:
        return setSelectedSubject(null);
    }
  }

  return (
    <>
      {
        user && ( <h1 className='video-lectures-heading' >{ !isTrue ? "#Select Subject" : SelectedSubject}</h1>)
      }
      {
        user ? (
          <>
            <div className="video-lectures-cards-parent" >
              {
                !isTrue ? (
                  <>
                    {available_Subjects?.map((Subjects)=>{
                      return(
                        <div onClick={()=>{setIsTrue(true); subjectCode(Subjects)}} >
                          <VideoLectureCards setShowVideoIcon={false} subjects={Subjects} />
                        </div>
                      )
                    })}
                  </>
                ) : (
                  <>
                    {
                      Tutorials?.map((data,index)=>{
                        return(
                          <>
                            <TutorialCard teacher={data.teacher} number={index+1} link={data.link} title={data.details} />
                          </>
                        )
                      })
                    }
                  </>
                )
              }
            </div>
          </>
        ) : (
          <LoginSignUpPopUp />
        )
      }
    </>
  )
}


export default Tutorial;