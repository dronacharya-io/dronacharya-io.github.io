import React,{useState} from 'react';
import "./heading.css";
import {motion} from "framer-motion";

function Heading(props) {

  const [initial, setInitial] = useState({opacity: 0 })
  const [animation, setAnimation] = useState({ opacity: 1  })
  
  setTimeout(()=>{
    setInitial({opacity:1})
    setAnimation({opacity:0})
  },7000)

  return (
    <motion.div
        className="container"
        initial={initial}
        animate={animation}
        >
          <motion.div
            className='box'
          >
            <h2>CLASSROOM PAGE</h2>
          </motion.div>
      </motion.div>
  )
}

export default Heading