import "./settings.css";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useUserAuth } from "../../context/AuthContext.js";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import LoginSignUpPopUp from "../../components/PopUps/LoginSignUpPopUp";
import Lottie from "react-lottie";
import Loading from "../../lotties/mainloading.json";
import UpperBar from "../../lotties/upperbarSettings.json";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';


export const Settings = () => {
  const { user, logOut, googleSignIn } = useUserAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: undefined,
    username: undefined,
    _id: 0,
  });

  async function deleteAccount() {
    user.userData.quizzesCreated.filter(async (quiz) => {
      await axios.delete(
        "http://localhost:8800/api/quizzes/deleteQuiz/" + quiz.id
      );
    });
    await axios.delete(
      "http://localhost:8800/api/users/deleteUser/" + user.userData._id
    );
    logOut();
    navigate("../");
  }

  useEffect(() => {
    setLoading(true);
    async function Fetch() {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/users/getUser/" + user.userData._id
        );
        console.log(res);
        setData(res.data);
      } catch (err) {
        setData(err);
      }
      setLoading(false);
    }

    return () => {
      Fetch();
    };
  }, []);

  const VectorLoading = {
    loop: true,
    autoplay: true,
    animationData: Loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const UpperBarS = {
    loop:true,
    autoplay: true,
    animationData: UpperBar,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };


  return (
    <>
      {user ? (
        <div id="settingsBody">
          {loading ? (
            <div id="loading">
              <Lottie isClickToPauseDisabled={true} options={VectorLoading} height={170} width={170} />
            </div>
          ) : (
            <>
              <div id="paper" >
                <div id="TitleDiv" >
                  <h1 id="Title" >Settings</h1>
                </div>
                <div id="TitleDiv" >
                  <h2 id="account"><AccountCircleIcon id="iconAccount"/> Account</h2>
                </div>
                <div id="lineDiv" >
                  <Lottie isClickToPauseDisabled={true} options={UpperBarS} height={10} width={"auto"} />
                </div>
                  <div id="imgDiv">
                    <img
                      src={user.photoURL}
                      alt="profile"
                      id="settingsProfileImage"
                    />
                  </div>
                  <div id="NameDiv" >
                    <h4>Name</h4>
                    <TextField
                      id="outlined-helperText"
                      defaultValue={user.displayName}
                      style={{width:"80%"}}
                      helperText=""
                    />
                  </div>
                  <div id="settingsData">
                    <p></p>
                    <p>{data.email}</p>
                    <h2>Delete account</h2>
                    <hr/>
                    <Button
                      onClick={() => {
                        deleteAccount();
                      }}
                      variant="outlined"
                      color="error"
                    >
                      Permanently delete your account
                    </Button>
                  </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <LoginSignUpPopUp/>
      )}
    </>
  );
};
