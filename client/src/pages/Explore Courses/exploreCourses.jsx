import React from 'react'
import "./exploreCourses.css"
import { useUserAuth } from '../../context/AuthContext'
import LoginSignUpPopUp from '../../components/PopUps/LoginSignUpPopUp'
import ExploreCoursesSelector from "../../components/explore Courses Search/SearchCourses.jsx"
import Lottie from "react-lottie";
import searchLottie from "../../lotties/112360-search-files"
import { motion } from "framer-motion";
import TutorialData from "../Tutorials/TutorialData.js";
import videoData from "../Video Lectures/VideoData.js";

export const ExploreCourses = () => {
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState('');
  var [showData, setShowData] = React.useState(false);
  const [subject, setSubject] = React.useState('');
  const handleChange = (event) => {
    setAge(Number(event.target.value) || '');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };
  const { user } = useUserAuth()

  
  const InitaialLottie = {
    loop: true,
    autoplay: true,
    animationData: searchLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const List = (props) => {
    setSubject(props);
  }


  return (
    <>
     
      {
        user ? (
          <div className="explore-courses-main-container" >
            {
              !showData ? (
                <>
                  <div className='explore-courses-content-lottie-div' >
                    <motion.div  
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.5,
                        ease: [0, 0.71, 0.2, 1.01]
                      }}
                    >
                      <Lottie isClickToPauseDisabled={true}  options={InitaialLottie} height={300} width={300} />
                    </motion.div>
                    <h2 className='explore-courses-h2' >To find <span>relevant notes</span>, simply <span>click</span> the designated <span>button</span> and select your <span>desired subject</span> from the list provided.</h2>
                    <h2 className='explore-courses-h2' style={{marginBottom:"2rem"}} > उपयुक्त <span>नोट्स</span> ढूँढने के लिए, सिर्फ निर्धारित <span>बटन</span> पर क्लिक करें और उपलब्ध सूची से अपना<span> विषय</span> चुनें। </h2>
                    </div>
                    
                    <ExploreCoursesSelector selectedSubject={List} setOpen={setShowData} />
                </>
              ) 
              : 
              (
                  <>
                    {subject}
                  </>
              )
            }
          </div>
        ) : (
          <LoginSignUpPopUp />
        )
      }
    </>
  )
}


