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
            <div class="about-section">
              <div class="inner-container">
                <h1 className="first" >#About dronacharya.co</h1>
                <p class="text">
                Welcome to Dronacharya.co, a platform that's dedicated to simplify students' lives by providing them with an online learning platform that delivers subject notes, recorded video lectures and quizzes that recap what's been taught in College. <br/> <br/>Eliminating the need for expensive private tuitions! <br/> <br/> We're excited to share with you our passion for education and our commitment to making learning more accessible and fun.

                As the founders of this platform, Priyansh Jhalora and Aman Tank, we understand the challenges that students face when it comes to education. That's why we've created a space where students can come to learn and grow.

                <br/> <br/>We're proud to offer a range of services that include daily updated notes, recorded video lectures, editorials, and quizzes. <br/> <br/> We know that every student has a unique learning style, and that's why we've designed our platform to be flexible and customizable. Whether you prefer to learn through reading, listening, or doing, we have something for everyone.<br/> <br/>

                We also want to take this opportunity to thank our principal sir, <span>Dr. Anil Mehta</span>, for his unwavering support. <br/> <br/>We'd also like to express our gratitude to our teachers, <br/> <span>Dr. Sneha Kothari </span> Madam, <span>Sh. Gaurang Sharma</span> Sir and <span>Sh. Hemant Salvi</span> Sir for their invaluable contributions that have been instrumental in shaping our platform and ensuring that our content is accurate and up-to-date.

                <br/> <br/>Last but not least, we want to thank <span>Mrs. Sonu Heerawat</span> Madam for her tireless efforts in providing us usefull material. <br/> <br/> We're honored to have you all on our team.

                <br/> <br/> We're committed to providing students with the best possible learning experience. <br/> <br/> Thank you for choosing <span > Dronacharya.co</span>

                </p>
                <p class="text-p" >
                Sincerely,
                <br/>
                Priyansh Jhalora <br/>Aman Tank
                <br/> 
                <br/>                 
                <hr/>
                <br/>
                The Dronacharya.co Team
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