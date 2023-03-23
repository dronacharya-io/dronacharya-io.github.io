import React from 'react'
import { Data } from './VideoData'
import "./videoPage.css"
import { motion } from 'framer-motion'


export const VideoPage = (props) => {


  return (
    <div className='video-page-parent-div'>
      {
        Data?.map((data)=>{
          return(
            data.code === props.subject && (
              <motion.div className='video-page-content-div' 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay:0.5,
                }}
              >
                <iframe width="auto" height="auto" src={data.link} title="Dronacharya Video Player" frameborder="20" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen>
                </iframe>
                <p className='video-page-video-title' >{data.title}</p>
                <div className='video-page-name-date-div' >
                  <p className="video-page-p-tag author">{data.author}</p>
                  <p className="video-page-p-tag" >{data.date}</p>
                </div>
              </motion.div>
            )
          )
        })
      }
    </div>
  )
}
