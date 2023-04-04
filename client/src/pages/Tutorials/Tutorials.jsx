import React, { useState } from 'react';
import "./Tutorials.css";
import PdfVisualiser from "../../components/pdf visualiser/pdf_visualiser";
import { VideoLectureCards } from '../../components/cards/Video Lecture Cards/videoLectureCards';
import { useUserAuth } from "../../context/AuthContext";
import LoginSignUpPopUp from "../../components/PopUps/LoginSignUpPopUp"; 
import firstTute from "../../components/pdf visualiser/pdfs/Maths/Tute/one.pdf";
import secondTute from "../../components/pdf visualiser/pdfs/Maths/Tute/two.pdf";
const Tutorial = (porps) => {
  
  const { user } = useUserAuth();
  var [SelectedSubject, setSelectedSubject] = useState("");
  var [isTrue, setIsTrue] = useState(false);
  const available_Subjects = ["Maths"];
  const files = [firstTute, secondTute];
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
                          <VideoLectureCards subjects={Subjects} />
                        </div>
                      )
                    })}
                  </>
                ) : (
                  <>
                    {
                      files?.map((Subjects,index)=>{
                        return(
                          <>
                            <PdfVisualiser file={Subjects} title={`Tutorial No ${index+1}`}  />
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