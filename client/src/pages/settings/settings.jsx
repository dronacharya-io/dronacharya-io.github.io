import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useUserAuth } from "../../context/AuthContext.js";

export const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: undefined,
    username: undefined,
    _id: 0,
  });
  const { user } = useUserAuth();
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
      <div id="abc">
        {loading ? (
          <p>loading</p>
        ) : (
          <>
            <img src={user.photoURL} alt="profile" id="profileImage" />
            <p>{user.displayName}</p>
            <p>{data.email}</p>
          </>
        )}
      </div>
    </>
  );
};
