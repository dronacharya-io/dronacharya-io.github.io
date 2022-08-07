import "./settings.css";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useUserAuth } from "../../context/AuthContext.js";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import LoginSignUpPopUp from "../../components/PopUps/LoginSignUpPopUp";

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
    async function Fetch() {
      setLoading(true);
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

  return (
    <>
      {user ? (
        <div id="settingsBody">
          {loading ? (
            <p>loading</p>
          ) : (
            <>
              <img
                src={user.photoURL}
                alt="profile"
                id="settingsProfileImage"
              />
              <div id="settingsData">
                <p>{user.displayName}</p>
                <p>{data.email}</p>
                <Button
                  onClick={() => {
                    deleteAccount();
                  }}
                  variant="outlined"
                  color="error"
                >
                  Delete Account
                </Button>
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
