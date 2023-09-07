import React from "react";
import axios from "axios";
import './SendFriendRequestButton.css';

function SendFriendRequestButton({ targetUsername }) {
  const handleSendFriendRequest = () => {
    axios
      .get(`http://localhost:8080/api/v1/users?username=${targetUsername}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const friendID = response.data.id;

        setUser((prevUser) => ({ ...prevUser, ...userData1 }));
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });

    axios
      .post(`http://localhost:8080/api/v1/me/friends/${friendID}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Friend request sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending friend request:", error);
      });

  };

  return (
    <button className="send-friend-request-button" onClick={handleSendFriendRequest}>
      Send Friend Request
    </button>
  );
}

export default SendFriendRequestButton;

