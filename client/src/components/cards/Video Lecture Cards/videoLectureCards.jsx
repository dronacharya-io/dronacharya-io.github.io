import React from 'react'
import "./videoLectureCards.css"
import { motion } from 'framer-motion'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';


export const VideoLectureCards = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01]
      }}
    className='v-lectures-parent-div'>
        <div className='v-lectures-text-div' >
          <h2 className='v-lectures-h2' >{props.subjects}</h2>
        </div>
        <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
        duration: 0.8,
        delay: 1,
        ease: [0, 0.71, 0.2, 1.01]
      }}
        className='v-lectures-yt-icon' >
            <PlayArrowIcon />
        </motion.div>
    </motion.div>
  )
}

