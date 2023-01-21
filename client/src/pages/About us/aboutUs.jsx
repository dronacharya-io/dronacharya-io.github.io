import "./aboutUs.css";
import React, { useEffect } from "react";
import Card from "../../components/NewCards/Newcard.jsx";
import CardDetails from "../../components/cards/cardDetails";
import { useUserAuth } from "../../context/AuthContext";
import LoginSignUpPopUp from "../../components/PopUps/LoginSignUpPopUp"; 
export const AboutUs = () => {
  const { user, googleSignIn } = useUserAuth();

  return (
    <>
      {user ? (
        <div id="dashboardCover">
          <div id="upcomingTests">
            <div className="cards">
              {CardDetails.map((card, i) => {
                const { imgUrl, topic } = card;
                return <Card key={i} topic={topic} img={imgUrl} />;
              })}
            </div>
          </div>
        </div>
      ) : (
        <LoginSignUpPopUp/>
      )}
    </>
  );
};
