import "./aboutUs.css";
import React, { useEffect } from "react";
import Card from "../../components/cards/Cards";
import CardDetails from "../../components/cards/cardDetails";
import { useUserAuth } from "../../context/AuthContext";

export const AboutUs = () => {
  const { user, googleSignIn } = useUserAuth();

  return (
    <>
      {user ? (
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
      ) : (
        <button onClick={() => googleSignIn()}>Login</button>
      )}
    </>
  );
};
