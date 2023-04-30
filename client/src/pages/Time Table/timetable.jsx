import React from 'react'
import "./timeTable.css"
import { pdfs } from '../../components/pdf visualiser/pdfs/index.js';
import Pdf_visualiser from '../../components/pdf visualiser/pdf_visualiser'
import { useUserAuth } from "../../context/AuthContext";
import LoginSignUpPopUp from "../../components/PopUps/LoginSignUpPopUp"; 


export const Timetable = () => {
    const { user } = useUserAuth();
    const { Mathspdf, Physicspdf  } = pdfs;
    const pdf_Arr = [ Mathspdf, Physicspdf ];
  return (
    <>
      {
        user && ( <h1 className='video-lectures-heading' >{"#Syllabus"}</h1>)
      }
      {
        user ? (
          <>
            {
              pdf_Arr?.map((pdf)=>{
                return(
                  <Pdf_visualiser file={pdf} />
                )
              })
            }
            <div className='time-table-p-div' >
              <p className='time-table-p' >
                We would like to inform you that on our <span>syllabus page</span>, we provide a detailed outline of the courses offered during the academic year.
                Ensuring that you have a clear understanding of what you will be studying during <span>exam time</span>.
              </p>
            </div>
          </>
        ) : (
          <LoginSignUpPopUp />
        ) 
      }
    </>
  )
}

