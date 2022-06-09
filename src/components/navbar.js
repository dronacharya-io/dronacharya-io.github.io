import "./navbar.css";
import React from "react";
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
        <a id="logo" href="#">
          <p>Quiz.io</p>
        </a>
        <div id="iconStart">
          <div className="iconCover 1" onClick={() => PassValue(1)}>
            <AiOutlineHome className="icon" />
          </div>
          <div
            className="iconCover 2"
            id="classroom"
            onClick={() => PassValue(2)}
          >
            <SiGoogleclassroom className="icon" />
          </div>
          <div className="iconCover 3" onClick={() => PassValue(3)}>
            <IoSettingsOutline className="icon" />
          </div>
          <div className="iconCover 4" onClick={() => PassValue(4)}>
            <IoStatsChartOutline className="icon" />
          </div>
          <div className="iconCover 5" onClick={() => PassValue(5)}>
            <AiOutlineQuestionCircle className="icon" />
          </div>
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
