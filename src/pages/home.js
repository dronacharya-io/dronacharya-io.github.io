import "./home.css";
import React, { useState } from "react";
import { Dashboard } from "./dashboard.js";
import Navbar from "../components/navbar.js";
import ProfileTab from "../components/profile.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <div id="mainBody">
        <div id="navbar">
          <Navbar />
        </div>
        <div id="remPart">
          <Dashboard />
        </div>
        <div id="profile">
          <ProfileTab />
        </div>
      </div>
    </>
  );
};
