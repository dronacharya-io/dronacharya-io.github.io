import React,{useState, useEffect} from 'react';
import {AiFillEye, AiFillGithub} from "react-icons/ai";
import {animate, motion} from "framer-motion";
import "./newcard.scss";
import "../cards/Cards.css"
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/AuthContext.js";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import ReplyIcon from "@mui/icons-material/Reply";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import Popper from "@mui/material/Popper";
import Box from "@mui/material/Box";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Lottie from "react-lottie";
import animationData from "../../lotties/notfound.json";

function Newcard(props) {
    
    const [activeFilter, setActiveFilter ] = useState("All")
    const [animateCard, setAnimateCard] = useState({y:0, opacity:1})
    const [works, setWorks] = useState([])
    const [filterWork, setFilterWork] = useState([])
    const work = '';
    const [zero, setZero] = useState("0");
    const [currentDate, setCurrentDate] = useState(
        new Date().getFullYear() +
          "-" +
          zero +
          (new Date().getMonth() + 1) +
          "-" +
          new Date().getDate()
      );
      const [anchorEl, setAnchorEl] = React.useState(null);

      const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
      };

      const open = Boolean(anchorEl);
      const id = open ? "simple-popper" : undefined;
      
      const handleDelete = async () => {
        setAnimateCard([{y:100, opacity:0}])
        await axios.delete(
          "https://dronacharya-api.onrender.com/api/quizzes/deleteQuiz/" + props.id
        );
        let arr1 = user.userData.quizzesCreated;
        arr1 = arr1.filter((element) => {
          return element.id !== props.id;
        });
        let arr2 = user.userData.quizzesSubmitted;
        arr2 = arr2.filter((element) => {
          return element.id !== props.id;
        });
        await axios.put(
          "https://dronacharya-api.onrender.com/api/users/updateUser/" + user.userData._id,
          { quizzesCreated: arr1, quizzesSubmitted: arr2 }
        );
        props.setX(!props.x);
      };
      const handleEdit = async () => {
        navigate("../editQuiz?quizId=" + props.id + "&userId=" + user.userData._id);
      };    

      const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: props.animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };


  const { user } = useUserAuth();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(
    new Date().getHours() + ":" + new Date().getMinutes()
  );
  const tempImage = "https://picsum.photos/seed/picsum/240/240";


  const currentBaseURL =
    window.location.href.split("classroom")[0] + "joinQuiz/?id=";
    
    setInterval(() => {
      if (new Date().getMonth() + 1 > 9) {
        setZero("");
      }
      setCurrentDate(
        new Date().getFullYear() +
          "-" +
          zero +
          (new Date().getMonth() + 1) +
          "-" +
          new Date().getDate()
      );
      setCurrentTime(new Date().getHours() + ":" + new Date().getMinutes());
    }, 1000);

    setInterval(() => {}, 3600000);

    setInterval(() => {}, 60000);



  return (

        <motion.div
            animate={animateCard}
            initial={{ y: 40, opacity: 0 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.5 }}
            id="card"
        >
            <div className='app__work-item app__flex'  >
                <div className='app__work-img app__flex' >
                <Lottie isClickToPauseDisabled={true}  options={defaultOptions} />
                    
                    <motion.div
                    whileHover={{opacity:[0,1]}}
                    transition={{duration:0.25, ease:"easeInOut", staggerChildren:0.5}}
                    className="app__work-hover app__flex"
                    >
                    <a href={work} target="_blank" rel='noreferrer'>
                        <motion.div
                        whileInView={{scale:[0,1]}}
                        whileHover={{opacity:[1,0.8]}}
                        transition={{duration:0.25}}
                        className="app__flex"
                        >
                        <AiFillEye  />
                        </motion.div>
                    </a>
                    <a href={work} target="_blank" rel='noreferrer'>
                        <motion.div
                        whileInView={{scale:[0,1]}}
                        whileHover={{opacity:[1,0.8]}}
                        transition={{duration:0.25}}
                        className="app__flex"
                        >
                        <AiFillGithub /> 
                        </motion.div>
                    </a>
                    </motion.div>
                </div>
                <div className="app__work-content app__flex" >
                    <h4 className='bold-text' >{`Quiz Name : ${props.quizName?.toUpperCase() }`}</h4>
                    <p className='p-text' style={{marginTop:10}} > {`Subject : ${props.subject?.toUpperCase() }`}</p>

                    <div className='app__work-tag app__flex' >
                        {props.startDate >= currentDate ? (
                            <div className='p-text' >
                                <Button
                                color="success"
                                style={{ letterSpacing: "5px", width:'50%' }}
                                className="quizStatusLive"
                                >
                                Live
                                </Button>
                                <Badge
                                badgeContent=" "
                                color="success"
                                variant="dot"
                                className="quizStatusLive"
                                >
                                </Badge>
                            </div>
                            ) : (
                            <p
                                style={{ letterSpacing: "2px" }}
                                disabled
                                className="quizStatusEnded"
                            >
                                Quiz Ended
                            </p>
                        )}
                    </div>
                </div>
                <Button id="button" className='card-see-attendies-btn' variant="outlined" onClick={() => navigate("../quizSubmissions?id=" + props.id)} size="small">See Attendies</Button>
                <CardActions id="cardActions">
                    <Tooltip
                        title="Share Link"
                        placement="left"
                        disableFocusListener
                        disableTouchListener
                        arrow
                    >
                        <div className="cardActionsIcon" >
                        <CopyToClipboard text={currentBaseURL + props.id}>
                            <Button
                            id="button"
                            size="small"
                            variant="outlined"
                            onClick={handleClick}
                            >
                            <ReplyIcon />
                            </Button>
                        </CopyToClipboard>
                        </div>
                    </Tooltip>
                    <Popper id={id} open={open} anchorEl={anchorEl}>
                        <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
                        Link Copied!
                        </Box>
                    </Popper>
                    <Tooltip
                        title="Edit"
                        placement="bottom"
                        disableFocusListener
                        disableTouchListener
                        arrow
                    >
                        <div className="cardActionsIcon">
                        <Button
                            id="button"
                            size="small"
                            variant="outlined"
                            onClick={handleEdit}
                        >
                            <CreateIcon />
                        </Button>
                        </div>
                    </Tooltip>
                    <Tooltip
                        title="Delete"
                        placement="right"
                        disableFocusListener
                        disableTouchListener
                        arrow
                    >
                        <div className="cardActionsIcon">
                        <Button
                            id="button"
                            size="small"
                            variant="outlined"
                            onClick={handleDelete}
                        >
                            <DeleteIcon />
                        </Button>
                        </div>
                    </Tooltip>
                </CardActions>
            </div>
        </motion.div>
  ) 
}

export default Newcard

{
    /*
    
    */
}