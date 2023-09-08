import React from "react";
import FriendRequestItem from "./FriendRequestItem";
import "./FriendRequestList.css";

function FriendRequestList() {

  return (
    <div className="friend-request-list-container">
      <h2>Friend Requests</h2>
      <div className="friend-request-list">
        {friendRequests.map((request) => (
          <FriendRequestItem name={request} />
        ))}
      </div>
    </div>
  );
}

export default FriendRequestList;