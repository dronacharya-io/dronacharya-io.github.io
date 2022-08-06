import "./profile.css";
import React, { useState } from "react";
import { IoMailOutline } from "react-icons/io5";
import { BsFillPersonFill } from "react-icons/bs";
import Button from "@mui/material/Button";
import { useUserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

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

  return (
    <>
      <button id="profileButton" onClick={() => Disable()}>
        <BsFillPersonFill className="icon" id="profile-icon" />
      </button>
      {profileTab && (
        <div id="outerTab">
          <div id="iconTab">
            <h4 id="today">{Today}</h4>
            <IoMailOutline className="icons" />
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
              <button onClick={handleGoogleSignIn} className="navButton">
                Login/SignUp
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ProfileTab;
