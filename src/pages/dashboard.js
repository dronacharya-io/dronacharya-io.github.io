import "./dashboard.css";
import React from "react";

export const Dashboard = () => {
  return (
    <>
      <div id="dashboardCover">
        <div id="header">
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
          </div>
        </div>
      </div>
    </>
  );
};
