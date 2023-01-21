import "./Mobile_Navbar.css";
import "./Desktop_Navbar.css";
import React, { useState, useEffect }from "react";
import { AiOutlineHome, AiOutlineQuestionCircle } from "react-icons/ai";
import { SiGoogleclassroom, SiDarkreader } from "react-icons/si";
import { IoSettingsOutline, IoStatsChartOutline } from "react-icons/io5";
import CopyRight from "./copyRight/copyright";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../App";
import { useContext } from "react";
import Logo from "../../pages/images/logo.webp";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import SchoolIcon from '@mui/icons-material/School';
import Heading from "../HeadingText/heading";


const Navbar = (props) => {
  const navigate = useNavigate();
  const [ showHeading, setShowHeading ] = useState(false)
  var useThemeContext = useContext(ThemeContext);
  var { toggleTheme } = useThemeContext;
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  var [title, setTitle] = useState("");


  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  const handleClick = (title) =>{
    if( window.innerWidth > 425) {
      console.log(showHeading)
    } else{
      setShowHeading(true)
    }
    setTimeout(()=>{
      setShowHeading(false)
    },3200)
    setTitle(title)
  }

  console.log(window.innerWidth + " width")
  return (
    <>
      <div id="navbar-tab-div">
        { showHeading ? <Heading title={title} /> : (
          < div id="navbar-tab-div">
          <span id="navbar-logo-div">
          <img
            src={Logo}
            style={{ width: "3rem", height: "auto" }}
            onClick={() => {
              navigate("/");
            }}
          />
        </span>
        <div id="navbar-icons-div">
          <Tooltip
            title="Home"
            placement="right"
            disableFocusListener
            disableTouchListener
            arrow
          >
            <IconButton
              className="iconCover 1"
              sx={{ "&:hover": { backgroundColor: "white" } }}
              onClick={() => {
                navigate("/")
                handleClick("HOME")
              }}
            >
              <AiOutlineHome className="navbar-icon" />
            </IconButton>
          </Tooltip>

          <Tooltip
            title="My Quizzes"
            placement="right"
            disableFocusListener
            disableTouchListener
            arrow
          >
            <IconButton
              className="iconCover 2"
              sx={{ "&:hover": { backgroundColor: "white" } }}
              onClick={() => {
                navigate("/classroom")
                handleClick("CLASSROOM")
                }}
            >
              <SiGoogleclassroom className="navbar-icon" />
            </IconButton>
          </Tooltip>


          <Tooltip
            title="Score Card"
            placement="right"
            disableFocusListener
            disableTouchListener
            arrow
          >
            <IconButton
              className="iconCover 4"
              sx={{ "&:hover": { backgroundColor: "white" }}}
              onClick={() =>{
                navigate("/scorecard")
                handleClick("SCORECARD")
              }}
            >
              <IoStatsChartOutline className="navbar-icon" />
            </IconButton>
          </Tooltip>
          <Tooltip
            title="Explore Courses "
            placement="right"
            disableFocusListener
            disableTouchListener
            arrow
          >
            <IconButton
              className="iconCover 5"
              sx={{ "&:hover": { backgroundColor: "white" } }}
              onClick={() => {
                navigate("/exploreCourses")
                handleClick("EXPLORE COURSES")
              }}
            >
              <SchoolIcon className="navbar-icon" />
            </IconButton>
          </Tooltip>


          <Tooltip
            title="About Us"
            placement="right"
            disableFocusListener
            disableTouchListener
            arrow
          >
            <IconButton
              className="iconCover 6"
              sx={{ "&:hover": { backgroundColor: "white" } }}
              onClick={() => {
                navigate("/aboutUs")
                handleClick("ABOUT US")
                }}
            >
              <AiOutlineQuestionCircle className="navbar-icon" />
            </IconButton>
          </Tooltip>


          <Tooltip
            title="Settings"
            placement="right"
            disableFocusListener
            disableTouchListener
            arrow
          >
            <IconButton
              className="iconCover 7"
              sx={{ "&:hover": { backgroundColor: "white" } }}
              onClick={() => {
                navigate("/settings")
                handleClick("SETTINGS")
                }}
            >
              <IoSettingsOutline className="navbar-icon" />
            </IconButton>
          </Tooltip>

          <hr />
          
            <IconButton id="darkmode" onClick={toggleTheme} className="iconCover 8">
              { props.theme === "dark" ? 
              (
                <Tooltip
                  title="Light Mode"
                  placement="right"
                  disableFocusListener
                  disableTouchListener
                  arrow
                >
                  <LightModeIcon className="navbar-icon"  />
                </Tooltip>
                ) 
              : 
              (           
                <Tooltip
                  title="Dark Mode"
                  placement="right"
                  disableFocusListener
                  disableTouchListener
                  arrow
                >
                  <NightlightRoundIcon className="navbar-icon" /> 
                </Tooltip>
                )  }
            </IconButton>
          
          <br />
          <div id="copyright" className="9">
            {CopyRight()}
          </div>
        </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
