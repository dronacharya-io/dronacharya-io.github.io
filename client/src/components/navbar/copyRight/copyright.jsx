import React from "react";

export default function CopyRight() {
    let date = new Date();
    let year = date.getFullYear();
    return(
        <div>
            <footer> Ⓒ {`${year}`}</footer>
        </div>
    );
}