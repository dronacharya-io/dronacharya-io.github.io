import React from 'react'
import "./exploreCourses.css"
import { useUserAuth } from '../../context/AuthContext'
import LoginSignUpPopUp from '../../components/PopUps/LoginSignUpPopUp'
import ExploreCoursesSelector from "../../components/explore Courses Search/SearchCourses.jsx"
import Lottie from "react-lottie";
import searchLottie from "../../lotties/112360-search-files"
import { motion } from "framer-motion";
import Heading from '../../components/HeadingText/heading'
import Pdf_visualiser from '../../components/pdf visualiser/pdf_visualiser'


export const ExploreCourses = () => {
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState('');

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

  return (
    <>
      <Heading title={'EXPLORE COURSES'} />
      {
        user ? (
          <div className="explore-courses-main-container" >
              { <div className='explore-courses-content-lottie-div' >

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
                  <h2 className='explore-courses-h2' >Select your <span>College Name</span> , <span>Class</span> , <span>Branch</span> and your Preffered Medium <span>Hindi</span> or <span>English.</span> .</h2>
                  <h2 className='explore-courses-h2' style={{marginBottom:"2rem"}} > अपने <span>कॉलेज का नाम</span>, <span> कक्षा </span> , <span> शाखा  </span> और अपना पसंदीदा माध्यम <span> हिंदी </span> या <span> अंग्रेजी </span> चुनें।  </h2>
                </div>
              }
              <ExploreCoursesSelector />
              <Pdf_visualiser />
          </div>
        ) : (
          <LoginSignUpPopUp />
        )
      }
    </>
  )
}


