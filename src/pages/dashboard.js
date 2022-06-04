import "./dashboard.css";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

export const Dashboard = () => {
  return (
    <>
      <div id="dashboardCover">
        <div id="header">
          <div id="searchbar">
            <input
              type="text"
              id="searchInput"
              placeholder="Search.."
              autoComplete="off"
            />
            <AiOutlineSearch
              className="search-icon"
              onClick={() =>
                console.log(document.getElementById("searchInput").value)
              }
            />
          </div>
          <button id="createQuiz">Create Quiz</button>
        </div>
        <div id="upcomingTests">
          <h1>Upcoming Tests</h1>
          <div className="cards">
            <div className="card" />
            <div className="card" />
            <div className="card" />
            <div className="card" />
            <div className="card" />
            <div className="card" />
            <div className="card" />
            <div className="card" />
            <div className="card" />
            <div className="card" />
          </div>
        </div>
      </div>
    </>
  );
};
