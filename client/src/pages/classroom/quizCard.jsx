import React, { useState, useEffect } from "react";

function UserQuizCard(props){
    const [colour, setColour] = useState('white');
    const [date, setDate] = useState(new Date().toLocaleDateString());
    console.log(date)
    useEffect(()=>{
        setInterval(()=>{

        },)
    })


    return(
        <div className="card" style={{backgroundColor: colour}}>
            <div style={{width : "15rem",height:"15rem"}}>
                <img src="https://picsum.photos/seed/picsum/240/240" />
            </div>
            <div>
                <h4>{props.quizName}</h4>
                <p style={{display:"inline-block", position:"relative", right:'55px',marginTop:'9px'}}>{props.startDate}</p>
                <p style={{display:"inline-block", position:"relative", left:'55px',marginTop:'9px'}}>{props.runTime}</p>
            </div>
        </div>
    )
}

export default UserQuizCard;