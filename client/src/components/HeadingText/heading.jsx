import React,{useState} from 'react';
import "./heading.css";
import {motion} from "framer-motion";
import { useUserAuth } from "../../context/AuthContext";

function Heading(props) {

  const [initial, setInitial] = useState({opacity: 0 })
  const [animation, setAnimation] = useState({ opacity: 1  })
  const [h4initial, setH4Initial] = useState({opacity: 0 })
  const [h4animation, setH4Animation] = useState({ opacity: 1  })
  const [delay, setDelay] = useState(1.5)
  const { user } = useUserAuth(); 

  setTimeout(()=>{
    setInitial({opacity:1})
    setAnimation({opacity:0})
  },2900)

  setTimeout(()=>{
    setH4Initial({opacity:1})
    setH4Animation({opacity:0})
    setDelay(0)
  },2500)

  return (
    <motion.div
        className="container"
        initial={initial}
        animate={animation}
        >
          <motion.div
            className='box'
          >
            <motion.div
              initial={h4initial}
              animate={h4animation}
              transition={{delay:delay}}
              >
              <h4 className='heading-h4' >{user ? props.title : "YOU ARE NOT LOGGED IN"}</h4>
            </motion.div>
          </motion.div>
      </motion.div>
  )
}

export default Heading