import "./settings.css";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import LoginSignUpPopUp from "../../components/PopUps/LoginSignUpPopUp";
import Lottie from "react-lottie";
import Loading from "../../lotties/mainloading.json";
import UpperBar from "../../lotties/upperbarSettings.json";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import UpgradeSharpIcon from "@mui/icons-material/UpgradeSharp";
import { useUserAuth } from "../../context/AuthContext";

export const Settings = () => {
  const { user, logOut, googleSignIn } = useUserAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: undefined,
    username: undefined,
    _id: 0,
  });
  const [phoneNumber, setPhoneNumber] = useState([""]);

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
    loop: true,
    autoplay: true,
    animationData: UpperBar,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setPhoneNumber(value);
  };

  const handleUpdate = async () => {
    setPhoneNumber(phoneNumber);
    const res = await axios.put(
      "http://localhost:8800/api/users/updateUser/" + user.userData._id,
      { phoneNumber: phoneNumber }
    );
    console.log(phoneNumber);
  };

  return (
    <>
      {user ? (
        <div id="settingsBody">
          {loading ? (
            <div id="loading">
              <Lottie
                isClickToPauseDisabled={true}
                options={VectorLoading}
                height={170}
                width={170}
              />
            </div>
          ) : (
            <>
              <div id="paper">
                <div id="TitleDiv">
                  <h1 id="Title">Settings</h1>
                </div>
                <div id="TitleDiv">
                  <h2 id="account">
                    <AccountCircleIcon id="iconAccount" /> Account
                  </h2>
                </div>
                <div id="lineDiv">
                  <Lottie
                    isClickToPauseDisabled={true}
                    options={UpperBarS}
                    height={10}
                    width={"auto"}
                  />
                </div>
                <div id="imgDiv">
                  <img
                    src={user.photoURL}
                    alt="profile"
                    id="settingsProfileImage"
                  />
                </div>
                <div id="NameDiv">
                  <h5 id="lable">Name</h5>
                  <input
                    id="text"
                    defaultValue={user.displayName}
                    style={{ width: "80%" }}
                    helperText="Right now you can't change your name. We are working on it. You can change your name in future."
                    disabled
                    rows={"1"}
                    inputProps={{ readOnly: true }}
                  />
                </div>
                <div id="NameDiv">
                  <h5 id="lable">Email</h5>
                  <input
                    id="text"
                    rows={"1"}
                    defaultValue={data.email}
                    style={{ width: "80%" }}
                    helperText="Right now you can't change your email. We are working on it. You can change your email in future."
                    disabled
                    inputProps={{ readOnly: true }}
                  />
                </div>
                <div id="NameDiv">
                  <h5 id="lable">Phone </h5>
                  <input
                    id="text"
                    rows={"1"}
                    placeholder="000 000 0000"
                    style={{ width: "80%" }}
                    helperText="If you don't check email frequently then you can add your phone number here so that we can send you notifications on whatsapp."
                    value={phoneNumber}
                    type="tel"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
                <div>
                  <Button
                    onClick={() => handleUpdate}
                    variant="outlined"
                    color="success"
                    id="UpdateButton"
                  >
                    <UpgradeSharpIcon /> Update Profile
                  </Button>
                </div>
                <div id="lineDiv">
                  <Lottie
                    isClickToPauseDisabled={true}
                    options={UpperBarS}
                    height={10}
                    width={"auto"}
                  />
                </div>
                <div id="TitleDiv">
                  <h2 id="account">
                    {" "}
                    <DeleteIcon /> delete account
                  </h2>
                </div>
                <div>
                  <Button
                    onClick={() => {
                      deleteAccount();
                    }}
                    variant="outlined"
                    color="error"
                    id="deleteButton"
                  >
                    Permanently delete your account
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <LoginSignUpPopUp />
      )}
    </>
  );
};
