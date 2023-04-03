import React from 'react'
import "./timeTable.css"
import Pdf_visualiser from '../../components/pdf visualiser/pdf_visualiser'
import Syllabus from "../../components/pdf visualiser/pdfs/Time Table/one.pdf"
import { useUserAuth } from "../../context/AuthContext";
import LoginSignUpPopUp from "../../components/PopUps/LoginSignUpPopUp"; 


export const Timetable = () => {
    const pdf = Syllabus;
    const { user } = useUserAuth();
  return (
    <>
      {
        user ? (
          <>
            <Pdf_visualiser title={"#Syllabus"} file={pdf} />
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

