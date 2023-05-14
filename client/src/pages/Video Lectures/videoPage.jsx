import React, { useEffect, useState } from 'react';
import { Data } from './VideoData';
import "./videoPage.scss";
import { motion } from 'framer-motion';

export const VideoPage = (props) => {
  var [subjectName, setSubjectName] = useState("");
  
  const codeToSubject = (subjectCode) => {
    switch (subjectCode){
      case 2001:
        return setSubjectName('Maths');
      case 2002:
        return setSubjectName('Physics');
      case 2005:
        return setSubjectName('Mechanics');
      default:
        return setSubjectName('');
    }
  }

  useEffect(()=>{
    codeToSubject(props.subject);
  },[props.subject])
    
  return (
    <>
      {                
        Data?.map((data)=>{
          var url = data.notes;
          return(
            <>
            {
              data.code === props.subject && !data.videoCard && (
              <motion.div className='video-page-content-div' 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay:0.5,
                }}
              >
              <div className='video-page-content-div-parent' >
                <iframe width="auto" height="auto" src={data.videoLink} title="Dronacharya Video Player" frameborder="20" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen>
                </iframe>
                <p className='video-page-video-title' >{data.title}</p>
                <div className='video-page-name-date-div' >
                  <p className="video-page-p-tag author">{data.author}</p>
                  <p className="video-page-p-tag" >{data.date}</p>
                </div>
                {
                    data.notes === "" ? (""):(<button onClick={()=>{window.location.href = url}} className='video-page-notes-btn' >Lecture Notes</button>)
                }
              </div>
              </motion.div>
            )
            }
            {
                  data.videoCard && data.code === props.subject && (
                    <motion.div 
                    onClick={()=> window.open(data.link)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay:0.5,
                    }}
                    className='video_page-yt_refrence_card_parent' >
                      <p className='video-page-video-title-card' >{data.title}</p>
                      <div className='video-page-name-date-div' >
                        <p className="video-page-p-tag-card">{data.author}</p>
                      </div>
                    </motion.div>
                    )
            }
            </>
          )
        })
      }
    </>
  )
}
