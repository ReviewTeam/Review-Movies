import React from "react";
import axios from "axios";
import './SendFriendRequestButton.css';

function SendFriendRequestButton({ targetUsername }) {
  const handleSendFriendRequest = () => {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      axios
        .post(`http://localhost:8080/api/v1/me/friends/${targetUsername}`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Friend request sent successfully!");
          // You can update the UI or show a success message here if needed
        })
        .catch((error) => {
          console.error("Error sending friend request:", error);
          // Handle the error and update the UI accordingly
        });
    }
  };

  return (
    <button className="send-friend-request-button" onClick={handleSendFriendRequest}>
      Send Friend Request
    </button>
  );
}

export default SendFriendRequestButton;

