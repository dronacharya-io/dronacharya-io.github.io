import "./profile.css";
import React, { useContext, useState } from "react";
import { IoMailOutline, IoMailUnreadOutline } from "react-icons/io5";
import { VscBell, VscBellDot } from "react-icons/vsc";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfileTab = () => {
  const [profileTab, setProfileTab] = useState(true);

  const Disable = () => {
    setProfileTab(!profileTab);
  };

  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  return (
    <>
      <button id="profileButton" onClick={() => Disable()}>
        <BsFillPersonFill className="icon" id="profile-icon" />
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
          {user ? (
            <>
              <div id="profileImage" />
              <div id="firstname">
                <p>Hello {user.username}!</p>
                <p>64 classmates</p>
              </div>
              <button
                onClick={() => {
                  dispatch({ type: "LOGOUT" });
                }}
                className="navButton logout"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/register")}
                className="navButton"
              >
                Register
              </button>
              <button onClick={() => navigate("/login")} className="navButton">
                Login
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ProfileTab;
