import "./home.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AboutUs } from "../About us/aboutUs.jsx";
import Navbar from "../../components/navbar/navbar.jsx";
import ProfileTab from "../../components/profile/profile.jsx";
import { Classroom } from "../classroom/classroom.jsx";
import { Settings } from "../settings/settings.jsx";
import { Scorecard } from "../scorecard/scorecard.jsx";
import { Quiz } from "../quiz/quiz.jsx";
import StickyBox from "react-sticky-box";
import { useUserAuth } from "../../context/AuthContext";
import TypeAnimation from "react-type-animation";

export const Home = () => {
  const { user } = useUserAuth();
  return (
    <>
      <BrowserRouter>
        <div id="mainBody">
          <div id="navbar">
            <StickyBox offsetTop={0} offsetBottom={0}>
              <Navbar />
            </StickyBox>
          </div>
          <div className="remPart">
            <TypeAnimation
              cursor={false}
              sequence={["namaste" + user.displayName]}
              wrapper="h2"
            />
            <Routes>
              <Route path="/" element={<Quiz />} />
              <Route path="/classroom" element={<Classroom />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/scorecard" element={<Scorecard />} />
              <Route path="/aboutUs" element={<AboutUs />} />
            </Routes>
          </div>
          <div id="profile">
            <StickyBox offsetTop={0} offsetBottom={0}>
              <ProfileTab />
            </StickyBox>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};
