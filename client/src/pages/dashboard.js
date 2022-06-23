import "./dashboard.css";
import React from "react";
import Card from "./Cards";
import CardDetails from "./cardDetails";

export const Dashboard = () => {

  function CreatCard(){
    return(
      <Card topic={CardDetails[0].topic} img={CardDetails[0].imgUrl} />
    );
  }

  return (
    <>
      <div id="dashboardCover">
        <div id="upcomingTests">
          <h1>Upcoming Tests</h1>
          <div className="cards">
            {CardDetails.map(CreatCard)}
          </div>
        </div>
      </div>
    </>
  );
};
