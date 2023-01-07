import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  function logOut() {
    return signOut(auth);
  }
  async function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }
  var [x, setX] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentuser) => {
      try {
        const res = await axios.post("https://dronacharya-api.onrender.com/api/auth/login", {
          email: currentuser.email,
        });
        currentuser = { ...currentuser, userData: res.data.details };
      } catch {
        try {
          const registerData = {
            username: currentuser.displayName,
            email: currentuser.email,
          };
          const res = await axios.post(
            "https://dronacharya-api.onrender.com/api/auth/register",
            registerData
          );
          currentuser = { ...currentuser, userData: res.data.details };
        } catch (err) {
          console.log(err);
        }
      }
      console.log("Auth", currentuser);
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, [x]);

  return (
    <userAuthContext.Provider value={{ user, logOut, googleSignIn, x, setX }}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
