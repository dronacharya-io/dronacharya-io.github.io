import React from 'react';
import "./heading.css";
function heading(props) {
  return (
    <div className="classroom-h2-div" >
        <h2 className="classroom-h2" >{props.title}</h2>
    </div>
  )
}

export default heading