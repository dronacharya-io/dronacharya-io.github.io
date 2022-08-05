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
import JoinQuiz from "../../components/joinQuiz/JoinQuiz";
import CreateQuiz from "../../components/createQuiz/CreateQuiz";
import EditQuiz from "../../components/editQuiz/editQuiz";
import QuizSubmissions from "../quizSubmissions/quizSubmissions";

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
              <Route path="/" element={<Quiz />} />
              <Route path="/createQuiz" element={<CreateQuiz />} />
              <Route path="/joinQuiz" element={<JoinQuiz />} />
              <Route path="/editQuiz" element={<EditQuiz />} />
              <Route path="/quizSubmissions" element={<QuizSubmissions />} />
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
