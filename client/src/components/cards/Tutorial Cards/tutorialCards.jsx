import React from 'react';
import "./tutorialCard.css";
import { motion } from 'framer-motion';

const TutorialCard = (props) => {
  return (
    <motion.div 
     initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay:0.5,
      }}
    onClick={()=>{window.location.href=props.link}}
    className={`tutorial-card-parent-container _number_${props.number}`}>
        <h3 className='tutorial-card-title' >{props.title}</h3>
        {/* <div>
          <p>{props.teacher}</p>
        </div> */}
    </motion.div>
  )
}

export default TutorialCard;