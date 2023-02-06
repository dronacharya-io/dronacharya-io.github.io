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
            {/* <div className="cards">
              {CardDetails.map((card, i) => {
                const { imgUrl, topic } = card;
                return <Card key={i} topic={topic} img={imgUrl} />;
              })}
            </div> */}
            <div class="about-section">
              <div class="inner-container">
                <h1 className=" first" >"Learn, Test, Succeed" ~ Dronacharya.io</h1>
                <p class="text">
                  This platform have been created with the aim of making the lives of students easier. With a user-friendly interface and a wealth of information, this platform is designed to help students succeed in their studies.
                  The platform features a lecture notes created by college students. The notes are organized in a user-friendly manner, making it easy for students to find what they need quickly. Whether you're looking for a quick reference or a more in-depth study material, the platform has everything you need to succeed.
                </p>
              </div>
              <div className="about-us-page-middle-coloured-div" >
                <div className="about-us-one second" > 
                  <h1></h1>
                  <p class="text">
                    
                  </p>
                </div>
                <div className="about-us-two second" > 
                  <h1></h1>
                  <p class="text">
                    
                  </p>
                </div>
                <div className="about-us-three second" > 
                  <h1></h1>
                  <p class="text">
                    
                  </p>
                </div>
                </div>
              <div class="inner-container">
                <h1 className=" first" ></h1>
                <p class="text">
                In addition to the notes, the platform also includes a quiz section where students can practice and test their knowledge. The quizzes can be curated by students or any expert in the field, ensuring that they are relevant, up-to-date, and challenging. With instant feedback, students can quickly identify their strengths and weaknesses and focus on areas that require improvement.
                </p>
              </div>
              </div>
          </div>
        </div>
      ) : (
        <LoginSignUpPopUp/>
      )}
    </>
  );
};

{
//   <div className="home-page-sanskrit-shloka-div" >
//   <h2 className="home-page-sanskrit-shloka" >
//       "गुरुर्ब्रह्मा ग्रुरुर्विष्णुः गुरुर्देवो महेश्वरः। <br/>
//       गुरुः साक्षात् परं ब्रह्म तस्मै श्री गुरवे नमः।।"
//   </h2>
// </div>
// <h3 className="about-sanskrit-shloka-hindi">
//   "गुरु ब्रह्मा है, गुरु विष्णु है, और गुरु ही भगवान शंकर है। गुरु हि साक्षात् परब्रह्म है, उन सद्गुरु को प्रणाम करता हूँ।"
// </h3>
}