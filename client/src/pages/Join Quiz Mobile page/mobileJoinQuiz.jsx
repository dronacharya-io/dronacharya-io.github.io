import React, { useState } from 'react'
import "./mobileJoinQuiz.css";
import { useUserAuth } from "../../context/AuthContext";
import LoginSignUpPopUp from "../../components/PopUps/LoginSignUpPopUp"; 
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Lottie from "react-lottie";
import thirdAnimationData from "../../lotties/67928-studyly";
import Zoom from "@mui/material/Zoom";

export const MobileJoinQuiz = () => {
    const { user } = useUserAuth();
    const [id, setId] = useState();
    const navigate = useNavigate();
    const CssTextField = styled(TextField)({
        "& placeholder.Mui-focused": {
        color: "white",
        },
        "& .MuiInput-underline:after": {
        borderBottomColor: "green",
        },
        "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "red",
        },
        "&:hover fieldset": {
            borderColor: "yellow",
        },
        "&.Mui-focused fieldset": {
            borderColor: "white",
        },
        },
    });

    const handleChange = (e) => {
        setId(e.target.value);
    };


    const darkTheme = createTheme({
        palette: {
        mode: "light" || "dark",
        },
    });

    const tAnimationData = {
        loop:true,
        autoplay:true,
        animationData: thirdAnimationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };
    
    return (
    <>
        {
            user ? (
                <>
                    <div className="mobile-join-quiz-parent-div" >
                        {/* <h2 className='mobile-join-quiz-heading' >Paste your Quiz Id here</h2> */}
                        {/* <div className="mobile-quiz-lottie-div" >
                            <Lottie   isClickToPauseDisabled={true}  options={tAnimationData}  />
                        </div> */}
                        <div className="quiz-textfield-joinbtn-parent-div" >
                            <Zoom
                            in={true}
                            style={{transitionDelay:"800ms"}}
                            >
                                <div  style={{display:'inline'}} >     
                                    <ThemeProvider theme={darkTheme}>
                                        <CssTextField
                                        id="joinquiztextfeild"
                                        className='mobile-join-quiz-txt-field'
                                        placeholder="Paste a Quiz ID"
                                        onChange={handleChange}
                                        value={id}
                                        InputLabel={{ className: "test" }}
                                        focused
                                        />
                                    </ThemeProvider>
                                </div>
                            </Zoom>

                            <Button
                                id="mobile-join-quiz-btn"
                                variant="contained"
                                onClick={() => navigate("/joinQuiz/?id=" + id)}
                            >
                                Join
                            </Button>
                        </div>
                    </div>
                </>
            ) : (
                <LoginSignUpPopUp />
            ) 
        }
    </>
  )
}
