import React, { useState } from 'react';
import "./videoLectures.css";
import { useUserAuth } from "../../context/AuthContext";
import LoginSignUpPopUp from "../../components/PopUps/LoginSignUpPopUp"; 
import { VideoLectureCards } from '../../components/cards/Video Lecture Cards/videoLectureCards';
import { videoPage } from './videoPage';

export const VideoLectures = () => {
  const { user } = useUserAuth();
  var  [isTrue, setIsTrue] = useState(false);
  var [SelectedSubject, setSelectedSubject] = useState("");
  var Subjects = ["Maths","Mechanics"];
  return (
    <>
      <h1 className='video-lectures-heading' >{ !isTrue ? "#Select Subject" : "#"+SelectedSubject}</h1>
      {
        user ? (
          <>
            <div className="video-lectures-cards-parent" >
              {
                !isTrue ? (
                  <>
                    {Subjects?.map((Subjects)=>{
                      return(
                        <div onClick={()=>{setIsTrue(true); setSelectedSubject(Subjects)}}  >
                          <VideoLectureCards subjects={Subjects} />
                        </div>
                          )
                    })}
                  </>
                ) : (
                  <></>
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
