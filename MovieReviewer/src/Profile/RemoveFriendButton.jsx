import React from "react";
import axios from "axios";
import './SendFriendRequestButton.css';

function RemoveFriendButton({ targetUsername }) {
  const handleRemoveFriendRequest = () => {
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
        console.log("Friend removed!");
    })
    .catch((error) => {
        console.error("Error removing friend:", error);
    });
}       

  return (
    <button className="remove-friend-button" onClick={handleRemoveFriendRequest}>
      Remove Friend
    </button>
  );
}

export default RemoveFriendButton;
