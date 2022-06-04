import "./profile.css";
import React, { useState } from "react";
import { IoMailOutline, IoMailUnreadOutline } from "react-icons/io5";
import { VscBell, VscBellDot } from "react-icons/vsc";
import { SiGoogleclassroom, SiGooglescholar } from "react-icons/si";
import { MdOutlineClass } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";

const ProfileTab = (props) => {
  const [profileTab, setProfileTab] = useState(true);

  const Disable = () => {
    setProfileTab(!profileTab);
  };
  return (
    <>
      <button id="profileButton" onClick={() => Disable()}>
        <BsFillPersonFill className="icon" />
      </button>
      {profileTab && (
        <div id="outerTab">
          <div id="iconTab">
            <IoMailOutline className="icons" />
            <VscBell className="icons" />
          </div>
          <div id="profileImage" />
          <div id="username">Hi User!</div>
          <div id="stats">
            <div id="enrolled">
              <SiGooglescholar className="stats-icon" />
              <p className="stats-p">Enrolled Classes</p>
              <h1 className="stats-h">7</h1>
            </div>
            <div id="std">
              <MdOutlineClass className="stats-icon" />
              <p className="stats-p">Standard</p>
              <h1 className="stats-h">11</h1>
            </div>
          </div>
          <div id="classes">
            <h1>To-Do List:</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileTab;
