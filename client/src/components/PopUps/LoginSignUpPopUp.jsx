import React,{useState} from 'react'
import { useUserAuth } from "../../context/AuthContext";
import "./Mobile_LoginSignUpPopUp.css"
import "./Desktop_LoginSignUpPopUp.css"
import Zoom from "@mui/material/Zoom";
import Button from "@mui/material/Button";
import Lottie from "react-lottie";
import girafOnCycle from "../../lotties/loginBackground.json";
import Space from "../../lotties/space2.json";
import {motion} from "framer-motion";

const LoginSignUpPopUp = () => {
    const { user, googleSignIn } = useUserAuth();
    const [height, setHeight] = useState(760);
    const [width, setWidth] = useState(1520);
    const giraf = {
        loop: true,
        autoplay: true,
        animationData: girafOnCycle,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };

      const space = {
        loop: true,
        autoplay: true,
        animationData: Space,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };


      setTimeout(()=>{
        setHeight(0);
        setWidth(0);
      },3000)
    
    
  return (
    <>
        <div class="login-signup-pop-up-backgroundParent-div">
            <Zoom
            in={true}
            style={{ transitionDelay: true ? "100ms" : "0ms" }}>
              <div id="loginPopUp">
                  
                <div id="background">
                  <Lottie isClickToPauseDisabled={true}  options={space} />
                </div>
                    <motion.div
                    in={true}
                    class="loginSignup-popup-loginButtondiv"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: [0, 0.71, 0.2, 1.01]}}
                    
                    >
                       
                      <Button variant='contained' id="loginButton" onClick={() => googleSignIn()}>Login</Button>
                       
                    </motion.div>
                </div>
            </Zoom>   
        </div>
    </>    
  )
}

export default LoginSignUpPopUp