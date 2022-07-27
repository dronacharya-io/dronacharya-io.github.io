import React from "react";
import { useUserAuth } from "../../context/AuthContext.js";

export const Settings = () => {
  const { user } = useUserAuth();
  return (
    <>
      <div id="abc">
        {user ? <p>{user.userData.username}</p> : <p> loading </p>}
      </div>
    </>
  );
};
