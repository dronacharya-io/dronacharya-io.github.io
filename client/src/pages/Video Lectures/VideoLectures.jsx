import React, { useState } from 'react';
import "./videoLectures.css";
import { useUserAuth } from "../../context/AuthContext";
import LoginSignUpPopUp from "../../components/PopUps/LoginSignUpPopUp"; 
import { VideoLectureCards } from '../../components/cards/Video Lecture Cards/videoLectureCards';
import { VideoPage } from './videoPage';

export const VideoLectures = () => {
  const { user } = useUserAuth();
  var  [isTrue, setIsTrue] = useState(false);
  var [SelectedSubject, setSelectedSubject] = useState("");
  var Subjects = ["Maths","Mechanics","Physics"];
  
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
                    {Subjects?.map((Subjects)=>{
                      return(
                        <div onClick={()=>{setIsTrue(true); subjectCode(Subjects)}} >
                          <VideoLectureCards subjects={Subjects} />
                        </div>
                      )
                    })}
                  </>
                ) : (
                  <>
                    <VideoPage subject={SelectedSubject} />
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
