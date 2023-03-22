import "./profile-desktop.css";
import "./profile-mobile.css";
import React, { useState } from "react";
import { IoMailOutline } from "react-icons/io5";
import { BsFillPersonFill } from "react-icons/bs";
import Button from "@mui/material/Button";
import { useUserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import email from "../../lotties/95247-email.gif";

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

    const emailt = {
      loop: true,
      autoplay: true,
      animationData: email,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      >
      <button id="profileButton" onClick={() => Disable()}>
        <BsFillPersonFill className="icon" id="profile-icon" />
      </button>
      {profileTab && (
        <div id="outerTab">
          <div id="iconTab">
            <h4 id="today">{Today}</h4>
            <div  className="profile-tab-lottie-div" >
              <IoMailOutline  onClick={()=>{window.open("mailto:pixelhosters@gmail.com/")}} className='profile-tab-img' />
              <img src={email}  />
            </div>
          </div>
          {user ? (
            <>
              <img src={user.photoURL} alt="profile" id="profileImage" />
              <div id="firstname">
                <p>
                  Hello{" "}
                  {user.displayName?.split(" ")[0]?.slice(0, 1).toUpperCase() +
                    user.displayName
                      ?.split(" ")[0]
                      ?.slice(1, user.displayName?.split(" ")[0]?.length)
                      .toLowerCase()}
                  !
                </p>
              </div>
              <Button
                variant="outlined"
                onClick={() => {
                  logOut();
                  navigate("../");
                }}
                className="navButton logout"
              >
                Logout
              </Button>
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
