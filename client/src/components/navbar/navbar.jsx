import "./navbar.css";
import React from "react";
import { AiOutlineHome, AiOutlineQuestionCircle } from "react-icons/ai";
import { SiGoogleclassroom, SiDarkreader } from "react-icons/si";
import { IoSettingsOutline, IoStatsChartOutline } from "react-icons/io5";
import CopyRight from "./copyRight/copyright";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div id="tab">
        <span id="logo">Q.io</span>
        <div id="iconStart">
          <div className="iconCover 1" onClick={() => navigate("/")}>
            <AiOutlineHome className="icon" />
          </div>
          <div className="iconCover 2" onClick={() => navigate("/classroom")}>
            <SiGoogleclassroom className="icon" />
          </div>
          <div className="iconCover 3" onClick={() => navigate("/settings")}>
            <IoSettingsOutline className="icon" />
          </div>
          <div className="iconCover 4" onClick={() => navigate("/scorecard")}>
            <IoStatsChartOutline className="icon" />
          </div>
          <div
            className="iconCover 5"
            id="quiz-icon"
            onClick={() => navigate("/quiz")}
          >
            <AiOutlineQuestionCircle className="icon" />
          </div>
          <hr />
          <div
            id="darkmode"
            className="iconCover 6"
            // onClick={}
          >
            <SiDarkreader className="icon" />
          </div>
          <br />
          <div id="copyright" className="iconeCover 7">
            {CopyRight()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
