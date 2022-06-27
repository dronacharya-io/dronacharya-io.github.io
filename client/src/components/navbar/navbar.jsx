import "./navbar.css";
import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome, AiOutlineQuestionCircle } from "react-icons/ai";
import { SiGoogleclassroom, SiDarkreader } from "react-icons/si";
import { IoSettingsOutline, IoStatsChartOutline } from "react-icons/io5";

const Navbar = (props) => {
  const PassValue = (value) => {
    props.func(value);
  };

  return (
    <>
      <div id="tab">
        <Link to="/" id="logo">
          <p>Q.io</p>
        </Link>
        <div id="iconStart">
          <div className="iconCover 1" onClick={() => PassValue(1)}>
            <AiOutlineHome className="icon" />
          </div>
          <div className="iconCover 2" onClick={() => PassValue(2)}>
            <SiGoogleclassroom className="icon" />
          </div>
          <div className="iconCover 3" onClick={() => PassValue(3)}>
            <IoSettingsOutline className="icon" />
          </div>
          <div className="iconCover 4" onClick={() => PassValue(4)}>
            <IoStatsChartOutline className="icon" />
          </div>
          <div
            className="iconCover 5"
            id="quiz-icon"
            onClick={() => PassValue(5)}
          >
            <AiOutlineQuestionCircle className="icon" />
          </div>
          <hr />
          <div
            id="darkmode"
            className="iconCover 6"
            onClick={() => PassValue(6)}
          >
            <SiDarkreader className="icon" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
