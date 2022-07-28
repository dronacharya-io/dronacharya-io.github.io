import "./aboutUs.css";
import React from "react";
import Card from "../../components/cards/Cards";
import CardDetails from "../../components/cards/cardDetails";

export const AboutUs = () => {
  return (
    <>
      <div id="dashboardCover">
        <div id="upcomingTests">
          <h1>Upcoming Tests</h1>
          <div className="cards">
            {CardDetails.map((card, i) => {
              const { imgUrl, topic } = card;
              return <Card key={i} topic={topic} img={imgUrl} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};
