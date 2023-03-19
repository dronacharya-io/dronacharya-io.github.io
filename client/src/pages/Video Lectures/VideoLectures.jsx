import React from 'react'
import { useUserAuth } from "../../context/AuthContext";
import LoginSignUpPopUp from "../../components/PopUps/LoginSignUpPopUp"; 

export const VideoLectures = () => {
  const { user } = useUserAuth();
  
  return (
    <>
      {
        user ? (
          <h1>Video lecture</h1>
        ) : (
          <LoginSignUpPopUp />
        )
      }
    </>
  )
}
