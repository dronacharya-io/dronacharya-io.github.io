import React from "react";

export default function Card(props){

    return(
        <div className="card">
            <h5>{props.topic}</h5>
            <img src={props.img} alt="UpcomingEvent" />
            <button>click to know more..</button>
        </div>
    );
}