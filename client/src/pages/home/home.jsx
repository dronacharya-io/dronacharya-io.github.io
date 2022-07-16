import "./home.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "../dashboard/dashboard.jsx";
import Navbar from "../../components/navbar/navbar.jsx";
import ProfileTab from "../../components/profile/profile.jsx";
import { Classroom } from "../classroom/classroom.jsx";
import { Settings } from "../settings/settings.jsx";
import { Scorecard } from "../scorecard/scorecard.jsx";
import { Quiz } from "../quiz/quiz.jsx";
import StickyBox from "react-sticky-box";

export const Home = () => {
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
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/classroom" element={<Classroom />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/scorecard" element={<Scorecard />} />
              <Route path="/quiz" element={<Quiz />} />
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
