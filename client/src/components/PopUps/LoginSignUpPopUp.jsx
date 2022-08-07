import React,{useEffect, useState} from 'react'
import { useUserAuth } from "../../context/AuthContext";
import "./LoginSignUpPopUp.css"
import Zoom from "@mui/material/Zoom";
import Button from "@mui/material/Button";
import Fade from '@mui/material/Fade';
import Lottie from "react-lottie";
import girafOnCycle from "../../lotties/loginBackground.json";
import clickAnimation from "../../lotties/click.json";
import astronaut from "../../lotties/mainAsro.json";
import astronautTwo from "../../lotties/astwo.json";
import astronautThree from "../../lotties/sun.json"

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
      const click = {
        loop: true,
        autoplay: true,
        animationData: clickAnimation,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };
      const Astronaut = {
        loop: true,
        autoplay: true,
        animationData: astronaut,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };
      
      const AstronautTwo = {
        loop: true,
        autoplay: true,
        animationData: astronautTwo,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };

      const AstronautThree = {
        loop: true,
        autoplay: true,
        animationData: astronautThree,
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
        <div id="backgroundParent">
            <div id="backgroundSpankle">
                <Lottie  options={click} height={height} width={width} />
            </div>
            <Zoom
            in={true}
            style={{ transitionDelay: true ? "100ms" : "0ms" }}>
                <div id="loginPopUp">

                    <div id="astronaut" >
                        <Zoom
                        in={true}
                        style={{ transitionDelay: true ? "400ms" : "0ms" }}>
                            <div>
                                <Lottie  options={Astronaut} height={300} width={350} />
                            </div>
                        </Zoom>
                    </div>
                    <div id="atronautTwo">
                        <Zoom
                        in={true}
                        style={{ transitionDelay: true ? "400ms" : "0ms" }}>
                            <div>
                                <Lottie  options={AstronautTwo} height={587} width={450} />
                            </div>
                        </Zoom>
                    </div>
                    <div id="atronautThree">
                        <Zoom
                        in={true}
                        style={{ transitionDelay: true ? "400ms" : "0ms" }}>
                            <div>
                                <Lottie  options={AstronautThree} height={200} width={200} />
                            </div>
                        </Zoom>
                    </div>
                    <div id="title" >
                        <h1>LOGIN IN LESS THAN 2 SECONDS!</h1>
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