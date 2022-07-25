import React, { useState, useEffect } from "react";

function UserQuizCard(props){
    const [zero, setZero] = useState("0");
    const [currentDate, setCurrentDate] = useState(new Date().getFullYear() + "-" +zero+ (new Date().getMonth()+1)+"-"+ new Date().getDate() );
    const [currentTime, setCurrentTime] = useState(new Date().getHours()+":"+new Date().getMinutes())
    
    useEffect(()=>{ 
        setInterval(()=>{
            if((new Date().getMonth()+1) > 9){
                setZero("")
            }
            setCurrentDate(new Date().getFullYear() + "-" +zero+ (new Date().getMonth()+1)+"-"+ new Date().getDate())
            setCurrentTime(new Date().getHours()+":"+new Date().getMinutes()) 
        },1000)
    },[])

    return(
        <div className="card" style={{backgroundColor: props.startDate < currentDate && props.runTime < currentTime ? "#E0E0E0" : props.startDate > currentDate || props.runTime > currentTime ? "#A4EBF3" : props.startDate === currentDate && props.runTime < currentTime  ? "#E0E0E0" : "white" }}>
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