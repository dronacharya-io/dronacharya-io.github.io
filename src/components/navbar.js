import "./navbar.css";
import React, { useState } from "react";
import { AiOutlineHome, AiOutlineQuestionCircle } from "react-icons/ai";
import { SiGoogleclassroom, SiDarkreader } from "react-icons/si";
import { IoSettingsOutline, IoStatsChartOutline } from "react-icons/io5";

const Navbar = () => {
  return (
    <>
      <div id="tab">
        <a id="logo" href="#">
          <p>Quiz.io</p>
        </a>
        <div id="iconStart">
          <div className="iconCover">
            <AiOutlineHome className="icon" />
          </div>
          <div className="iconCover">
            <SiGoogleclassroom className="icon" />
          </div>
          <div className="iconCover">
            <IoSettingsOutline className="icon" />
          </div>
          <div className="iconCover">
            <IoStatsChartOutline className="icon" />
          </div>
          <div className="iconCover">
            <AiOutlineQuestionCircle className="icon" />
          </div>
          <div className="iconCover">
            <SiDarkreader className="icon" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
