import "./Monitor css/home.css";
import "./Mobile css/mobileHome.css";
import "./Tablet css/tabletHome.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AboutUs } from "../About us/aboutUs.jsx";
import { ExploreCourses } from "../Explore Courses/exploreCourses.jsx"
import Navbar from "../../components/navbar/navbar.jsx";
import ProfileTab from "../../components/profile/profile.jsx";
import { Classroom } from "../classroom/classroom.jsx";
import { Settings } from "../settings/settings.jsx";
import { Scorecard } from "../scorecard/scorecard.jsx";
import { Quiz } from "../quiz/quiz.jsx";
import { VideoLectures } from "../Video Lectures/VideoLectures";
import { Timetable } from "../Time Table/timetable.jsx";
import { MobileJoinQuiz } from "../Join Quiz Mobile page/mobileJoinQuiz";
import StickyBox from "react-sticky-box";
import JoinQuiz from "../../components/joinQuiz/JoinQuiz";
import CreateQuiz from "../../components/createQuiz/CreateQuiz";
import EditQuiz from "../../components/editQuiz/editQuiz";
import QuizSubmissions from "../quizSubmissions/quizSubmissions";
import QuizScore from "../quizScore/quizScore";
import Tutorial from "../Tutorials/Tutorials.jsx";
export const Home = (props) => {
  return (
    <>
      <BrowserRouter>
        <div id="mainBody">
          <div id="navbar">
            <StickyBox offsetTop={0} offsetBottom={0}>
              <Navbar theme={props.theme} />
            </StickyBox>
          </div>
          <div className="remPart">
            <Routes>
              <Route path="/" element={<Quiz theme={props.theme} />} />
              <Route path="/createQuiz" element={<CreateQuiz />} />
              <Route path="/joinQuiz" element={<JoinQuiz />} />
              <Route path="/editQuiz" element={<EditQuiz />} />
              <Route path="/quizSubmissions" element={<QuizSubmissions />} />
              <Route path="/quizScore" element={<QuizScore />} />
              <Route path="/classroom" element={<Classroom />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/scorecard" element={<Scorecard />} />
              <Route path="/aboutUs" element={<AboutUs />} />
              <Route path="/exploreCourses" element={<ExploreCourses />} />
              <Route path="/videoLectures" element={<VideoLectures />} />
              <Route path="/timetable" element={<Timetable />} />
              <Route path="/joinquizPage" element={<MobileJoinQuiz />} />
              <Route path="/tutorials" element={<Tutorial/>} />
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
