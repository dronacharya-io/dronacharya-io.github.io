import React, { useState, useEffect } from "react";

function UserQuizCard(props){
    const [currentDate, setCurrentDate] = useState(new Date().getFullYear() + "-" +"0"+ (new Date().getMonth()+1)+"-"+ new Date().getDate() );
    const [currentTime, setCurrentTime] = useState(new Date().getHours()+":"+new Date().getMinutes())
    console.log(currentTime)
    useEffect(()=>{
        setInterval(()=>{
            setCurrentDate(new Date().getFullYear() + "-" +"0"+ (new Date().getMonth()+1)+"-"+ new Date().getDate())
            setCurrentTime(new Date().getHours()+":"+new Date().getMinutes())
        },1000)
    },[])

    return(
        <div className="card" style={{backgroundColor: props.startDate < currentDate || props.runTime < currentTime ? "#E0E0E0" : props.startDate > currentDate || props.currentTime > currentTime ? "#A4EBF3" : props.startDate === currentDate  ? "green" : "black" }}>
            <div style={{width : "15rem",height:"15rem"}}>
                <img src="https://picsum.photos/seed/picsum/240/240" />
            </div>
            <div>
                <h4>{props.quizName}</h4>
                <p style={{display:"inline-block", position:"relative", right:'55px',marginTop:'9px'}}>{props.startDate}</p>
                <p style={{display:"inline-block", position:"relative", left:'55px',marginTop:'9px'}}>{props.runTime}</p>
                <p>{currentDate}</p>
            </div>
        </div>
    )
}

export default UserQuizCard;