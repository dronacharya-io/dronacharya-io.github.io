import "./home.css";
import React, { useState } from "react";
import { Dashboard } from "./dashboard.js";
import Navbar from "../components/navbar.js";
import ProfileTab from "../components/profile.js";
import { Classroom } from "./classroom.js";
import { Settings } from "./settings.js";
import { Scorecard } from "./scorecard.js";
import { Quiz } from "./quiz.js";
import StickyBox from "react-sticky-box";

export const Home = () => {
  const [page, setPage] = useState(1);

  const PullValue = (value) => {
    setPage(value);
  };
  return (
    <>
      <div id="mainBody">
        <div id="navbar">
          <StickyBox offsetTop={0} offsetBottom={0}>
            <Navbar func={PullValue} />
          </StickyBox>
        </div>
        <div className="remPart">
          {page === 1 && <Dashboard />}
          {page === 2 && <Classroom />}
          {page === 3 && <Settings />}
          {page === 4 && <Scorecard />}
          {page === 5 && <Quiz />}
        </div>
        <div id="profile">
          <StickyBox offsetTop={0} offsetBottom={0}>
            <ProfileTab />
          </StickyBox>
        </div>
      </div>
    </>
  );
};
