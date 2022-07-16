import "./profile.css";
import React, { useState } from "react";
import { IoMailOutline } from "react-icons/io5";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { useUserAuth } from "../../context/AuthContext";

const ProfileTab = () => {
  const [profileTab, setProfileTab] = useState(true);

  const Disable = () => {
    setProfileTab(!profileTab);
  };

  const { user, logOut, googleSignIn } = useUserAuth();
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    await googleSignIn();
  };
  return (
    <>
      <button id="profileButton" onClick={() => Disable()}>
        <BsFillPersonFill className="icon" id="profile-icon" />
      </button>
      {profileTab && (
        <div id="outerTab">
          <div id="iconTab">
            <IoMailOutline className="icons" />
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
              <img src={user.photoURL} alt="profile" id="profileImage" />
              <div id="firstname">
                <p>Hello {user.displayName}!</p>
                <p>64 classmates</p>
              </div>
              <button
                onClick={() => {
                  logOut();
                }}
                className="navButton logout"
              >
                Logout
              </button>
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
