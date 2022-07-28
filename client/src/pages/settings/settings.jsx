import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useUserAuth } from "../../context/AuthContext.js";

export const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    createdAt: undefined,
    email: undefined,
    quizzesCreated: undefined,
    quizzesSubmitted: undefined,
    updatedAt: undefined,
    username: undefined,
    __v: undefined,
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
      <div id="abc">{loading ? <p>loading</p> : <p>{data._id}</p>}</div>
    </>
  );
};
