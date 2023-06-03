import "./profile-desktop.css";
import "./profile-mobile.scss";
import React, { useState } from "react";
import { IoMailOutline } from "react-icons/io5";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Button from "@mui/material/Button";
import { useUserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import {Data} from "../../pages/Video Lectures/VideoData.js";
import { Tutorials } from "../../pages/Tutorials/TutorialData";

const ProfileTab = () => {
  const navigate = useNavigate();
  const [profileTab, setProfileTab] = useState(false);
  const { user, logOut, googleSignIn } = useUserAuth();
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    await googleSignIn();
  };
  const Disable = () => {
    setProfileTab(!profileTab);
  };

  const today = new Date();
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var Today =
    weekday[today.getDay()] +
    ", " +
    today.getDate() +
    " " +
    months[today.getMonth()];

    const data = Tutorials.concat(Data);
  
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      >
      <button id="profileButton" onClick={() => Disable()}>
        <NotificationsActiveIcon className="icon" id="profile-icon" />
      </button>
      {profileTab && (
        <div id="outerTab">
          <div id="iconTab">

          </div>
          {user ? (
            <>
              <div id="firstname" className="gradient-text">
                <img src={user.photoURL} alt="profile" id="profileImage" />
                <p >
                  Hello{" "}
                  {user.displayName?.split(" ")[0]?.slice(0, 1).toUpperCase() +
                    user.displayName
                      ?.split(" ")[0]
                      ?.slice(1, user.displayName?.split(" ")[0]?.length)
                      .toLowerCase()}
                  !
                </p>
                
              </div>
              <div className="profile-notification-parent-div" > 
            
                <div className="profile-notification-content-div">
                  {
                    data.map((data)=>{
                      return(
                        (
                          <motion.div 
                            onClick={()=>{ data.notes ? window.open(`${data.notes}`) : window.open(`${data.videoLink}`)}} 
                            className="notification-content-div"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              delay:0.5,
                            }}
                           >
                            <h3 className="notification-title" >{data.title}</h3> 
                            <h6 className="notification-author" >{data.author}, {data.subject}</h6>
                          </motion.div>
                        )
                      )
                    }).reverse()
                  }
                </div>
              </div>
            </>
          ) : (
            <>
              <Button variant="outlined" className="navButton logout" onClick={handleGoogleSignIn} >
                Login/SignUp
              </Button>
            </>
          )}
        </div>
      )}
      </motion.div>
  );
};

export default ProfileTab;
