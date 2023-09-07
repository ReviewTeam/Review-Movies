import React from "react";
import FriendRequestItem from "./FriendRequestItem";
import "./FriendRequestList.css";

function FriendRequestList() {
  // Dummy friend requests (replace with actual data)
  const friendRequests = ["Optimus Prime 1", "User2", "User3", "User4", "User5", "User6"];

  return (
    <div className="friend-request-list-container">
      <h2>Friend Requests</h2>
      <div className="friend-request-list">
        {friendRequests.map((request) => (
          <FriendRequestItem key={request} name={request} />
        ))}
      </div>
    </div>
  );
}

export default FriendRequestList;
