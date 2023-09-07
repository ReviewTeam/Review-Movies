import React from "react";
import './FriendRequestItem.css';

function FriendRequestItem({ name }) {
  return (
    <div className="friend-request-item">
      <div className="friend-request-content">
        <div className="friend-request-name">{name}</div>
        <div className="friend-request-buttons">
          <button className="accept-button">Accept</button>
          <button className="reject-button">Reject</button>
        </div>
      </div>
    </div>
  );
}

export default FriendRequestItem;
