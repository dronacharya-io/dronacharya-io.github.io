import "./profile.css";
import React, { useState } from "react";
import { IoMailOutline, IoMailUnreadOutline } from "react-icons/io5";
import { VscBell, VscBellDot } from "react-icons/vsc";
import { SiGoogleclassroom, SiGooglescholar } from "react-icons/si";
import { MdOutlineClass } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";

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
          <div id="searchbar">
            <AiOutlineSearch
              className="search-icon"
              onClick={() =>
                console.log(document.getElementById("searchInput").value)
              }
            />
            <input
              type="text"
              id="searchInput"
              placeholder="Search.."
              autoComplete="off"
            />
          </div>
          <div id="profileImage" />
          <div id="username">
            <p>Hello Priyansh!</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileTab;
