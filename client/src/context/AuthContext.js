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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentuser) => {
      try {
        const res = await axios.post("http://localhost:8800/api/auth/login", {
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
            "http://localhost:8800/api/auth/register",
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
  }, []);

  return (
    <userAuthContext.Provider value={{ user, logOut, googleSignIn }}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
