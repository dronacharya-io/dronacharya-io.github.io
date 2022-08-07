import React,{useEffect} from 'react'
import { useUserAuth } from "../../context/AuthContext";
import "./LoginSignUpPopUp.css"
import Zoom from "@mui/material/Zoom";
import Button from "@mui/material/Button";
import Fade from '@mui/material/Fade';
import Lottie from "react-lottie";
import girafOnCycle from "../../lotties/loginBackground.json";
import clickAnimation from "../../lotties/click.json";

const LoginSignUpPopUp = () => {
    const { user, googleSignIn } = useUserAuth();
    
    const giraf = {
        loop: true,
        autoplay: true,
        animationData: girafOnCycle,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };
      const click = {
        loop: true,
        autoplay: true,
        animationData: clickAnimation,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };
    
    
  return (
    <>
        <div id="backgroundParent">
            <div id="backgroundSpankle">
                <Lottie options={click} height={760} width={1550} />
            </div>
            <Zoom
            in={true}
            style={{ transitionDelay: true ? "100ms" : "0ms" }}>
                <div id="loginPopUp">
                    <div id="images">
                        <div id="giraf" >

                        </div>
                    </div>
                    <Zoom
                    in={true}
                    id="loginButtondiv"
                    style={{ transitionDelay: true ? "400ms" : "0ms" }}>
                        <div>
                            <div >
                                <div id="sparkle">
                                    <Lottie options={click} height={37} width={150} />
                                </div>
                                <div>
                                    <Button variant='outlined' id="loginButton" onClick={() => googleSignIn()}>Login</Button>
                                </div>
                            </div>
                        </div>
                    </Zoom>
                </div>
            </Zoom>   
        </div>
    </>    
  )
}

export default LoginSignUpPopUp