import "./dashboard.css";
import React from "react";
import Card from "./Cards";
import CardDetails from "../components/cardDetails";

export const Dashboard = () => {
  return (
    <>
      <div id="dashboardCover">
        <div id="upcomingTests">
          <h1>Upcoming Tests</h1>
          <div className="cards">
            {CardDetails.map((card) => {
              const { id ,imgUrl, topic } = card;
              return <Card key={id} topic={topic} img={imgUrl} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};
