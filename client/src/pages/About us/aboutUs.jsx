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
            <div className="home-page-sanskrit-shloka-div" >
              <h2 className="home-page-sanskrit-shloka" >
                  "गुरुर्ब्रह्मा ग्रुरुर्विष्णुः गुरुर्देवो महेश्वरः। <br/>
                  गुरुः साक्षात् परं ब्रह्म तस्मै श्री गुरवे नमः।।"
              </h2>
            </div>
            <h3 className="home-page-sanskrit-shloka-hindi">
              "गुरु ब्रह्मा है, गुरु विष्णु है, और गुरु ही भगवान शंकर है। गुरु हि साक्षात् परब्रह्म है, उन सद्गुरु को प्रणाम करता हूँ।"
            </h3>
          </div>
        </div>
      ) : (
        <LoginSignUpPopUp/>
      )}
    </>
  );
};
