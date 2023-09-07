import UserScore from "../UserScore/UserScore";
import "./UserInfo.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

function UserInfo({ username, score }) {
  const [userScore, setUserScore] = useState(0);
  const token = localStorage.getItem("jwtToken");
  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:8080/api/v1/me/reviews`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
          },
        })
        .then((response) => {
          let scr = 0;
          for (let i = 0; i <= response.data.length; i++) {
            scr += response.data[i].nrLikes;
          }
          setUserScore(scr);
        });
    }
  }, []);

  return (
    <div className="userInfo">
      <h3>{username}</h3>
      <UserScore score={userScore} />
    </div>
  );
}

export default UserInfo;
