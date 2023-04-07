import React, { useEffect, useState } from 'react'
import { Data } from './VideoData'
import "./videoPage.css"
import { motion } from 'framer-motion'


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
    <div className='video-page-parent-div'>
      {                
        Data?.map((data)=>{
          var url = data.notes;
          return(
            data.code === props.subject && (
              <motion.div className='video-page-content-div' 
                style={{width : url === "" ? ("80%"):("100%")}}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay:0.5,
                }}
              >
              <div className='video-page-content-div-parent' >
                <iframe width="auto" height="auto" src={data.link} title="Dronacharya Video Player" frameborder="20" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen>
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
            
          )
        })
      }
    </div>
  )
}
