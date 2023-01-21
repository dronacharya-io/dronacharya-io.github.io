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
  var { user, logOut, googleSignIn } = useUserAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  var data = user;
  var phoneNumber = "";


  async function deleteAccount() {
    user.userData.quizzesCreated.filter(async (quiz) => {
      await axios.delete(
        "https://dronacharya-api.onrender.com/api/quizzes/deleteQuiz/" + quiz.id
      );
    });
    await axios.delete(
      "https://dronacharya-api.onrender.com/api/users/deleteUser/" + user.userData._id
    );
    logOut();
    navigate("../");
  }

  useEffect(() => {
    // setLoading(true);
    async function Fetch() {
      try {
        data = user;
      } catch (err) {
        data = err;
      }

      // setLoading(false);
      
    }

    return () => {
      Fetch();
    };
  });

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
    phoneNumber = value;
  };

  const handleUpdate = async () => {
    phoneNumber = phoneNumber;
    const res = await axios.put(
      "https://dronacharya-api.onrender.com/api/users/updateUser/" + user.userData._id,
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
                  <h2 id="account">
                    <AccountCircleIcon id="iconAccount" /> Account
                  </h2>
                </div>
                <hr className="settings-hr-line" />
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
                <hr className="settings-hr-line"/>
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
