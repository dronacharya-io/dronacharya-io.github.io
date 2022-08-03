import "./navbar.css";
import React from "react";
import { AiOutlineHome, AiOutlineQuestionCircle } from "react-icons/ai";
import { SiGoogleclassroom, SiDarkreader } from "react-icons/si";
import { IoSettingsOutline, IoStatsChartOutline } from "react-icons/io5";
import CopyRight from "./copyRight/copyright";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../App";
import { useContext } from "react";
import Logo from "../../pages/images/logo.webp";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

const Navbar = () => {
  const navigate = useNavigate();

  const useThemeContext = useContext(ThemeContext);
  const { toggleTheme } = useThemeContext;

  return (
    <>
      <div id="tab">
        <span id="logo">
          <img src={Logo} style={{width:"3rem", height:"3rem"}} />
        </span>
        <div id="iconStart">
          <div  onClick={() => navigate("/")}>
          <Tooltip title="Home"> 
            <AiOutlineHome className="icon" />
          </Tooltip>
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
            onClick={() => navigate("/aboutUs")}
          >
            <AiOutlineQuestionCircle className="icon" />
          </div>
          <hr />
          <div id="darkmode" className="iconCover 6" onClick={toggleTheme}>
            <SiDarkreader className="icon" />
          </div>
          <br />
          <div id="copyright" className="7">
            {CopyRight()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
